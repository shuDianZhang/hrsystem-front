import React, { Component } from 'react';
import { Table, Button, Input, message } from 'antd';
import './css/accountManage.css';

const Search = Input.Search;

export default class AccoutManage extends Component {
    constructor() {
        super();
        this.state = {
            dataContent: []
        }
        this.columnsContent = [
            { title: '账户', dataIndex: '_id' },
            { title: '姓名', dataIndex: 'name' },
            {
                title: '删除账户', key: 'delete', render: (text, record) => (
                    <Button type="danger" onClick={this.deleteAccount.bind(this, record)} size="small">删除</Button>
                )
            },
            {
                title: '重置密码', key: 'reset',
                render: (text, record) => (
                    <Button type="primary" onClick={this.resetPassword.bind(this, record)} size="small">重置密码</Button>
                )
            }
        ];
        this.searchAccount = this.searchAccount.bind(this);
    }
    deleteAccount(record) {

    }
    resetPassword(record) {
        fetch(`http://localhost:3111/upload/resetAccount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username: record.username })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    searchAccount(username) {
        fetch(`http://localhost:3111/search/accountList?username=${username}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    console.log(data.content);
                    this.setState({ dataContent: data.content });
                } else if (data.status === 2) {
                    message.warn(data.msg);
                }
                else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    componentDidMount() {
        fetch('http://localhost:3111/search/accountList', {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    console.log(data.content);
                    this.setState({ dataContent: data.content });
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    render() {
        return (
            <div>
                <h2>搜索账号：</h2>
                <Search
                    style={{ width: 200 }}
                    placeholder="搜索账号"
                    onSearch={this.searchAccount}
                    enterButton
                />
                <br /><br />
                <h2>账户列表：</h2>
                <div className="tableContain">
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
            </div>
        )
    }
}