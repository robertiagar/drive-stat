const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs');
const path = require('path');
const pt = path.join("C:", "Snip");
console.log(pt);
const files = fs.readdirSync(pt);
console.log(files);

contextBridge.exposeInMainWorld("api", {
  loadDriveList: (data) => ipcRenderer.send("getDriveList"),
  onDrivesLoaded: (fn) => {
    // Deliberately strip event as it includes `sender` 
    ipcRenderer.on('onDriveList', (event, ...args) => fn(...args));
  },
  getFolderSize: (path) => ipcRenderer.send("getFolderSize", path),
  onGotFolderSize: (fn) => {
    ipcRenderer.on('onFolderSize', (event, ...args) => fn(...args));
  }
})