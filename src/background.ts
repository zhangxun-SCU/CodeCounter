// electron 主进程文件

import {app, BrowserWindow, ipcMain} from 'electron'
import path from "path";

app.whenReady().then( ()=> {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        titleBarStyle: 'hidden',
        // transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false, // 关闭跨域检测,
            preload: path.join(__dirname, "preload.js")
        }
    })
    // win.webContents.openDevTools()
    if(process.argv[2]) {
        win.loadURL(process.argv[2])
    } else {
        win.loadURL('index.html')
    }
})

ipcMain.on("submit", (event, arg) => {
    console.log(arg);
})