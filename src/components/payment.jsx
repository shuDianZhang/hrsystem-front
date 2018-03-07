import React from 'react';
import { DatePicker, Button } from 'antd';
import './css/payment.css';

export default class Payment extends React.Component {
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    render() {
        return (
            <div>
                <div className="dataPick">
                    <h2>选择查询区间：</h2>
                    <span>开始时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="Start time" onChange={this.onChange} /><span>结束时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="End time" onChange={this.onChange} />
                    <Button type="primary" icon="search">查 询</Button>
                </div>
                <h2>工资清单：</h2>
                <span>姓名：</span><div className="moneyShow">舒健</div><br />
                <span>员工基本工资：</span><div className="moneyShow">5600</div><br />
                <span>职务津贴：</span><div className="moneyShow">400</div><br />
                <span>奖励金额：</span><div className="moneyShow">1200</div><br />
                <span>员工加班工资：</span><div className="moneyShow">470</div><br />
                <span>奖罚扣款金额：</span><div className="moneyShow">300</div><br />
                <span>其他奖励金额：</span><div className="moneyShow">300</div><br />
                <span>应发工资：</span><div className="moneyShow">7200</div><br />
                <span>实发工资：</span><div className="moneyShow">7000</div><br />
            </div>
        )
    }
}