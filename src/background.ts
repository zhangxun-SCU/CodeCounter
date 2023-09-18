// electron 主进程文件

import {app, BrowserWindow} from 'electron'

app.whenReady().then( ()=> {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false, // 关闭跨域检测
        }
    })
    if(process.argv[2]) {
        win.loadURL(process.argv[2])
    } else {
        win.loadURL('index.html')
    }

})