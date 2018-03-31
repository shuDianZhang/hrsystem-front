import React, { Component } from 'react';
import { DatePicker, Button, List, Avatar, Icon } from 'antd';
import './css/payment.css';

export default class Payment extends Component {
    constructor() {
        super();
    }
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    render() {
        const listData = [];
        for (let i = 0; i < 3; i++) {
            listData.push({
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
        const pagination = {
            pageSize: 10,
            current: 1,
            total: listData.length,
            onChange: (() => { }),
        };
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div>
                <div className="dataPick">
                    <h2>选择查询区间：</h2>
                    <span>开始时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="Start time" onChange={this.onChange} /><span>结束时间：</span><DatePicker className="timeSelect" allowClear={true} placeholder="End time" onChange={this.onChange} />
                    <Button type="primary" icon="search">查 询</Button>
                </div>
                <h2>培训记录：</h2>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={pagination}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}