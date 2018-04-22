import React, { Component } from 'react';
import { Table, Button, Input, message } from 'antd';

const Search = Input.Search;

export default class AccoutManage extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: []
        }
        this.columnsContent = [
            { title: '姓名', dataIndex: 'name' },
            { title: '性别', dataIndex: 'sex' },
            { title: '民族', dataIndex: 'nation' },
            { title: '身份证号', dataIndex: 'idnumber' },
            { title: '联系电话', dataIndex: 'phone' },
            {
                title: '查看详情', key: 'detail', render: (text, record) => (
                    <Button type="promary" onClick={this.showDetail.bind(this, record)} size="small">查看</Button>
                )
            }
        ];
    }
    showDetail(record) {
        fetch(`http://localhost:3111/search/employeeInfoList?name=${record.name}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    componentDidMount() {
        fetch('http://localhost:3111/search/employeeInfoList', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ dataContent: data.content });
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    render() {
        return (
            <div>
                <h2>搜索职员姓名：</h2>
                <Search
                    placeholder="搜索职员姓名"
                    onSearch={this.searchAccount}
                    enterButton
                />
                <br /><br />
                <h2>职员信息列表：</h2>
                <div className="tableContain">
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
            </div>
        )
    }
}