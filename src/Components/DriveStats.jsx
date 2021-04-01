import React, { Component } from 'react';
import DriveSummary from './DriveSummary';

class DriveStats extends Component {

    render() {
        return (
            <div>
                <DriveSummary />
                <div>
                    Drive Stats
                </div>
            </div>
        )
    }
}

export default DriveStats;