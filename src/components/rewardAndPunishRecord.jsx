import React, { Component } from 'react';
import { DatePicker, Button, Timeline } from 'antd';

import './css/rewardAndPunishRecord.css'

export default class Record extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>选择查询区间：</h2>
                    <span>开始时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="Start time" onChange={this.onChange} /><span>结束时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="End time" onChange={this.onChange} />
                    <Button type="primary" icon="search">查 询</Button>
                </div>
                <div className="record">
                    <Timeline>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>Solve initial network problems 1</p>
                            <p>Solve initial network problems 2</p>
                            <p>Solve initial network problems 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
        )
    }
}