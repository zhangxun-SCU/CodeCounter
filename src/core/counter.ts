import fs from 'node:fs';
import path from 'node:path';
import { getLanguageDetail } from './language.ts';
import {CountInfo, FuncDetail} from "@/interface/lang.ts";
import {Details} from "@/interface/lang.ts";

/**
 * counter
 */
class CodeCounter {
    settings: object
    paths: string[]
    excludeKeys: string[]
    period: boolean = false
    startTime: Date | null = null
    endTime: Date | null = null
    languages: string[]
    details: Details
    allTypes: string[] = []
    funcNeedTypes: string[] = ['c', 'cpp', 'java']
    lines: number[] = []
    constructor(countInfo: CountInfo) {
        this.paths = countInfo.paths;
        this.excludeKeys = countInfo.excludeKeys;
        if(countInfo.period) {
            this.period = true;
            this.startTime = new Date(countInfo.period[0]);
            this.endTime = new Date(countInfo.period[0]);
        }
        this.languages = countInfo.languages
        this.settings = countInfo.settings
        this.details = getLanguageDetail(countInfo.languages, this.settings);
        // 初始化所有需要统计的代码文件类型
        for(let key in this.details) {
            this.allTypes.push(...this.details[key].fileTypes)
        }
    }

    // 对单个文件的count
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

    // 对一个文件中的函数信息统计
    async countFuncNum(filePath: string, type: string):Promise<FuncDetail> {
        let reg: RegExp
        if(type === 'c') reg = new RegExp(/\w+(\s+|\s*\*+\s*)\w+\s*\((\s*\w+(\s+|\s*\*+\s*)\w+(\[])?\s*,?\s*)*\)\s*{/, 'g');
        else if(type === 'cpp') reg = new RegExp(/\w+\s*(<.*>)?(\s+|\s*[*&]+\s*)(\w+(<.*>)?::)?\w+\s*\(*\)\s*{/, 'g');
        else if(type === 'java') reg = new RegExp(/\w+\s*(<.*>)?(\[])*\s+\w+\s*\((\s*\w+\s*(<.*>)?(\[])*\s+\w+(\[])*\s*(,?)\s*)*\)[\s\n]*(.+)?\s*{/, 'g');
        return new Promise((resolve, reject) => {
            const funcOneFileDetail: FuncDetail = {
                totalLine: 0,
                maxLine: 0,
                minLine: Infinity,
                funcNum: 0,
                allFuncNums: [],
            };
            fs.readFile(filePath, (err, data) => {
                if(err) reject(err);
                let codeStr = data.toString();
                let result =  reg.exec(codeStr);
                while (result !== null) {
                    funcOneFileDetail.funcNum++;
                    /** 数行数 **/
                    let funcLine = this.countFuncLines(codeStr.slice(result.index));
                    if(funcLine > funcOneFileDetail.maxLine) funcOneFileDetail.maxLine = funcLine;
                    if(funcLine < funcOneFileDetail.minLine) funcOneFileDetail.minLine = funcLine;
                    funcOneFileDetail.totalLine += funcLine;
                    funcOneFileDetail.allFuncNums.push(funcLine);
                    result = reg.exec(codeStr);
                }
                resolve(funcOneFileDetail);
            })
        })
    }

    countFuncLines(code: string): number {
        let lines: number = 0;
        let braceStack: string[] = [];
        let leftBrace: boolean = false;
        let index: number = 0;
        // 对else if针对判断

        while(index < code.length && (!leftBrace || (leftBrace && braceStack.length !== 0))) {
            if (code[index] === '\n') ++lines;
            else if(code[index] === '{') {
                braceStack.push(code[index]);
                leftBrace = true;
            } else if(code[index] === '}') {
                let c = braceStack.pop() as string;
                if(c === '}') {
                    braceStack.push(c);
                    braceStack.push(code[index]);
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
            if(this.isExclude(filePath)) continue;
            const stat = fs.statSync(filePath);
            const fileCreateTime = stat.birthtime.getTime();
            if (stat.isDirectory()) {
                await this.processDirectory(filePath);
            } else {
                let fileTypeArr = filePath.split('.');
                const type = fileTypeArr[fileTypeArr.length - 1].toLowerCase();
                let funcDetail: FuncDetail | null = null;
                if(!this.allTypes.includes(type)) continue;
                if (this.period && fileCreateTime <= this.endTime.getTime() && fileCreateTime >= this.startTime.getTime()) {
                    const linesInFile: any = await this.countOneFile(filePath);
                    if(this.funcNeedTypes.includes(type)) {
                        funcDetail = await this.countFuncNum(filePath, type);
                    }
                    this.addCount(type, linesInFile, funcDetail);
                } else {
                    const linesInFile: any = await this.countOneFile(filePath);
                    if(this.funcNeedTypes.includes(type)) {
                        funcDetail = await this.countFuncNum(filePath, type);
                    }
                    this.addCount(type, linesInFile, funcDetail);
                }
            }
        }
    }

    addCount(type: string, lines: number, funcDetail: FuncDetail | null) {
        for(let language in this.details) {
            if(this.details[language].fileTypes.includes(type)) {
                this.details[language].lines += lines;
                this.details[language].filesNum++;
                if(funcDetail === null) break;
                if(funcDetail.funcNum <= 0) break;
                
                this.details[language].funcNum += funcDetail.funcNum;  /* 函数个数 */
                /* 所有个数 */
                this.details[language].allFuncNums.push(...funcDetail.allFuncNums);
                /* 平均函数长度 */
                this.details[language].totalFuncLength += funcDetail.totalLine;
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