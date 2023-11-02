import fs from 'node:fs';
import path from 'node:path';
import { getLanguageDetail } from './language.ts';
import {countInfo} from "@/interface/codeLanguage.ts";
import {Details, languageDetail} from "@/interface/codeLanguage.ts";

class CodeCounter {
    paths: string[]
    excludeKeys: string[]
    period: string
    languages: string[]
    details: Details
    i: number = 0
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

    async countFuncFile(filePath: string):Promise<number> {
        return new Promise((resolve, reject) => {
            const regc = new RegExp(/(\w+(\s+|\s*(\*+)\s*))(\w+\s*)\(.*\)[\s\n]*{/, 'g');
            fs.readFile(filePath, (err, data) => {
                if(err) reject(err);
                let funcs = data.toString().match(regc);
                if(funcs) {
                    resolve(funcs.length);
                } else {
                    resolve(0);
                }
            })
        })
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
                const type = arr[arr.length - 1];
                if(!this.allTypes.includes(type)) continue;
                const linesInFile: any = await this.countOneFile(filePath);
                const funcNums = await this.countFuncFile(filePath);
                // const funcNums = 0;
                this.addCount(linesInFile, type, funcNums);
            }
        }
    }

    addCount(lines: number, type: string, funcNums: number) {
        this.i += lines;
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