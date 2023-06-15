const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")
const ytpl = require("ytpl")
const ytdl = require('ytdl-core')
const fs = require('fs')

app.on("ready", () => {    
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
        }
    })

    mainWindow.loadFile(path.join(__dirname, "../public/index.html"))
    mainWindow.webContents.openDevTools()

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

    ipcMain.handle("download-songs", async (e, { songs, outputFolder }) => {

        async function downloadSong(title, url) {
            const options = { quality: 'highest', filter: 'audioandvideo' }
            try {
                await ytdl(url, options).pipe(fs.createWriteStream(`${outputFolder}/${title}.mp3`))
                mainWindow.webContents.send("download-response", { songUrl: url, statusCode: 200 })
            } catch (error) {
                mainWindow.webContents.send("download-response", { songUrl: url, statusCode: 500 })
            }
        }
        
        const downloadPromises = Array.from(songs).map(async song => await downloadSong(song.title, song.url))
        await Promise.all(downloadPromises)
        
        mainWindow.webContents.send("download-done")
    })
    
    ipcMain.handle("show-message", (e, { message, type }) => {
        dialog.showMessageBox(mainWindow, { message, type })
    })

    handleGetSongsEvent()
})

function handleGetSongsEvent() {
    let nextBatch = {
        url: undefined,
        continuation: undefined
    }
    
    ipcMain.handle("get-songs", async (e, { url }) => {
    
        const formatItems = (items) => items.map(item => {
            return {
                index: item.index,
                title: item.title,
                url: item.shortUrl 
            } 
        })
    
        if (nextBatch.url && nextBatch.url !== url) {
            nextBatch = {
                url: url,
                continuation: undefined
            }
        }
    
        try {
            let currentBatch
    
            if (!nextBatch.continuation) {
                currentBatch = await ytpl(url, { pages: 1 })
            } else {
                currentBatch = await ytpl.continueReq(nextBatch.continuation)
            }
    
            if (!currentBatch.continuation) {
                return {
                    statusCode: 200,
                    data: formatItems(currentBatch.items) 
                }
            }
    
            nextBatch = {
                url: url,
                continuation: currentBatch.continuation
            }
    
            return {
                statusCode: 202,
                data: formatItems(currentBatch.items)
            }
        } catch {
            return {
                statusCode: 500
            }
        }
    })
}

