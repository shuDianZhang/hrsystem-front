import React, { Component } from 'react';
import { Table, Button, Input, message, Modal } from 'antd';

const Search = Input.Search;

export default class AccoutManage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            dataContent: [],
            employeeInfo: {}
        }
        this.columnsContent = [
            { title: '姓名', dataIndex: 'name' },
            { title: '性别', dataIndex: 'sex' },
            { title: '民族', dataIndex: 'nation' },
            { title: '身份证号', dataIndex: 'idnumber' },
            { title: '联系电话', dataIndex: 'phone' },
            {
                title: '查看详情', key: 'detail', render: (text, record) => (
                    <Button type="primary" onClick={this.showDetail.bind(this, record)} size="small">查看</Button>
                )
            }
        ];
        this.searchAccount = this.searchAccount.bind(this);
        this.handleCancelInterview = this.handleCancelInterview.bind(this);
    }
    searchAccount(value) {
        fetch(`http://localhost:3111/search/employeeInfoList?name=${value}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let userInfo = {};
                    let dataContent = [];
                    userInfo['name'] = data.content.name;
                    userInfo['sex'] = data.content.sex;
                    userInfo['nation'] = data.content.nation;
                    userInfo['idnumber'] = data.content.idnumber;
                    userInfo['phone'] = data.content.phone;
                    dataContent.push(userInfo);
                    this.setState({ dataContent });
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    showDetail(record) {
        let that = this;
        fetch(`http://localhost:3111/search/employeeInfoList?name=${record.name}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    that.setState({ visible: true, employeeInfo: data.content });
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
    handleCancelInterview() {
        this.setState({ visible: false });
    }
    render() {
        return (
            <div>
                <h2>搜索职员姓名：</h2>
                <Search
                    placeholder="搜索职员姓名"
                    onSearch={this.searchAccount}
                    style={{ width: 200 }}
                    enterButton
                />
                <br /><br />
                <h2>职员信息列表：</h2>
                <div className="tableContain">
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
                <div>
                    <Modal width={800}
                        title="职员详细信息"
                        visible={this.state.visible}
                        onCancel={this.handleCancelInterview}
                        footer={null}>
                        <div className="container">
                            <h2>基本信息：</h2>
                            <span className="infoTag">姓名：</span><div className="infoShow">{this.state.employeeInfo.name}</div><br />
                            <span className="infoTag">性别：</span><div className="infoShow">{this.state.employeeInfo.sex}</div><br />
                            <span className="infoTag">民族：</span><div className="infoShow">{this.state.employeeInfo.nation}</div><br />
                            <span className="infoTag">身份证号：</span><div className="infoShow middle">{this.state.employeeInfo.idnumber}</div><br />
                            <span className="infoTag">出生日期：</span><div className="infoShow">{this.state.employeeInfo.borndate}</div><br />
                            <span className="infoTag">婚姻状况：</span><div className="infoShow">{this.state.employeeInfo.marriage}</div><br />
                            <span className="infoTag">户籍所在地：</span><div className="long">{this.state.employeeInfo.home}</div><br />
                            <span className="infoTag">联系电话：</span><div className="infoShow">{this.state.employeeInfo.phone}</div><br />
                            <span className="infoTag">工作邮箱：</span><div className="infoShow middle">{this.state.employeeInfo.email}</div><br />
                            <h2>毕业院校</h2>
                            <span className="infoTag">最高学历：</span><div className="infoShow">{this.state.employeeInfo.degree}</div><br />
                            <span className="infoTag">毕业院校：</span><div className="infoShow">{this.state.employeeInfo.collage}</div><br />
                            <span className="infoTag">毕业时间：</span><div className="infoShow">{this.state.employeeInfo.graduation}</div><br />
                            <h2>职位信息：</h2>
                            <span className="infoTag">所属部门：</span><div className="job">{this.state.employeeInfo.dept}</div><br />
                            <span className="infoTag">职位：</span><div className="job">{this.state.employeeInfo.job}</div><br />
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}