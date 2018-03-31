import React, { Component } from 'react';
import { Input, Icon, Button, message } from 'antd';

import './css/changePassword.css'

export default class changePassword extends Component {
    constructor() {
        super();
        this.state = {
            seePassWorld_1: false,
            seePassWorld_2: false,
            seePassWorld_3: false,
            input_1: '',
            input_2: '',
            input_3: '',
            loading: false
        };
        this.ifSeePassword = this.ifSeePassword.bind(this);
        this.postValue = this.postValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    ifSeePassword(e) {
        e.preventDefault();
        let item = e.target.getAttribute('item');
        if (item == 1) {
            this.setState({
                seePassWorld_1: !this.state.seePassWorld_1
            });
        }
        if (item == 2) {
            this.setState({
                seePassWorld_2: !this.state.seePassWorld_2
            });
        }
        if (item == 3) {
            this.setState({
                seePassWorld_3: !this.state.seePassWorld_3
            });
        }
    }
    postValue(e) {
        e.preventDefault();
        let item = e.target.getAttribute('item');
        if (item == 1) {
            this.setState({
                input_1: e.target.value
            });
        }
        if (item == 2) {
            this.setState({
                input_2: e.target.value
            });
        }
        if (item == 3) {
            this.setState({
                input_3: e.target.value
            });
        }
    }
    handleSubmit(e) {
        this.setState({ loading: true });
        if (this.state.input_1 && this.state.input_2 && this.state.input_3) {
            if (this.state.input_1 === this.state.input_2) {
                message.warn('修改的密码不能与初始密码重复!');
                this.setState({ loading: false });
                return;
            }
            if (this.state.input_2 != this.state.input_3) {
                message.warn('两次密码不一致!');
                this.setState({ loading: false });
                return;
            }
            fetch('http://localhost:3111/user/changepassword', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: this.state.input_1,
                    password_c: this.state.input_3
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.status != 0) {
                        message.error(data.msg);
                        this.setState({ loading: false });
                    } else {
                        message.success(data.msg);
                        this.setState({ loading: false });
                    }
                }, (err) => {
                    message.error(err);
                    this.setState({ loading: false });
                })
        }
    }
    render() {
        return (
            <div>
                <span>初始密码:</span>
                <Input item="1" className="inputArea" type={this.state.seePassWorld_1 ? 'text' : 'password'} onChange={this.postValue} suffix={
                    <Icon item="1" type={this.state.seePassWorld_1 ? 'eye-o' : 'eye'} onClick={this.ifSeePassword} />
                } />
                <span>修改密码:</span>
                <Input item="2" className="inputArea" type={this.state.seePassWorld_2 ? 'text' : 'password'} onChange={this.postValue} suffix={
                    <Icon item="2" type={this.state.seePassWorld_2 ? 'eye-o' : 'eye'} onClick={this.ifSeePassword} />
                } />
                <span>确认密码：</span>
                <Input item="3" className="inputArea" type={this.state.seePassWorld_3 ? 'text' : 'password'} onChange={this.postValue} suffix={
                    <Icon item="3" type={this.state.seePassWorld_3 ? 'eye-o' : 'eye'} onClick={this.ifSeePassword} />
                } />
                <Button className="submitChange" type="primary" onClick={this.handleSubmit} loading={this.state.loading}>
                    提 交
                </Button>
            </div>
        )
    }
}