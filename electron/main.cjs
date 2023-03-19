const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

app.on("ready", () => {    
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
        }
    });
    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
    mainWindow.webContents.openDevTools();

    ipcMain.handle("chooseFolder", () => {
        // const folderPath = dialog.showOpenDialog({
        //     properties: ['openDirectory']
        // });
    
        dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }).then(result => {
            console.log(result.canceled)
            console.log(result.filePaths)
          }).catch(err => {
            console.log(err)
          })
        // console.log(folderPath)
        // console.log('choose folder')
    })

});


ipcMain.handle("getSongs", (e, url) => {

    console.log(url)

    return [
		{ title: 'Song one', url: 'youtube.com/urlone' },
		{ title: 'Song two', url: 'youtube.com/urltwo'  },
		{ title: 'Song three', url: 'youtube.com/urlthree' }
	]
})
