const { ipcRenderer, contextBridge } = require("electron")

const API = {
    chooseFolder: () => ipcRenderer.invoke("chooseFolder"),
    getSongs: ({ url }) => ipcRenderer.invoke("getSongs", { url }),
    downloadSongs: ({ songs, outputFolder, callback }) => {

        // function downloadCb() {

        //     ipcRenderer.on("song-downloaded", () => console.log('downloaded'))
        // }

        ipcRenderer.on("song-downloaded", () => {
            callback()
        })


        ipcRenderer.invoke("downloadSongs", { songs, outputFolder })
    },

    
}


contextBridge.exposeInMainWorld("API", API)
