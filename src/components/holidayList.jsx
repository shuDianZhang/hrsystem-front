import React, { Component } from 'react';
import { DatePicker, Table, Button, message } from 'antd';
import moment from 'moment';

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: []
        }
        this.columnsContent = [
            { title: '假期开始时间', dataIndex: 'holidayStartTime' },
            { title: '请假类型', dataIndex: 'holidayType' },
            { title: '请假时长', dataIndex: 'holidayLong' },
            { title: '请假理由', dataIndex: 'holidayReason' },
            {
                title: '是否通过', dataIndex: 'ifApprove',
                render: text => (
                    <div style={text ? { color: '#4169e1' } : { color: '#ff00ff' }} > {text ? '已通过' : '未通过'}</div >
                )
            }
        ];
    }
    componentDidMount() {
        fetch('http://localhost:3111/search/holidaylist', { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let dataContent = data.content;
                    for (let item of dataContent) {
                        item['holidayStartTime'] = moment(item['holidayStartTime']).format('YYYY-MM-DD');
                    }
                    this.setState({ dataContent: dataContent });
                } else {
                    message.error(data.msg);
                }
            }, (err) => {
                message.error(err);
            })
    }
    render() {
        return (
            <div style={{ width: 900 }}>
                <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
            </div>
        )
    }
}