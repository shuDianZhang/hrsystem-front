import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio, message } from 'antd';
import { hashHistory } from 'react-router';

import './css/loginForm.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NormalLoginForm extends Component {
  constructor(props, sendServerMes) {
    super(props);
    this.state = {
      type: 1,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        values.type = this.state.type;
        fetch('http://localhost:3111/user/login', {
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
        this.setState({ loading: false });
      }
    });
  }
  onChangeRadio(e) {
    this.setState({ type: e.target.value, });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            validateTrigger: 'onBlur',
            validateFirst: 'true',
            rules: [
              { required: true, message: '请输入用户名！' },
              { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '格式有误！输入格式为手机号！' }
            ],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码！' }
            ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
        <div>
          <RadioGroup onChange={this.onChangeRadio} value={this.state.type}>
            <Radio value={1}>职工</Radio>
            <Radio value={2}>管理员</Radio>
            <Radio value={3}>超级管理员</Radio>
          </RadioGroup>
        </div>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
            )}
          <a className="login-form-forgot" href="">忘记密码?</a>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
            登 录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);