import React, { Component } from 'react';
import { getReadableFileSizeString, percent } from '../Utils/MemoryUtils';

class Drives extends Component {
    constructor() {
        super();
        this.state = { drives: [] };
    }
    render() {
        return (
            <div className="flex flex-col space-y-8">
                {this.state.drives?.map((item, index) =>
                    <div key={index} className="flex-col space-y-2 pt-6 pb-3 rounded shadow-md px-3 items-center relative hover:bg-gray-100 active:shadow-inner dark:bg-gray-50">
                        <div className="flex flex-col items-center absolute top-0 -my-5">
                            <div className="bg-gray-100 text-gray-900 rounded-full w-auto h-10 flex items-center justify-center p-4 mb-2 shadow space-x-2">
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-xs text-gray-400">({item.type})</div>
                            </div>
                        </div>
                        <div className="relative h-2 bg-gray-500 rounded rounded-tl-none mt-5">
                            <div className="absolute top-0 h-2 bg-green-400 rounded rounded-tl-none" style={{ width: 100 - item.percent + "%" }}></div>
                        </div>
                        <div className="text-xs text-gray-400">{getReadableFileSizeString(item.freeSpace)} ({item.percent1}%) free of {getReadableFileSizeString(item.totalSpace)}</div>
                    </div>
                )}
            </div>
        )
    }

    componentDidMount() {
        window.api.loadDriveList();
        window.api.onDrivesLoaded(args => {
            /*_available: 15235391488
            _blocks: 255040073728
            _capacity: "94%"
            _filesystem: "Local Fixed Disk"
            _mounted: "C:"*/

            let drives = args.map(item => {
                return {
                    name: item._mounted.replace(':', ''),
                    totalSpace: item._blocks,
                    freeSpace: item._available,
                    percent: percent(item._available, item._blocks, 0),
                    percent1: percent(item._available, item._blocks, 1),
                    type: item._filesystem
                }
            });
            console.log(args);
            this.setState({ drives });
        });
    }
}

export default Drives;