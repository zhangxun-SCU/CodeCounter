// 开发环境插件

import type { Plugin } from 'vite'
import type { AddressInfo } from 'net'
import { spawn } from 'child_process'
import fs from 'node:fs'

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

// vite插件要求，必须导出一个对象，对象必须要name属性
export const ElectronDevPlugin = ():Plugin => {

    return {
        name: 'CodeCounter-electron-dev',
        configureServer(server) {
            buildBackground()
            server?.httpServer?.once('listening', () => {
                // 读取vite服务的信息
                const addressInfo = server.httpServer?.address() as AddressInfo
                // console.log(addressInfo.port)
                // 拼接ip地址
                const IP = `http:localhost:${addressInfo.port}`
                // 第一个参数是electron的入口文件，require()返回的是一个路径
                let electronProcess = spawn(require('electron'), ['dist/background.js', IP])
                fs.watchFile('../src/background.ts', () => {
                    electronProcess.kill()
                    buildBackground()
                    electronProcess = spawn(require('electron'), ['dist/background.js', IP])
                })
                // 监听日志
                electronProcess.stderr.on('data', (data) => {
                    console.log(data.toString())
                })
            })
        }
    }
}