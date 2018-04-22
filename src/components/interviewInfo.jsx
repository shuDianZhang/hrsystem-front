import React, { Component } from 'react';
import { Divider, Modal, Table, Button, Icon, message, Input } from 'antd';
import moment from 'moment';

import './css/interviewInfo.css'

const { TextArea } = Input;

export default class Payment extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            dataContent: [],
            resumeDetail: {
                workExperience: [],
                projectExperience: []
            }
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
                        <a onClick={this.onDelete.bind(this, index, record)}>回拒</a>
                        <Divider type="vertical" />
                        <a onClick={this.interview.bind(this, record)}>邀请面试</a>
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
        this.handleCancel = this.handleCancel.bind(this);
    }
    interview(info) {
        fetch("http://localhost:3111/send/email",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ type: 'interview', name: info.name })
            }
        ).then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    message.success('面试邀请邮件发送成功!');
                    return;
                }
                message.error(data.msg);
            }, (err) => { console.error(err) })
    }
    onDelete(index, info) {
        let arr = this.state.dataContent;
        arr.splice(index, 1);
        fetch("http://localhost:3111/send/email",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ type: 'fail', name: info.name })
            }
        ).then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    message.success('回绝面试邮件已发送!');
                    this.setState({ dataContent: arr });
                    return;
                }
                message.error(data.msg);
            }, (err) => { console.error(err) })
    }
    showDetail(info) {
        fetch(`http://localhost:3111/search/detailResume?name=${info.name}`, { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    console.log(data.resumeDetail);
                    this.setState({ resumeDetail: data.resumeDetail });
                } else {
                    message.error(data.msg);
                }
            }, (err) => { console.error(err) })
        this.setState({ visible: true });
    }
    handleCancel() {
        this.setState({ visible: false });
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
    }
    render() {
        return (
            <div>
                <h2>简历列表：</h2>
                <div style={{ height: 250 }}>
                    <Table columns={this.columns} dataSource={this.state.dataContent} size="middle" pagination={{ pageSize: 8 }} />
                </div>
                <div>
                    <Modal width={800}
                        title="简历详情"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" type="primary" onClick={this.handleCancel}>关闭</Button>
                        ]}
                    >
                        <div className="container">
                            <h2>基本信息：</h2>
                            <span className="infoTag">姓名：</span><div className="infoShow">{this.state.resumeDetail.name}</div><br />
                            <span className="infoTag">性别：</span><div className="infoShow">{this.state.resumeDetail.sex}</div><br />
                            <span className="infoTag">出生日期：</span><div className="infoShow">{moment(this.state.resumeDetail.birthday).format('YYYY-MM-DD')}</div><br />
                            <span className="infoTag">最高学历：</span><div className="infoShow middle">{this.state.resumeDetail.hightDegree}</div><br />
                            <span className="infoTag">工作年限：</span><div className="infoShow">{this.state.resumeDetail.worktime}</div><br />
                            <span className="infoTag">手机号码：</span><div className="infoShow middle">{'+' + this.state.resumeDetail.prefix + '  ' + this.state.resumeDetail.phone}</div><br />
                            <span className="infoTag">email：</span><div className="infoShow little-long">{this.state.resumeDetail.email}</div><br />
                            <span className="infoTag">社交主页地址：</span><div className="infoShow little-long">{this.state.resumeDetail.website}</div><br /><br /><br />
                            <h2>基本信息：</h2>
                            <span className="infoTag">学校名称：</span><div className="infoShow">{this.state.resumeDetail.collage}</div><br />
                            <span className="infoTag">所学专业：</span><div className="infoShow">{this.state.resumeDetail.profess}</div><br />
                            <span className="infoTag">学历：</span><div className="infoShow">{this.state.resumeDetail.degree}</div><br />
                            <span className="infoTag">毕业年份：</span><div className="infoShow middle">{this.state.resumeDetail.graduation}</div><br /><br /><br />
                            <h2>期望工作：</h2>
                            <span className="infoTag">期望职位：</span><div className="infoShow middle">{this.state.resumeDetail.job}</div><br />
                            <span className="infoTag">工作状态：</span><div className="infoShow">{this.state.resumeDetail.jobState}</div><br />
                            <span className="infoTag">期望城市：</span><div className="infoShow">{this.state.resumeDetail.city}</div><br />
                            <span className="infoTag">期望月薪：</span><div className="infoShow middle">{this.state.resumeDetail.salary}</div><br /><br /><br />
                            <h2>工作经历：</h2>
                            {
                                this.state.resumeDetail.workExperience.map(function (item, index) {
                                    return (<div key={index + 1}><Divider orientation="right">{'WorkExperience' + (index + 1)}</Divider>
                                        <span className="infoTag">公司：</span> <div className="infoShow little-long">{item.company}</div> <br />
                                        <span className="infoTag">职位：</span> <div className="infoShow middle">{item.historyJob}</div> <br />
                                        <span className="infoTag">在职时间：</span> <div className="infoShow little-long">{moment(item.rangeTime[0]).format('YYYY-MM-DD') + '——' + moment(item.rangeTime[1]).format('YYYY-MM-DD')}</div> <br />
                                        <div className="textAreaContainer">
                                            <span className="infoTag">工作内容：</span><div className="textArea">{item.jobContent}</div>
                                        </div>
                                        <br />
                                    </div>)
                                })
                            }
                            <br /> <br />
                            <h2>项目经验：</h2>
                            {
                                this.state.resumeDetail.projectExperience.map(function (item, index) {
                                    return (<div key={index + 1}><Divider orientation="right">{'ProjectExperience' + (index + 1)}</Divider>
                                        <span className="infoTag">项目名称：</span> <div className="infoShow little-long">{item.projectName}</div> <br />
                                        <span className="infoTag">你的职责：</span> <div className="infoShow middle">{item.duty}</div> <br />
                                        <span className="infoTag">项目起止时间：</span> <div className="infoShow little-long">{moment(item.projectDuring[0]).format('YYYY-MM-DD') + '——' + moment(item.projectDuring[1]).format('YYYY-MM-DD')}</div> <br />
                                        <div className="textAreaContainer">
                                            <span className="infoTag">项目描述：</span><div className="textArea">{item.projectAbout}</div>
                                        </div>
                                        <br />
                                    </div>)
                                })
                            }
                            <br /><br />
                            <h2>自我描述：</h2>
                            <div className="textAreaContainer">
                                <span className="infoTag">自我描述：</span><div className="textArea">{this.state.resumeDetail.aboutMyself}</div><br />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}