const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js")
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
    mainWindow.webContents.openDevTools();
});

ipcMain.handle("loadSongs", () => console.log('load songs'))
