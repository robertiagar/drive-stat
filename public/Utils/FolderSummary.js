const fs = require("fs").promises;
const path = require("path");
//const async = require("async");

class FolderSummary {

    constructor(folderPath) {
        this.summary = {};
        this.folderPath = folderPath;
        this.getTotalSize = getTotalSize;
    }
}

async function getAllFiles(dirPath, arrayOfFiles) {
    let files = await fs.readdir(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    await Promise.all(files.map(async (file) => {
        const stat = await fs.stat(dirPath + "/" + file);
        const isDir = stat.isDirectory();
        if (isDir) {
            arrayOfFiles = await getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    }));

    return arrayOfFiles;
}

async function getTotalSize() {
    const arrayOfFiles = await getAllFiles(this.folderPath);

    let totalSize = 0;

    await Promise.all(arrayOfFiles.map(async (filePath) => {
        const stat = await fs.stat(filePath);
        totalSize += stat.size;
    }));

    return totalSize;
}



module.exports = { FolderSummary };