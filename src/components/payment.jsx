import React, { Component } from 'react';
import { DatePicker, Table, Button, Popover, message } from 'antd';
import './css/payment.css';
import moment from 'moment';

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: [],
            startTime: null,
            endTime: null
        }
        this.content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        this.columnsContent = [
            { title: '时间', dataIndex: 'date' },
            { title: '基本工资（元）', dataIndex: 'baseSalary' },
            {
                title: '服务津贴（元）', key: 'serviceSalary',
                render: (text, record, index) => (
                    <Popover content={this.content} title="Title" trigger="hover">
                        1000
                </Popover>
                )
            },
            { title: '加班工资（元）', dataIndex: 'overtimeSalary' },
            { title: '奖励金额（元）', dataIndex: 'rewardSalary' },
            { title: '扣款金额（元）', dataIndex: 'punishMoney' },
            { title: '应发工资（元）', dataIndex: 'shouldPay' }
        ];
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.querySalary = this.querySalary.bind(this);
    }
    onChangeStartTime(date, dateString) {
        this.setState({ startTime: data });
    }
    onChangeEndTime(date, dateString) {
        this.setState({ endTime: data });
    }
    querySalary() {
        fetch('http://localhost:3111/search/salary', { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error(data.msg);
                } else {
                    let arr = data.content;
                    arr.map(function (item, index) {
                        item['date'] = moment(item['date']).format("YYYY-MM-DD");
                    });
                    this.setState({ dataContent: arr });
                }
            }, (err) => {
                message.error(err);
            })
    }
    render() {
        return (
            <div>
                <div className="dataPick">
                    <h2>选择查询区间：</h2>
                    <span>开始时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="Start time" onChange={this.onChangeStartTime} /><span>结束时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="End time" onChange={this.onChangeEndTime} />
                    <Button type="primary" icon="search" onClick={this.querySalary}>查 询</Button>
                </div>
                <h2>工资清单：</h2>
                <div style={{ height: 250 }}>
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
            </div>
        )
    }
}