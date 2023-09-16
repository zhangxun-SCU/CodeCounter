// 生产环境
import type { Plugin } from 'vite'
import fs from 'node:fs'
import * as electronBuilder from 'electron-builder'
import path from 'path'

const buildBackground = () => {
    require('esbuild').buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        target: 'node12',
        external: ['electron']
    })
}

// 打包需要先等vite打完包后的index.html
export const ElectronBuildPlugin = (): Plugin => {
    return {
        name: 'CodeCounter-electron-build',
        closeBundle() {
            buildBackground()
            // electron-builder
            const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
            json.main = 'background.js'
            fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4))
            // bug electron-builder会下载垃圾文件
            fs.mkdirSync('dist/node_modules')
            electronBuilder.build({
                config: {
                    directories: {
                        output: path.resolve(process.cwd(), 'release'),
                        app: path.resolve(process.cwd(), 'dist')
                    },
                    asar: true,
                    appId: 'com.xun.codecounter',
                    productName: 'codeCounter',
                    nsis: {
                        oneClick: false,  // 取消一键安装
                        allowToChangeInstallationDirectory: true,  //允许用户选择安装目录
                    }
                }
            })
        }
    }
}