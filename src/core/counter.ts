import fs from 'node:fs';
import path from 'node:path';
import { getLanguageDetail } from './language.ts';
import {countInfo} from "@/interface/codeLanguage.ts";
import {Details} from "@/interface/codeLanguage.ts";

class CodeCounter {
    paths: string[]
    excludeKeys: string[]
    period: string
    languages: string[]
    details: Details
    allTypes: string[] = []
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

    async countFuncNum(filePath: string):Promise<number> {
        return new Promise((resolve, reject) => {
            const regc = new RegExp(/(\w+\s+|\s*\*+\s*)\w+\s*\(.*\)[\s\n]*{/, 'g');
            let func = 0;
            fs.readFile(filePath, (err, data) => {
                if(err) reject(err);
                let codeStr = data.toString();
                let result =  regc.exec(codeStr);
                while (result !== null) {
                    ++func;
                    /** 数行数 **/
                    this.countFuncLines(codeStr.slice(result.index));
                    result = regc.exec(codeStr);
                }
                resolve(func);
            })
        })
    }

    countFuncLines(code: string): number {
        let lines: number = 0;
        let arr: string[] = [];
        let leftBrace = false;
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
                if(!this.allTypes.includes(type)) continue;
                const linesInFile: any = await this.countOneFile(filePath);
                const funcNums = await this.countFuncNum(filePath);
                this.addCount(linesInFile, type, funcNums);
            }
        }
    }

    addCount(lines: number, type: string, funcNums: number) {
        for(let language in this.details) {
            if(this.details[language].fileTypes.includes(type)) {
                this.details[language].lines += lines;
                this.details[language].filesNum++;
                this.details[language].funcNum += funcNums;
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