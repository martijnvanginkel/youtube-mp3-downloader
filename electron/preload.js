const { ipcRenderer, contextBridge } = require("electron")

const API = {
    showMessage: ({ message, type }) => ipcRenderer.invoke("show-message", { message, type }),
    pickFolder: () => ipcRenderer.invoke("pick-folder"),
    getSongs: ({ url }) => ipcRenderer.invoke("get-songs", { url }),
    downloadSongs: async ({ songs, outputFolder, responseCb }) => {

        const handler = (e, { songUrl, statusCode }) => responseCb({ songUrl, statusCode})

        ipcRenderer.on("download-response", handler)
        await ipcRenderer.invoke("download-songs", { songs, outputFolder })

        ipcRenderer.removeAllListeners("download-response", handler)
        return true
    }
}

contextBridge.exposeInMainWorld("API", API)
