import fs from 'node:fs';
import path from 'node:path';
import { getLanguageDetail } from './language.ts';
import {countInfo, FuncDetail} from "@/interface/codeLanguage.ts";
import {Details} from "@/interface/codeLanguage.ts";

class CodeCounter {
    paths: string[]
    excludeKeys: string[]
    period: string
    languages: string[]
    details: Details
    allTypes: string[] = []
    funcNeedTypes: string[] = ['c', 'cpp', 'java']
    constructor(countInfo: countInfo) {
        this.paths = countInfo.paths;
        this.excludeKeys = countInfo.excludeKeys;
        this.period = countInfo.period
        this.languages = countInfo.languages
        this.details = getLanguageDetail(countInfo.languages);
        for(let key in this.details) {
            this.allTypes.push(...this.details[key].fileTypes)
        }
    }

    async countOneFile(filePath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            let lineCount = 0;
            fs.createReadStream(filePath)
                .on('data', (buffer) => {
                    for (let i = 0; i < buffer.length; ++i) {
                        // 10 是换行符的ASCII码
                        if (buffer[i] === 10) lineCount++;
                    }
                })
                .on('end', () => resolve(lineCount))
                .on('error', reject);
        })
    }

    async countFuncNum(filePath: string, type: string):Promise<FuncDetail> {
        let reg: RegExp
        if(type === 'c') reg = new RegExp(/\w+(\s+|\s*\*+\s*)\w+\s*\((\w+(\s+|\s*\*+\s*)\w+\s*,?\s*)*\)[\s\n]*{/, 'g');
        else if(type === 'cpp') reg = new RegExp(/\w+\s*(<.*>)?(\s+|\s*[*&]+\s*)(\w+(<.*>)?::)?\w+\s*\((\w+\s*(<.*>)?(\s+|\s*[*&]+\s*)\w+\s*,?\s*)*\)[\s\n]*{/, 'g');
        else if(type === 'java') reg = new RegExp(/\w+\s*(<.*>)?(\[])*\s+\w+\s*\((\w+\s*(<.*>)?(\[])*\s+\w+\s*(,?)\s*)*\)[\s\n]*(.+)?\s*{/, 'g');
        return new Promise((resolve, reject) => {
            const funcOneFileDetail: FuncDetail = {
                totalLine: 0,
                maxLine: 0,
                minLine: Infinity,
                funcNum: 0
            };
            fs.readFile(filePath, (err, data) => {
                if(err) reject(err);
                let codeStr = data.toString();
                let result =  reg.exec(codeStr);
                while (result !== null) {
                    ++funcOneFileDetail.funcNum;
                    /** 数行数 **/
                    let funcLine = this.countFuncLines(codeStr.slice(result.index));
                    if(funcLine > funcOneFileDetail.maxLine) funcOneFileDetail.maxLine = funcLine;
                    if(funcLine < funcOneFileDetail.minLine) funcOneFileDetail.minLine = funcLine;
                    funcOneFileDetail.totalLine += funcLine;
                    result = reg.exec(codeStr);
                }
                resolve(funcOneFileDetail);
            })
        })
    }

    countFuncLines(code: string): number {
        let lines: number = 0;
        let arr: string[] = [];
        let leftBrace: boolean = false;
        let index = 0;
        while(index < code.length && (!leftBrace || (leftBrace && arr.length !== 0))) {
            if (code[index] === '\n') ++lines;
            else if(code[index] === '{') {
                arr.push(code[index]);
                leftBrace = true;
            } else if(code[index] === '}') {
                let c = arr.pop() as string;
                if(c === '}') {
                    arr.push(c);
                    arr.push(code[index]);
                }
            }
            ++index;
        }
        return lines;
    }
    async processDirectory(dirPath: string) {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);
            if(this.isExclude(filePath)) continue;
            if (stat.isDirectory()) {
                await this.processDirectory(filePath);
            } else {
                let arr = filePath.split('.');
                const type = arr[arr.length - 1].toLowerCase();
                let funcDetail: FuncDetail | null = null;
                if(!this.allTypes.includes(type)) continue;
                const linesInFile: any = await this.countOneFile(filePath);
                if(this.funcNeedTypes.includes(type)) {
                    funcDetail = await this.countFuncNum(filePath, type);
                }
                this.addCount(type, linesInFile, funcDetail);
            }
        }
    }

    addCount(type: string, lines: number, funcDetail: FuncDetail | null) {
        for(let language in this.details) {
            if(this.details[language].fileTypes.includes(type)) {
                this.details[language].lines += lines;
                this.details[language].filesNum++;
                if(funcDetail === null) break;
                this.details[language].funcNum += funcDetail.funcNum;  /* 函数个数 */
                if(funcDetail.maxLine > this.details[language].maxFuncLength) {  /* 最大函数长度 */
                    this.details[language].maxFuncLength = funcDetail.maxLine;
                }
                if(funcDetail.minLine < this.details[language].minFuncLength) {  /* 最小函数长度 */
                    this.details[language].minFuncLength = funcDetail.maxLine;
                }
                /* 平均函数长度 */
                this.details[language].avrFuncLength = (this.details[language].avrFuncLength *
                    this.details[language].funcNum + funcDetail.totalLine) /
                    (this.details[language].funcNum + funcDetail.funcNum);
            }
        }
    }

    async countOnePath(dirPath: string) {
        try {
            await this.processDirectory(dirPath);
        } catch (error) {
            console.error('出错:', error);
        }
    }

    async count() {
        try {
            for (let i = 0; i < this.paths.length; ++i) {
                await this.countOnePath(this.paths[i]);
            }
            return {
                language: JSON.stringify(this.details)
            }
        } catch (error) {
            console.error('出错:', error);
            return {
                error: error
            };
        }
    }

    isExclude(path: string): boolean {
        let res: boolean = false;
        this.excludeKeys.forEach((value) => {
            if(path.indexOf(value) != -1) res = true;
        })
        return res;
    }
}

export {CodeCounter};