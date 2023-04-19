const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

app.on("ready", () => {    
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
        }
    });
    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
    mainWindow.webContents.openDevTools();

    ipcMain.handle("choose-folder", async () => {    
        const filePath = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] })
            .then(result => {
                if (result.canceled) {
                    return
                }
                return result.filePaths[0]
            })
        
        if (!filePath) {
            throw new Error('Something went wrong choosing a folder')
        }

        return filePath
    })

    ipcMain.handle("download-songs", async (e, { songUrls, outputFolder }) => {
        for (let index = 0; index < songUrls.length; index++) {
            const songUrl = songUrls[index];
            await new Promise(res => setTimeout(res, 1000))
            mainWindow.webContents.send("download-response", { songUrl, statusCode: 200 })
        }

        return true
    })
});


ipcMain.handle("get-songs", (e, { url }) => {
    return [
		{ index: 0, title: 'Song one', url: 'youtube.com/urlone' },
		{ index: 1, title: 'Song two', url: 'youtube.com/urltwo'  },
		{ index: 2, title: 'Song three', url: 'youtube.com/urlthree' }
	]
})

