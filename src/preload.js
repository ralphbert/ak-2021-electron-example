const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api', {
    play: () => ipcRenderer.invoke('beep:play'),
    open: () => ipcRenderer.invoke('dialog:open'),
    read: (file) => ipcRenderer.invoke('file:read', file),
    write: (fileContent) => ipcRenderer.invoke('file:write', fileContent),
})
