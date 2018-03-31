import React, { Component } from 'react';
import { Button, message } from 'antd';

import './css/clockIn.css'

export default class ClockIn extends Component {
    constructor() {
        super();
        this.state = {
            date: '****-**-**',
            clock: '**:**:**',
            loading_1: false,
            loading_2: false,
            disabled_1: false,
            disabled_2: false
        };
        this.startWork = this.startWork.bind(this);
        this.afterWork = this.afterWork.bind(this);
        this.timer = null;
    }
    // 小于10的整数，自动添0
    clockFormat(x) {
        return x < 10 ? '0' + x : x;
    }
    getClock() {
        let date = new Date();
        let hour = date.getHours(),
            minute = this.clockFormat(date.getMinutes()),
            second = this.clockFormat(date.getSeconds());
        date = null;
        return hour + ':' + minute + ':' + second;
    }
    componentWillMount() {
        let _this = this;
        let date = new Date();
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        _this.setState({ date: year + '-' + month + '-' + day, clock: this.getClock() });
        this.timer = setInterval(function () {
            _this.setState({ clock: _this.getClock() });
        }, 1000);
        fetch('http://localhost:3111/search/ifclockin', { method: 'POST', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ disabled_1: data.input_1, disabled_2: data.input_2 });
            }, (err) => {
                message.error(err);
            });
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    startWork() {
        this.setState({ loading_1: true });
        fetch('http://localhost:3111/work/startwork', { method: 'POST', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error(data.msg);
                    this.setState({ loading_1: false });
                } else {
                    message.success(data.msg);
                    this.setState({ loading_1: false, disabled_1: true });
                }
            }, (err) => {
                message.error(err);
                this.setState({ loading_1: false });
            })
    }
    afterWork() {
        if (!this.state.disabled_1) {
            message.error('未进行上班打卡!');
            return;
        }
        this.setState({ loading_2: true });
        fetch('http://localhost:3111/work/afterwork', {
            method: 'POST',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error(data.msg);
                    this.setState({ loading_2: false });
                } else {
                    message.success(data.msg);
                    this.setState({ loading_2: false, disabled_2: true });
                }
            }, (err) => {
                message.error(err);
                this.setState({ loading_2: false });
            })
    }
    render() {
        return (
            <div>
                <div className="timeArea">
                    <p className="wish">祝您工作愉快！</p>
                    <div className="data">北京时间：{this.state.date}</div>
                    <div className="showTime">{this.state.clock}</div>
                </div>
                <div className="buttonArea">
                    <Button className="clockIn" onClick={this.startWork} loading={this.state.loading_1} disabled={this.state.disabled_1} type="primary">上班打卡</Button>
                    <Button className="clockIn" onClick={this.afterWork} loading={this.state.loading_2} disabled={this.state.disabled_2} type="primary">下班打卡</Button>
                </div>
            </div>
        );
    }
}