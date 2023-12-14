// electron 主进程文件

import {app, BrowserWindow, ipcMain, dialog, Menu} from 'electron'
import {CodeCounter} from '@/core/counter.ts';
import fs from 'node:fs'
import {json2csv} from "@/utils/json2csv.ts";
import {json2xml} from "@/utils/json2xml.ts";
import Details = Electron.Details;

app.whenReady().then( ()=> {
    // 主窗口
    const win = new BrowserWindow({
        height: 800,
        width: 1200,
        title: "CodeCounter-Xun",
        frame: false,  // 关闭默认标题栏
        // titleBarStyle: 'hidden',
        // transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false, // 关闭跨域检测,
        }
    });
    Menu.setApplicationMenu(null);  // 隐藏默认菜单栏
    if(process.argv[2]) {
        win.webContents.openDevTools();  // 打开调试工具
        win.loadURL(process.argv[2]);
    } else {
        win.loadFile('index.html')
    }


    // 最小化窗口
    ipcMain.on('miniWin', () => {
        win.minimize();
    });
    ipcMain.on('maxiWin', () => {
        win.maximize();
    });
    ipcMain.on('windowedWin', () => {
        win.restore();
        win.center();
    });
    ipcMain.on('closeWin', () => {
        win.close();
        win.destroy();
    })

    // 资源管理器
    ipcMain.on("openExplorer", (event) => {
        dialog.showOpenDialog(win, {
            title: "选择代码路径",
            properties: ['openDirectory']
        }).then(result => {
            event.sender.send("returnPath", result)
        }).catch(err => {
            event.sender.send("returnPath", err)
        });
    });

    // 监听计数请求
    ipcMain.on("countInfo", (event, args) => {
        let info = JSON.parse(args)
        event.sender.send("debugTest", new Date(info.period[0]))
        const counter: CodeCounter = new CodeCounter(info);
        let time1 = new Date().getTime();
        counter.count().then(res => {
            const details: Details = JSON.parse(res.language);
            // for(let lang in details) {
            //
            // }
            /* 结果处理 */
            Object.keys(details).forEach((lang: string) => {
                details[lang].avrFuncLength = details[lang].totalFuncLength / details[lang].funcNum;
                details[lang].allFuncNums.sort((a: number, b: number)=> {
                    return a - b;
                });
                details[lang].midFuncLength = details[lang].allFuncNums[(Math.round(details[lang].funcNum / 2))];
                details[lang].minFuncLength = details[lang].allFuncNums[0];
                details[lang].maxFuncLength = details[lang].allFuncNums[details[lang].funcNum - 1];
            });
            event.sender.send("debugTest", (new Date().getTime() - time1))
            event.sender.send("countRes", {
                language: JSON.stringify(details)
            });
        })
    })

    // 监听文件导出请求
    ipcMain.on("exportData", (event, data) => {
        dialog.showOpenDialog(win, {
            title: "选择导出路径",
            properties: ['openDirectory']
        }).then(arg => {
            if (!arg.canceled) {
                // console.log(arg);
                fs.writeFileSync(arg.filePaths[0] + '\\export.json', data);
                fs.writeFileSync(arg.filePaths[0] + '\\export.csv', json2csv(JSON.parse(data)));
                fs.writeFileSync(arg.filePaths[0] + "\\export.xml", json2xml(JSON.parse(data)))
                event.sender.send('exportRes', true);
            }
        })
    })
})

