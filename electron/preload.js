const { ipcRenderer, contextBridge } = require("electron")

const API = {
    loadSongs: () => ipcRenderer.invoke("loadSongs")
}

contextBridge.exposeInMainWorld("API", API)
