import React, { Component } from 'react';
import { Timeline, message } from 'antd';
import { hashHistory } from 'react-router';

import './css/employeeInfo.css'

export default class EmployeeInfo extends Component {
    constructor() {
        super();
        this.state = {
            content: { honor: [] }
        }
    }
    componentDidMount() {
        fetch('http://localhost:3111/search/employeeInfo', { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ content: data.content });
                } else {
                    message.error(data.msg);
                    hashHistory.push('/');
                }
            }, (err) => {
                message.error(err);
            })
    }
    render() {
        return (
            <div className="container">
                <h2>基本信息：</h2>
                <span className="infoTag">姓名：</span><div className="infoShow">{this.state.content.name}</div><br />
                <span className="infoTag">性别：</span><div className="infoShow">{this.state.content.sex}</div><br />
                <span className="infoTag">民族：</span><div className="infoShow">{this.state.content.nation}</div><br />
                <span className="infoTag">身份证号：</span><div className="infoShow middle">{this.state.content.idnumber}</div><br />
                <span className="infoTag">出生日期：</span><div className="infoShow">{this.state.content.borndate}</div><br />
                <span className="infoTag">婚姻状况：</span><div className="infoShow">{this.state.content.marriage}</div><br />
                <span className="infoTag">户籍所在地：</span><div className="infoShow long">{this.state.content.home}</div><br />
                <span className="infoTag">联系电话：</span><div className="infoShow">{this.state.content.phone}</div><br />
                <span className="infoTag">工作邮箱：</span><div className="infoShow middle">{this.state.content.email}</div><br />
                <h2>毕业院校</h2>
                <span className="infoTag">最高学历：</span><div className="infoShow">{this.state.content.degree}</div><br />
                <span className="infoTag">毕业院校：</span><div className="infoShow">{this.state.content.collage}</div><br />
                <span className="infoTag">毕业时间：</span><div className="infoShow">{this.state.content.graduation}</div><br />
                <h2>职位信息：</h2>
                <span className="infoTag">所属部门：</span><div className="infoShow job">{this.state.content.dept}</div><br />
                <span className="infoTag">职位：</span><div className="infoShow job">{this.state.content.job}</div><br />
                <span className="infoTag">所获荣誉：</span>
                <Timeline className="reward">
                    {
                        this.state.content.honor.map(function (item, index) {
                            return <Timeline.Item key={index}>{item}</Timeline.Item>
                        })
                    }
                </Timeline>
            </div>
        )
    }
}