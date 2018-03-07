import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
import 'isomorphic-fetch';
import './css/loginForm.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('http://localhost:3012', {
          method: 'POST',
          body: 'shujian',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(function (response) {
          console.log(response);
        }, function (err) {
          console.log(err);
        });
      }
    });
  }
  onChange(e) {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
        <div>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);