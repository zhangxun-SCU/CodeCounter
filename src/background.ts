// electron 主进程文件

import {app, BrowserWindow, ipcMain, dialog, Menu} from 'electron'
import {CodeCounter} from '@/core/counter.ts';
import fs from 'node:fs'
import {json2csv} from "@/utils/json2csv.ts";
import {json2xml} from "@/utils/json2xml.ts";

app.whenReady().then( ()=> {
    // 主窗口
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        fullscreen: true,
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

    win.webContents.openDevTools();  // 打开调试工具
    Menu.setApplicationMenu(null);  // 隐藏默认菜单栏
    if(process.argv[2]) {
        win.loadURL(process.argv[2]);
    } else {
        win.loadURL('index.html');
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
        const counter: CodeCounter = new CodeCounter(info);
        event.sender.send('debugTest', counter);
        counter.count().then(res => {
            event.sender.send("countRes", res);
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

