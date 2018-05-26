import React, { Component } from 'react';
import { DatePicker, Button, Timeline } from 'antd';

import './css/rewardAndPunishRecord.css'

export default class Record extends Component {
    constructor() {
        super();
        this.state = {
            workRecord: null
        }
    }
    componentDidMount() {
        fetch(`http://localhost:3111/search/getWorkRecord`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let workRecord = data.content;
                    this.setState({ workRecord });
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    render() {
        if (this.state.workRecord) {
            var timeline = this.state.workRecord.map(function (item, index) {
                return <Timeline.Item color={item.good ? 'green' : 'red'}><span>{item.date}</span>&nbsp;&nbsp;&nbsp;{item.good ? item.good : item.bad}</Timeline.Item>
            });
        }
        return (
            <div>
                <div className="record">
                    <Timeline>
                        {timeline}
                    </Timeline>
                </div>
            </div>
        )
    }
}