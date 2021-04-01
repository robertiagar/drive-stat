import Drives from './Components/Drives';
import React, { Component } from 'react';
import DriveStats from './Components/DriveStats';
//const { remote } = window.require('electron');

// const drives =
//   [{
//     name: 'C:\\',
//     freeSpace: 394873294832,
//     totalSpace: 504873294832
//   }, {
//     name: 'D:\\',
//     freeSpace: 3928731202,
//     totalSpace: 4428731203
//   },
//   {
//     name: 'E:\\',
//     freeSpace: 938493802,
//     totalSpace: 10438493803
//   }];

export default class App extends Component {
  render() {
    return (
      <div className="flex flex-row w-auto h-auto m-0 dark:bg-gray-900 dark:text-gray-50">
        <div className="h-screen w-1/3">
          <div className="flex flex-col p-4 space-y-10 content-between">
            <div className="flex flex-row items-center text-xl font-bold content-between space-x-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
              <p>Drive Stat</p>
            </div>
            <Drives></Drives>
          </div>
        </div>
        <div className="h-screen lg:w-2/3 px-3 border-l">
          <DriveStats />
        </div>
      </div>
    )
  }
}