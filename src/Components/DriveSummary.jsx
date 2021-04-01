import React, { Component } from 'react';
import { ExtensionsSummary } from '../Utils/ExtensionsSummary';
import { getReadableFileSizeString } from "../Utils/MemoryUtils";

class DriveSummary extends Component {
    constructor() {
        super();
        this.state = { size: 0 };

        this.extensionsSummary = new ExtensionsSummary();
        this.extensionsSummary.add(".cs", 4324);
        this.extensionsSummary.add(".cs", 123);
        this.extensionsSummary.add(".cs", 49832);
        this.extensionsSummary.add(".cs", 892138);
        this.extensionsSummary.add(".txt", 98231);
        this.extensionsSummary.add(".txt", 782131);
        this.extensionsSummary.add(".txt", 231);
        this.extensionsSummary.add(".txt", 43298);
        this.extensionsSummary.add(".txt", 438927);
        this.extensionsSummary.add(".txt", 213);
        this.extensionsSummary.add(".txt", 893712);
        this.extensionsSummary.add(".txt", 32178);
        this.extensionsSummary.add(".txt", 32718);
        this.extensionsSummary.add(".ps1", 321234);
        this.extensionsSummary.add(".ps1", 87321);
        this.extensionsSummary.add(".ps1", 45412);
        this.extensionsSummary.add(".ps1", 457210);
        this.extensionsSummary.add(".ps1", 445874);
        this.extensionsSummary.add(".ps1", 8784);
        this.extensionsSummary.add(".ps1", 4451);
        this.extensionsSummary.add(".ps1", 4321);
        this.extensionsSummary.add(".ps1", 21311);
        this.extensionsSummary.add(".ps1", 3122);
        this.extensionsSummary.add(".ps1", 328);
        this.extensionsSummary.add(".ps1", 32143);
        this.extensionsSummary.add(".ps1", 43912);
        this.extensionsSummary.add(".ps1", 45923);
        this.extensionsSummary.add(".ps1", 321894);
        this.extensionsSummary.add(".dll", 23123);
        this.extensionsSummary.add(".dll", 321784);
        this.extensionsSummary.add(".dll", 4372834);
        this.extensionsSummary.add(".dll", 2314);
        this.extensionsSummary.add(".dll", 547825);
        console.log(this.extensionsSummary.getExtensionSummary());
    }

    render() {
        return (
            <div className="flex flex-col justify-center space-y-4 shadow p-2 mt-2">
                <div className="text-sm">Top 3 Extensions</div>
                <div>
                    {this.extensionsSummary.getExtensionSummary().map(item =>
                        <div key={item.extension} className="flex flex-row items-center justify-center space-x-5">
                            <div className="w-10 text-xs text-gray-400">{item.extension}</div>
                            <div className="w-full relative h-2 bg-gray-500 rounded rounded-tl-none">
                                <div className="absolute top-0 h-2 bg-green-400 rounded rounded-tl-none" style={{ width: item.percent + "%" }}></div>
                            </div>
                        </div>
                    )}
                </div>
                <div>{getReadableFileSizeString(this.state.size)}</div>
            </div>
        )
    }

    componentDidMount() {
        console.log(window.api.getFolderSize("C:\\drive-stat"));
        window.api.onGotFolderSize(size => {
            console.log(size);
            this.setState({ size: size });
        })
    }

}

export default DriveSummary;