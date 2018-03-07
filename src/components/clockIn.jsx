import React from 'react';
import { Button } from 'antd';

import './css/clockIn.css'

export default class ClockIn extends React.Component {
    render() {
        return (
            <div>
                <div className="timeArea">
                    <p className="wish">祝您工作愉快！</p>
                    <div className="data">北京时间：2018-3-7</div>
                    <div className="showTime">9:51:21</div>
                </div>
                <div className="buttonArea">
                <Button className="clockIn" type="primary">上班打卡</Button>
                <Button className="clockIn" type="primary">下班打卡</Button>
                </div>
            </div>
        );
    }
}