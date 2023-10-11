import fs from 'node:fs'
import path from 'node:path'

let fileCount = 0;
let totalLines = 0;

function countLinesInFile(filePath) {
    return new Promise((resolve, reject) => {
        let lineCount = 0;
        fs.createReadStream(filePath)
            .on('data', (buffer) => {
                for (let i = 0; i < buffer.length; ++i) {
                    if (buffer[i] === 10) lineCount++;
                }
            })
            .on('end', () => resolve(lineCount))
            .on('error', reject);
    });
}

async function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            await processDirectory(filePath);
        } else {
            fileCount++;
            const linesInFile = await countLinesInFile(filePath);
            totalLines += linesInFile;
        }
    }
}

(async () => {
    try {
        const directoryPath = '.'; // 将'.'替换为你想要分析的目录
        await processDirectory(directoryPath);
        console.log('文件数量:', fileCount);
        console.log('代码行数:', totalLines);
    } catch (error) {
        console.error('出错:', error);
    }
})();