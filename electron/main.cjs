const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const ytpl = require("ytpl");

app.on("ready", () => {    
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
        }
    });
    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
    mainWindow.webContents.openDevTools();

    ipcMain.handle("pick-folder", async () => {    
        const filePath = await dialog.showOpenDialog(mainWindow, { properties: ["openDirectory"] })
            .then(result => {
                if (result.canceled) {
                    return
                }
                return result.filePaths[0]
            })
        
        if (!filePath) {
            throw new Error("Something went wrong picking a folder")
        }

        return filePath
    })

    ipcMain.handle("download-songs", async (e, { songUrls, outputFolder }) => {
        for (let index = 0; index < songUrls.length; index++) {
            const songUrl = songUrls[index];
            await new Promise(res => setTimeout(res, 1000))

            mainWindow.webContents.send("download-response", { songUrl, statusCode: (Math.random() > 0.5) ? 200 : 500 })
        }

        return true
    })

    ipcMain.handle("show-message", (e, { message, type }) => {
        dialog.showMessageBox(mainWindow, { message, type })
    })
});

ipcMain.handle("get-songs", async (e, { url }) => {

    try {
        const playlist = await ytpl(url)
        return {
            statusCode: 200,
            data: playlist.items.map(item => {
                return {
                    index: item.index,
                    title: item.title,
                    url: item.shortUrl
                }
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
        }
    }
})

