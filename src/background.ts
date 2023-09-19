// electron 主进程文件

import {app, BrowserWindow, ipcMain, dialog, Menu} from 'electron'


app.whenReady().then( ()=> {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        frame: false,  // 关闭默认标题栏
        // titleBarStyle: 'hidden',
        // transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false, // 关闭跨域检测,
        }
    })

    win.webContents.openDevTools()  // 打开调试工具
    Menu.setApplicationMenu(null);  // 隐藏默认菜单栏
    if(process.argv[2]) {
        win.loadURL(process.argv[2])
    } else {
        win.loadURL('index.html')
    }

    ipcMain.on("submit", (event, arg) => {
        dialog.showOpenDialog(win, {
            properties: ['openDirectory']
        }).then(result => {
            event.sender.send("reply", result)
        }).catch(err => {
            event.sender.send("reply", err)
        })
    })
})

