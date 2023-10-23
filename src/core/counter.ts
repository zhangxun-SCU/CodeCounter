import fs from 'node:fs'
import path from 'node:path'
import { getLanguageDetail } from './language.ts'
let fileCount:number = 0;
let totalLines:number = 0;


class CodeCounter {
    paths: string[]
    excludeKeys: string[]
    languageDetail
    constructor(ps:string[], eks: string[]) {
        this.paths = ps;
        this.excludeKeys = eks;
        this.languageDetail = getLanguageDetail();
    }

    countOneFile(filePath: string): Promise<number> {
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

    async processDirectory(dirPath: string) {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);
            if(this.isExclude(filePath)) continue;
            if (stat.isDirectory()) {
                await this.processDirectory(filePath);
            } else {

                fileCount++;
                let arr = filePath.split('.');
                const linesInFile: any = await this.countOneFile(filePath);
                this.addCount(linesInFile, arr[arr.length - 1], filePath);
                totalLines += linesInFile;
            }
        }
    }

    addCount(lines: number, type: string, path: string) {
        if (this.languageDetail.python.fileTypes.includes(type)) {
            this.languageDetail.python.lines += lines;
        } else if(this.languageDetail.cpp.fileTypes.includes(type)) {
            this.languageDetail.cpp.lines += lines;
        } else if(this.languageDetail.c.fileTypes.includes(type)) {
            this.languageDetail.c.lines += lines;
        } else if(this.languageDetail.java.fileTypes.includes(type)) {
            this.languageDetail.java.lines += lines;
        } else if(this.languageDetail.javascript.fileTypes.includes(type)) {
            this.languageDetail.javascript.lines += lines;
        } else if(this.languageDetail.typescript.fileTypes.includes(type)) {
            this.languageDetail.typescript.lines += lines;
        }
    }

    async countOnePath(dirPath: string) {
        try {
            await this.processDirectory(dirPath);
            // console.log('文件数量:', fileCount);
            // console.log('代码行数:', totalLines);
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
                language: JSON.stringify(this.languageDetail)
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