export class ExtensionsSummary {
    constructor() {
        this.extensions = {};
        this.totalExtensionsSize = 0;
    }

    getExtensionSummary() {
        const result = [];
        for (var extension in this.extensions) {
            var extensionCount = this.extensions[extension];
            var percent = (extensionCount * 100 / this.totalExtensionsSize).toFixed(1);
            result.push({ extension, percent })
        }

        return result.sort((a, b) => b.percent - a.percent);
    }

    add(extension, size) {
        if (this.extensions[extension])
            this.extensions[extension] += size;
        else
            this.extensions[extension] = size;
        this.totalExtensionsSize += size;
    }
}