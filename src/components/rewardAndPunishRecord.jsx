import React, { Component } from 'react';
import { DatePicker, Button, Timeline } from 'antd';

import './css/rewardAndPunishRecord.css'

export default class Record extends Component {
    componentDidMount() {
        fetch('http://localhost:3111/search/getWorkRecord', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    console.log(data);
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    render() {
        return (
            <div>
                <div className="record">
                    <Timeline>
                        <Timeline.Item color="green"><span>2018-01-01</span>&nbsp;&nbsp;&nbsp;优秀技术标兵</Timeline.Item>
                    </Timeline>
                </div>
            </div>
        )
    }
}