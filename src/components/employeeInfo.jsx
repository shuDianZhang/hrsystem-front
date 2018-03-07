import React, { Component } from 'react';

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
                <span className="infoTag">家庭住址：</span><div className="infoShow long">广西省百色市田阳县高中路5号前途文具店</div>&nbsp;&nbsp;&nbsp;
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
                <span className="infoTag">职位：</span><div className="infoShow job">web前端开发工程师</div><br/>
                <span className="infoTag">所获荣誉：</span><div className="reward">dddd</div>
            </div>
        )
    }
}