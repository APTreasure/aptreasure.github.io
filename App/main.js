const { app, BrowserWindow } = require('electron/main')
const shell = require('electron').shell;
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 576,
        minWidth:640,
        minHeight:360,
        icon: __dirname + '/images/favicon.ico',
    })

    win.loadFile('index.html')
    win.removeMenu() // Remove menu bar with tools and stuff

    win.webContents.setWindowOpenHandler(({ url }) => { // Open _blank in browser
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.whenReady().then(() => { // Open window when app is ready
    createWindow()
})