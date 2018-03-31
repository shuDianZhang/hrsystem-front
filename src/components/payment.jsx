import React, { Component } from 'react';
import { DatePicker, Table, Button } from 'antd';
import './css/payment.css';

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: []
        }
        this.columnsContent = [
            { title: '时间', dataIndex: 'time' },
            { title: '基本工资（元）', dataIndex: 'baseSalary' },
            { title: '服务津贴（元）', dataIndex: 'serviceSalary' },
            { title: '奖励金额（元）', dataIndex: 'rewardSalary' },
            { title: '加班工资（元）', dataIndex: 'overtimeSalary' },
            { title: '惩罚扣款金额（元）', dataIndex: 'punishMoney' },
            { title: '应发工资（元）', dataIndex: 'shouldPay' },
            { title: '实发工资（元）', dataIndex: 'actualPay' }
        ];
    }
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    render() {
        return (
            <div>
                <div className="dataPick">
                    <h2>选择查询区间：</h2>
                    <span>开始时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="Start time" onChange={this.onChange} /><span>结束时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="End time" onChange={this.onChange} />
                    <Button type="primary" icon="search">查 询</Button>
                </div>
                <h2>工资清单：</h2>
                <div style={{ height: 250 }}>
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
            </div>
        )
    }
}