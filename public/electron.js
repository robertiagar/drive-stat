const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const nodeDiskInfo = require('node-disk-info');
const { FolderSummary } = require(isDev ? path.join(__dirname, 'Utils/FolderSummary.js') : path.join(__dirname, "../build/Utils/FolderSummary.js"));

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
    app.quit();
}

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        minWidth: 700,
        width: 800,
        height: 600,
        webPreferences: {
            preload: isDev
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, "../build/preload.js")
        },
        menu: {

        }
    });

    win.removeMenu();

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('getDriveList', (event, args) => {
    nodeDiskInfo.getDiskInfo()
        .then(disks => {
            event.sender.send('onDriveList', disks);
        })
        .catch(reason => {
            console.error(reason);
        });
})

ipcMain.on('getFolderSize', async (event, args) => {
    console.log('getFolderSize');
    const folderSummary = new FolderSummary(args);
    const size = await folderSummary.getTotalSize();
    event.sender.send('onFolderSize', size);
    //console.log(folderSummary);
})