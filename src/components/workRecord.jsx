import React, { Component } from 'react';
import { Table, Button, Input, message, Modal, Form } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Search = Input.Search;

import './css/clockIn.css'

class workRecord extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            _id: null,
            dataContent: [],
            recordSource: [],
            showRecord: false,
            showAppendRecord: false
        };
        this.columnsContent = [
            { title: '账户', dataIndex: '_id' },
            { title: '姓名', dataIndex: 'name' },
            {
                title: '查看奖罚信息', key: 'getRecord',
                render: (text, record) => (
                    <Button type="primary" onClick={this.getRecord.bind(this, record)} size="small">管理奖罚信息</Button>
                )
            },
            {
                title: '添加奖罚信息', key: 'setRecord',
                render: (text, record) => (
                    <Button type="primary" onClick={this.setRecord.bind(this, record)} size="small">添加
                    奖罚信息</Button>
                )
            }
        ];
        this.recordHead = [
            { title: '时间', dataIndex: 'date' },
            { title: '奖励', dataIndex: 'good' },
            { title: '惩罚', dataIndex: 'bad' },
            { title: '金额', dataIndex: 'money' }
        ]
        this.searchAccount = this.searchAccount.bind(this);
        this.handleOkShowRecord = this.handleOkShowRecord.bind(this);
        this.handleCancelShowRecord = this.handleCancelShowRecord.bind(this);
        this.handleCancelshowAppendRecord = this.handleCancelshowAppendRecord.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCancelshowAppendRecord() {
        this.setState({showAppendRecord: false});
    }
    handleOkShowRecord() {
        this.setState({showRecord: true});
    }
    handleCancelShowRecord() {
        this.setState({showRecord: false});
    }
    searchAccount(name) {
        fetch(`http://localhost:3111/search/name?name=${name}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let dataContent = [];
                    data.content.map(function(item) {
                        let dataObject = {};
                        dataObject['_id'] = item['_id'];
                        dataObject['name'] = item['name'];
                        dataContent.push(dataObject);
                    });
                    this.setState({ dataContent: dataContent });
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    getRecord(record) {
        let id = record._id;
        fetch(`http://localhost:3111/search/getWorkRecord?id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({showRecord: true});
                if (data.status === 0) {
                    this.setState({recordSource: data.content});
                } else {
                    message.warn(data.msg);
                }
            }, (err) => { })
    }
    setRecord(record) {
        this.setState({name: record.name, _id: record._id, showAppendRecord: true});
    } 
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            values['name'] = this.state.name;
            values['_id'] = this.state._id;
            if (!err) {
                fetch(`http://localhost:3111/upload/wordRecord`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(values)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === 0) {
                            this.setState({showAppendRecord: false});
                            message.success("成功添加奖惩记录!");
                        } else {

                        }
                    }, (err) => { })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
        <div>
            <h2>搜索姓名：</h2>
            <Search
                style={{ width: 200 }}
                placeholder="搜索姓名"
                onSearch={this.searchAccount}
                enterButton
            />
            <br /><br />
            <h2>账户列表：</h2>
            <div className="tableContain">
                <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
            </div>
            <Modal
                title="查看奖罚信息"
                visible={this.state.showRecord}
                onOk={this.handleOkShowRecord}
                onCancel={this.handleCancelShowRecord}
            >
              <Table columns={this.recordHead} dataSource={this.state.recordSource} size="small" pagination={{ pageSize: 5 }} />
            </Modal>
            <Modal
                title="添加奖罚信息"
                visible={this.state.showAppendRecord}
                onCancel={this.handleCancelshowAppendRecord}
                footer={null}
            >
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="奖励事件"
                >
                    {getFieldDecorator('good', {
                    })(
                        <Input autosize={{ minRows: 6 }} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="惩罚事件"
                >
                    {getFieldDecorator('bad', {
                    })(
                        <Input autosize={{ minRows: 6 }} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="金额"
                >
                    {getFieldDecorator('money', {
                    })(
                        <Input autosize={{ minRows: 6 }} />
                        )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                <Button type="primary" htmlType="submit">确认添加</Button>
                </FormItem>
                </Form>
            </Modal>
        </div>
        );
    }
}

export default workRecord = Form.create()(workRecord);
