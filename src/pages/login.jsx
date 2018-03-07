import React, { Component } from 'react';
import LoginForm from '../components/loginForm'
import '../assets/css/login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="bghr"></div>
                <div className="loginArea">
                    <h1 className="sysName">人力资源管理系统</h1>
                    <LoginForm />
                </div>
                <footer className="footBar">
                    <p className="webInfo">designBy&nbsp;shuDianZhang</p>
                    <p className="webInfo">地址：南昌市南京东路235号南昌大学软件学院&nbsp;&nbsp;&nbsp;联系方式：506975676@qq.com</p>
                    <p className="webInfo">版权所有&nbsp;违者必究</p>
                </footer>
            </div>
        );
    }
}

