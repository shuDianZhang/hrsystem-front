import React, { Component } from 'react';
import { DatePicker, Table, Button, message, Popover } from 'antd';
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
            {
                title: '请假理由', key: 'holidayReason',
                render: (text, record, index) => (
                    <Popover title="图片证明" content={
                        <div className="popover-area">
                            <img className="popover-image" src={record.imageUrl[0]} alt="" />
                        </div>
                    } trigger="hover">
                        <div>{record.holidayReason}</div>
                    </Popover>
                )
            },
            {
                title: '审批', dataIndex: 'approve',
                render: (text, record, index) => (
                    <Button type="primary" onClick={this.approval.bind(this, index, record)} >审批</Button>
                )
            }
        ];
    }
    approval(index, record) {
        let values = {};
        values['_id'] = record._id;
        let arr = this.state.dataContent;
        arr.splice(index, 1);
        fetch('http://localhost:3111/holiday/approval',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    // let dataContent = data.content;
                    // for (let item of dataContent) {
                    //     item['holidayStartTime'] = moment(item['holidayStartTime']).format('YYYY-MM-DD');
                    // }
                    // that.setState({ dataContent: dataContent });
                    message.success('审批成功');
                    this.setState({ dataContent: arr });
                } else {
                    message.error(data.msg);
                }
            }, (err) => {
                message.error(err);
            })
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
            <div className="message-bg">
                <div className="holiday">
                    <h1 className="holiday-title">假期审批列表</h1>
                    <div className="holiday-table">
                        <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                    </div>
                </div>
            </div>
        )
    }
}