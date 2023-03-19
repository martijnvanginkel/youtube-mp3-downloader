const { ipcRenderer, contextBridge } = require("electron")

const API = {
    chooseFolder: () => ipcRenderer.invoke("chooseFolder"),
    getSongs: (url) => ipcRenderer.invoke("getSongs", url)
}

contextBridge.exposeInMainWorld("API", API)
