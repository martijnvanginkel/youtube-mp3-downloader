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

    ipcMain.handle("chooseFolder", async () => {
    
        const filePath = await dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] })
            .then(result => {
                if (result.canceled) {
                    return
                }
                return result.filePaths[0]
            })

        console.log(filePath, 'ehasdfasdf')
        
        if (!filePath) {
            throw new Error('Something went wrong choosing a folder')
        }

        return filePath
    })

    ipcMain.handle("downloadSongs", async (e, { songs, outputFolder }) => {
    

        let max = 10

        for (let index = 0; index < max; index++) {
            // const element = array[index];

            await new Promise(resolve => setTimeout(resolve, 1000))

            mainWindow.webContents.send("song-downloaded")
            console.log('hoi')
            
            
        }

    
        // console.log(songs, outputFolder)
    })
});


ipcMain.handle("getSongs", (e, { url }) => {

    console.log('get songs ', url)

    return [
		{ title: 'Song one', url: 'youtube.com/urlone' },
		{ title: 'Song two', url: 'youtube.com/urltwo'  },
		{ title: 'Song three', url: 'youtube.com/urlthree' }
	]
})

