import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker, Button, Table, message } from 'antd';

const columnsStatistical = [
    {
        title: '职工编号',
        dataIndex: 'id'
    },
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '迟到次数',
        dataIndex: 'late'
    },
    {
        title: '早退次数',
        dataIndex: 'leave'
    },
    {
        title: '矿工次数',
        dataIndex: 'absenteeism'
    }
]
const dataStatistical = [
    {
        key: '1',
        id: '19960906',
        name: '舒健',
        late: '5',
        leave: '7',
        absenteeism: '2'
    }
]
export default class Attendance extends Component {
    constructor() {
        super();
        this.state = {
            starttime: '',
            endtime: '',
            dataContent: []
        };
        this.columnsContent = [{ title: '日期', dataIndex: 'date', }, { title: '上班打卡时间', dataIndex: 'starttime', }, { title: '下班打卡时间', dataIndex: 'endtime', }, { title: '状态', dataIndex: 'state' }];
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleStartTime(data) {
        if (data && data._d) {
            // this.setState()方法是 异步操作
            this.setState({ starttime: moment(data._d).format('YYYY-MM-D') });
        }
    }
    handleEndTime(data) {
        if (data && data._d) {
            this.setState({ endtime: moment(data._d).format('YYYY-MM-D') });
        }
    }
    // mergeUrl 目前只适用与两个参数的情况
    mergeUrl(url, params) {
        let paramsArray = [];
        url += '?';
        if (params) {
            Object.keys(params).forEach(value => paramsArray.push(value + '=' + params[value]));
        }
        paramsArray.forEach((value, index) => {
            if (index % 2 === 0) {
                url += value + "&";
            } else {
                url += "&" + value;
            }
        });
        return url;
    }
    handleSubmit() {
        if (this.state.starttime === '') {
            message.error('未选择开始时间!');
            return;
        }
        if (moment().isBefore(this.state.starttime)) {
            message.error('开始时间大于当前时间!');
            return;
        }
        if (moment(this.state.endtime).isBefore(moment(this.state.starttime))) {
            message.error('结束时间小于开始时间!');
            return;
        }
        fetch(this.mergeUrl('http://localhost:3111/search/clockinrecord', { starttime: this.state.starttime, endtime: this.state.endtime }), {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let dataContent = [];
                    data.content.forEach(function (value, index) {
                        dataContent.push({ key: index });
                        dataContent[index]["starttime"] = value.starttime;
                        dataContent[index]["endtime"] = value.endtime;
                        dataContent[index]["date"] = moment(value.date).format("YYYY-MM-DD");
                        dataContent[index]["state"] = value.state;
                    });
                    this.setState({ dataContent });
                } else {
                    message.warn(data.msg);
                }
            }, (err) => {

            })
    }
    render() {
        return (
            <div>
                <div className="dataPick">
                    <h2>选择查询考勤区间：</h2>
                    <span>开始时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="Start time" onChange={this.handleStartTime} /><span>结束时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="End time" onChange={this.handleEndTime} />
                    <Button type="primary" onClick={this.handleSubmit} icon="search">查 询</Button>
                </div>
                <div style={{ height: 250 }}>
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
                <h2>考勤情况统计：</h2>
                <Table columns={columnsStatistical} dataSource={dataStatistical} size="small" pagination={{ hideOnSinglePage: true }} />
            </div>
        )
    }
}