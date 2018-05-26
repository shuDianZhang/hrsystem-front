import React, { Component } from 'react';
import { DatePicker, Table, Button, Modal, Input, Form, message } from 'antd';
import './css/payment.css';

const FormItem = Form.Item;
const Search = Input.Search;

class PaymentManage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            _id: null,
            dataContent: [],
            uploadContent: {}
        }
        this.columnsContent = [
            { title: '姓名', dataIndex: 'name', align: 'center' },
            { title: '用户名', dataIndex: '_id', align: 'center' },
            { title: '基本工资（元）', dataIndex: 'baseSalary', align: 'center' },
            {
                title: '服务津贴（元）', dataIndex: 'serviceSalary', align: 'center', children: [
                    { title: '寒暑补贴（元）', dataIndex: 'hot', align: 'center' },
                    { title: '交通补贴（元）', dataIndex: 'bus', align: 'center' },
                    { title: '通讯补贴（元）', dataIndex: 'telecom', align: 'center' },
                    { title: '餐补（元）', dataIndex: 'dinner', align: 'center' },
                ]
            },
            {
                title: '设置', key: 'setSalary', align: 'center',
                render: (text, record, index) => (
                    <Button onClick={this.setSalary.bind(this, record)} type="primary">设置</Button>
                )
            }
        ];
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchAccount = this.searchAccount.bind(this);
    }
    setSalary(value) {
        this.setState({ visible: true, _id: value._id });
    }
    searchAccount(name) {
        fetch(`http://localhost:3111/search/getEmployeePayment?name=${name}`, { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    let salary = {};
                    let dataContent = [];
                    for (let item of data.employeePaymentList) {
                        salary['_id'] = item._id;
                        salary['name'] = item.name;
                        salary['baseSalary'] = item.baseSalary;
                        salary['hot'] = item.serviceSalary.hot;
                        salary['bus'] = item.serviceSalary.bus;
                        salary['telecom'] = item.serviceSalary.telecom;
                        salary['dinner'] = item.serviceSalary.dinner;
                        dataContent.push(salary);
                    }
                    this.setState({ dataContent });
                } else {
                    message.error(data.msg);
                }
            }, (err) => { console.error(err) })
    }
    handleSubmit(e) {
        let that = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let changeSalary = values;
            changeSalary['_id'] = that.state._id;
            fetch('http://localhost:3111/update/employeePayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(changeSalary)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === 0) {
                        message.success('薪资更新成功!');
                        that.setState({ visible: false });
                    } else {
                        message.error(data.msg);
                    }
                }, (err) => { console.error(err) })
        });
    }
    handleCancel() {
        this.setState({ visible: false });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
                <h2>员工薪酬管理：</h2>
                <div style={{ height: 250 }}>
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
                <Modal
                    width={800}
                    title="调整薪资"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 6 }}
                            label="基本工资（元）"
                        >
                            {getFieldDecorator('baseSalary'
                            )(<Input />)}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 6 }}
                            label="交通补贴（元）"
                        >
                            {getFieldDecorator('bus'
                            )(<Input />)}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 6 }}
                            label="寒暑补贴（元）"
                        >
                            {getFieldDecorator('hot'
                            )(<Input />)}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 6 }}
                            label="通讯补贴（元）"
                        >
                            {getFieldDecorator('telecom'
                            )(<Input />)}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 6 }}
                            label="餐补（元）"
                        >
                            {getFieldDecorator('dinner'
                            )(<Input />)}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 6 }}
                            label="提交修改">
                            <Button type="primary" htmlType="submit">提 交</Button>
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(PaymentManage);