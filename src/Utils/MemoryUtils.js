export function getReadableFileSizeString(fileSizeInBytes) {
    if (fileSizeInBytes === 0) return 0;

    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

export function percent(freeSpace, totalSpace, fixed) {
    if (totalSpace === 0) return 0;
    return 100 - ((freeSpace * 100) / totalSpace).toFixed(fixed);
}