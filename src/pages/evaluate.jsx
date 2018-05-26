import React, { Component } from 'react';
import { Rate, Input, Radio, Button, message } from 'antd';
import { hashHistory } from 'react-router';
import LoginForm from '../components/loginForm'
import '../assets/css/evaluate.css';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

export default class Evaluate extends Component {
    constructor() {
        super();
        this.state = {
            pass: null,
            reinterview: 2,
            email: 2
        }
        this.onChangeF = this.onChangeF.bind(this);
        this.onChangeT = this.onChangeT.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeF(e) {
        this.setState({ pass: e.target.value });
    }
    onChangeT(e) {
        this.setState({ reinterview: e.target.value });
    }
    handleSubmit() {
        let values = {};
        values['pass'] = this.state.pass;
        values['reinterview'] = this.state.reinterview;
        values['email'] = this.state.email;

        fetch('http://localhost:3111/upload/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error(data.msg);
                } else {
                    message.success(data.msg);
                    hashHistory.push('/manage');
                }
            }, (err) => {
                message.error(err);
            })
    }
    componentDidMount() {
        let hash = window.location.hash;
        let arr = hash.split('?');
        let id = (arr[1].split('='))[1];
        this.setState({ email: id });
    }
    render() {
        return (
            <div className="rate-bg">
                <div className="evaluate-container">
                    <h1 className="evaluate-title">面试评分表</h1>
                    <span className="start-title">举止谈吐：</span><Rate style={{ fontSize: 40 }} count={6} allowHalf defaultValue={0.5} /><br />
                    <span className="start-title">职业技能：</span><Rate style={{ fontSize: 40 }} count={6} allowHalf defaultValue={0.5} /><br />
                    <span className="start-title">思维创新：</span><Rate style={{ fontSize: 40 }} count={6} allowHalf defaultValue={0.5} /><br />
                    <div style={{ marginTop: 30 }}>
                        <span className="start-title all-rate" >综合评价：</span><TextArea style={{ width: 400 }} autosize={{ minRows: 6 }} />
                    </div>
                    <br />
                    <span className="start-title">是否通过面试：</span>
                    <RadioGroup onChange={this.onChangeF} defaultValue={2}>
                        <Radio value={1}>通过</Radio>
                        <Radio value={2}>不通过</Radio>
                    </RadioGroup>
                    <br />
                    <span className="start-title">是否进入复试：</span>
                    <RadioGroup onChange={this.onChangeT} defaultValue={2}>
                        <Radio value={1}>进入</Radio>
                        <Radio value={2}>不进入</Radio>
                    </RadioGroup>
                    <br />
                    <Button style={{ marginTop: 30, marginLeft: 40, marginBottom: 60 }} size="large" type="primary" onClick={this.handleSubmit}>提交</Button>
                </div>
            </div>
        );
    }
}