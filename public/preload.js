const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("api", {
  loadDriveList: (data) => ipcRenderer.send("getDriveList"),
  onDrivesLoaded: (fn) => {
    // Deliberately strip event as it includes `sender` 
    ipcRenderer.on('onDriveList', (event, ...args) => fn(...args));
  }
})