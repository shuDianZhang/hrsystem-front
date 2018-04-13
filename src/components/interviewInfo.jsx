import React, { Component } from 'react';
import { Table, Button, Icon, Divider, message } from 'antd';

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: []
        }
        this.columns = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '性别', dataIndex: 'sex', key: 'sex' },
            { title: '应聘岗位', dataIndex: 'job', key: 'job' },
            { title: '毕业院校', dataIndex: 'collage', key: 'collage' },
            { title: '专业', dataIndex: 'profess', key: 'profess' },
            { title: '期望薪资', dataIndex: 'salary', key: 'salary' },
            {
                title: '邀请面试', key: 'action',
                render: (text, record, index) => (
                    <span>
                        <a onClick={this.onDelete.bind(this, index)}>回拒</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">邀请面试</a>
                    </span>
                ),
            },
            {
                title: '查看简历', key: 'resume',
                render: (text, record, index) => (
                    <Button onClick={this.showDetail.bind(this, record)} type="primary">查看</Button>
                ),
            }
        ]
    }
    onDelete(index) {
        let arr = this.state.dataContent;
        arr.splice(index, 1);
        this.setState({ dataContent: arr });
    }
    showDetail(info) {
    }
    componentWillMount() {
        fetch("http://localhost:3111/search/getResume", { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ dataContent: data.content });
                } else {
                    message.error(data.msg);
                }
            }, (err) => { console.error(err) })
        fetch("http://localhost:3111/send/email", { method: 'POST', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
            }, (err) => { console.error(err) })
    }
    render() {
        return (
            <div>
                <h2>简历列表：</h2>
                <div style={{ height: 250 }}>
                    <Table columns={this.columns} dataSource={this.state.dataContent} size="middle" pagination={{ pageSize: 8 }} />
                </div>
            </div>
        )
    }
}