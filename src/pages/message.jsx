import React, { Component } from 'react';
import { DatePicker, Table, Button, message } from 'antd';
import moment from 'moment';
import '../assets/css/message.css'

export default class Message extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: []
        }
        this.columnsContent = [
            { title: '用户名', dataIndex: 'phone' },
            { title: '假期开始时间', dataIndex: 'holidayStartTime' },
            { title: '请假类型', dataIndex: 'holidayType' },
            { title: '请假时长', dataIndex: 'holidayLong' },
            { title: '请假理由', dataIndex: 'holidayReason' },
            {
                title: '审批', dataIndex: 'approve',
                render: text => (
                    <Button type="parimary">审批</Button>
                )
            }
        ];
    }
    componentDidMount() {
        let that = this;
        fetch('http://localhost:3111/search/approveHoliday', { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let dataContent = data.content;
                    for (let item of dataContent) {
                        item['holidayStartTime'] = moment(item['holidayStartTime']).format('YYYY-MM-DD');
                    }
                    that.setState({ dataContent: dataContent });
                } else {
                    message.error(data.msg);
                }
            }, (err) => {
                message.error(err);
            })
    }
    render() {
        return (
            <div className="holiday">
                <h1 className="holiday-title">假期审批列表</h1>
                <div style={{ width: 900 }}>
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
            </div>
        )
    }
}