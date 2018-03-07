import React, { Component } from 'react';
import { Input, Icon } from 'antd';

import './css/changePassword.css'

export default class changePassword extends Component {
    constructor() {
        super();
        this.state = {
            seePassWorld: true
        }
    }
    ifSeePassword(e) {
        e.preventDefault();
        console.log(e.target.getAttribute('item'));
    }
    render() {
        return (
            <div>
                <span>初始密码:</span>
                <Input className="inputArea" suffix={
                    <Icon item="1" type={this.state.seePassWorld_1 ? 'eye-o' : 'eye'} onClick={this.ifSeePassword} />
                } />
                <span>修改密码:</span>
                <Input className="inputArea" suffix={
                    <Icon item="2" type={this.state.seePassWorld_2 ? 'eye-o' : 'eye'} onClick={this.ifSeePassword} />
                } />
                <span>确认密码：</span>
                <Input className="inputArea" suffix={
                    <Icon item="3" type={this.state.seePassWorld_3 ? 'eye-o' : 'eye'} onClick={this.ifSeePassword} />
                } />
            </div>
        )
    }
}