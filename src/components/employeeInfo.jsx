import React, { Component } from 'react';
import { Timeline } from 'antd';

import './css/employeeInfo.css'

export default class EmployeeInfo extends Component {
    render() {
        return (
            <div className="container">
                <h2>基本信息：</h2>
                <span className="infoTag">姓名：</span><div className="infoShow">舒健</div>&nbsp;&nbsp;&nbsp;
                <span className="infoTag">性别：</span><div className="infoShow">男</div>&nbsp;&nbsp;&nbsp;
                <span className="infoTag">民族：</span><div className="infoShow">汉</div>&nbsp;&nbsp;&nbsp;
                <span className="infoTag">身份证号：</span><div className="infoShow middle">360124199609065111</div>&nbsp;&nbsp;&nbsp;
                <span className="infoTag">出生日期：</span><div className="infoShow">1996-10-17</div><br />
                <span className="infoTag">婚姻状况：</span><div className="infoShow">未婚</div>&nbsp;&nbsp;&nbsp;
                <span className="infoTag">户籍所在地：</span><div className="infoShow long">广西省百色市右江区中山一路49号</div>&nbsp;&nbsp;&nbsp;
                <span className="infoTag">联系电话：</span><div className="infoShow">17687467066</div>&nbsp;&nbsp;&nbsp;
                <h2>教育经历：</h2>
                <table className="education">
                    <thead>
                        <tr>
                            <td>时间</td>
                            <td>在读学校</td>
                            <td>证明人</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>2008/9/1-2011/6/1</td>
                            <td>田阳县实验中学</td>
                            <td>黄玉德</td>
                        </tr>
                        <tr><td>2011/9/1-2014/6/1</td>
                            <td>百色高中</td>
                            <td>赵玉星</td>
                        </tr>
                        <tr><td>2014/9/1-2018/7/1</td>
                            <td>南昌大学</td>
                            <td>刘辉良</td>
                        </tr>
                    </tbody>
                </table>
                <h2>职位信息：</h2>
                <span className="infoTag">所属部门：</span><div className="infoShow job">平台前端开发部</div><br />
                <span className="infoTag">职位：</span><div className="infoShow job">web前端开发工程师</div><br />
                <span className="infoTag">所获荣誉：</span>
                <Timeline className="reward">
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
            </div>
        )
    }
}