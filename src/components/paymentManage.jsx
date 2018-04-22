import React, { Component } from 'react';
import { DatePicker, Table, Button, Modal, Input, Form } from 'antd';
import './css/payment.css';

const FormItem = Form.Item;

class PaymentManage extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            dataContent: [],
            uploadContent: {}
        }
        this.columnsContent = [
            { title: '姓名', dataIndex: 'name' },
            { title: '基本工资（元）', dataIndex: 'baseSalary' },
            { title: '服务津贴（元）', dataIndex: 'serviceSalary' },
            { title: '加班工资（元）', dataIndex: 'overtimeSalary' },
            { title: '奖励金额（元）', dataIndex: 'rewardSalary' },
            { title: '扣款金额（元）', dataIndex: 'punishMoney' },
            {
                title: '设置', key: 'setSalary',
                render: (text, record, index) => (
                    <Button onClick={this.setSalary.bind(this, record)} type="primary">设置</Button>
                )
            }
        ];
        this.handleCancel = this.handleCancel.bind(this);
        this.uploadSalary = this.uploadSalary.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    setSalary() {
        this.setState({visible: true});
    }
    uploadSalary() {
         // fetch('http://localhost:3111/upload/setSalary', 
        // { 
        //     method: 'POST', 
        //     credentials: 'include' ,
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     if (data.status === 0) {
        //         this.setState({ dataContent: data.employeePaymentList });
        //     } else {
        //         message.error(data.msg);
        //     }
        // }, (err) => { console.error(err) })
    }
    handleSubmit() {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        });
    }
    handleCancel() {
        this.setState({visible: false});
    }
    componentWillMount() {
        fetch('http://localhost:3111/search/getEmployeePayment', { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ dataContent: data.employeePaymentList });
                } else {
                    message.error(data.msg);
                }
            }, (err) => { console.error(err) })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h2>员工薪酬管理：</h2>
                <div style={{ height: 250 }}>
                    <Table columns={this.columnsContent} dataSource={this.state.dataContent} size="small" pagination={{ pageSize: 5 }} />
                </div>
                <Modal
                    width={800}
                    title="调整薪资"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                        <Button key="submit" type="primary" onClick={this.uploadSalary}>提交</Button>
                    ]}
                >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 6 }}
                        label="基本工资（元）"
                    >
                        {getFieldDecorator('baseSalary'
                        )(<Input /> )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 6 }}
                        label="服务津贴（元）"
                    >
                        {getFieldDecorator('serviceSalary'
                        )(<Input /> )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 6 }}
                        label="奖励金额（元）"
                    >
                        {getFieldDecorator('rewardSalary'
                        )(<Input /> )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 6 }}
                        label="加班工资（元）"
                    >
                        {getFieldDecorator('overtimeSalary'
                        )(<Input /> )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 6 }}
                        label="惩罚扣款金额（元）"
                    >
                        {getFieldDecorator('punishMoney'
                        )(<Input /> )}
                    </FormItem>
                </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(PaymentManage);