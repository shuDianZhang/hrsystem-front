import React, { Component } from 'react';
import { Form, Select, DatePicker, Input, Avatar, Button, Upload, Modal, Icon, Radio, InputNumber, message } from 'antd';
import { hashHistory } from 'react-router';
import moment from 'moment';

import './css/holiday.css'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const holidayType = ['事假', '病假', '丧假', '产假', '婚假', '外出', '工伤假'];

class Holiday extends Component {
    constructor() {
        super();
        this.state = {
            leaderInfo: {},
            previewImage: '',
            fileList: [],
            radioValue: 1,
            token: ''
        };
        this.radioOnChange = this.radioOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        let that = this;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let holidayInfo = values;
            let imgUrlArr = [];
            let imgList = values['uploadImg']['fileList'];
            for (let item of imgList) {
                imgUrlArr.push(`http://p6nnw8359.bkt.clouddn.com/${item.response.key}`);
            }
            delete holidayInfo['uploadImg'];
            holidayInfo['approvePeople'] = that.state.leaderInfo._id;
            holidayInfo['imageUrl'] = imgUrlArr;
            holidayInfo['ifApprove'] = false;
            console.log(holidayInfo);
            if (!err) {
                fetch('http://localhost:3111/upload/holiady', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(holidayInfo)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status === 0) {
                            message.success(data.msg);
                            hashHistory.push('/manage/holidaylist');
                        } else {
                            message.error(data.msg);
                        }
                    }, (err) => { message.error(err) })
            }
        });
    }
    radioOnChange(e) {
        this.setState({
            radioValue: e.target.value,
        });
    }
    selectTime(date, dateString) {
        if (moment(dateString).isBefore(moment().format('YYYY-MM-D'))) {
            message.error('请假开始时间小于当前时间!');
        }
    }
    componentDidMount() {
        fetch("http://localhost:3111/upload/gettoken?bucket=holiday", { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ token: data.token });
                }
            }, (err) => { console.error(err) })
        fetch("http://localhost:3111/search/leader", { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ leaderInfo: data.content });
                } else {
                    hashHistory.push('/');
                    message.error(data.msg);
                }
            }, (err) => { console.error(err) })
    }
    render() {
        const _this = this;
        const { previewVisible, previewImage, fileList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 4 },
            },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const props = {
            action: "https://upload-z2.qiniup.com",
            listType: "picture-card",
            fileList: this.state.fileList,
            data: { token: this.state.token, key: new Date().getTime() },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                    message.error('只支持上传jpg格式的图片!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    message.error('上传图片需要小于 2MB!');
                }
                return isJPG && isLt2M;
            },
            onPreview(file) {
                _this.setState({
                    previewImage: file.url || file.thumbUrl,
                    previewVisible: true,
                });
            },
            onChange({ file, fileList }) {
                _this.setState({ fileList });
            }
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="请假类型："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 3 }}>
                        {getFieldDecorator('holidayType', {
                            rules: [{ required: true, message: '请选择请假类型!' }],
                        })(
                            <Select placeholder="请选择">
                                {holidayType.map(function (item, index) {
                                    return <Option value={item} key={index}>{item}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="开始时间："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 3 }}>
                        {getFieldDecorator('holidayStartTime', {
                            rules: [{ required: true, message: '请选择假期开始时间!' }],
                        })(
                            <DatePicker onChange={this.selectTime} allowClear={true} placeholder="请选择" />
                        )}
                        <RadioGroup className="radioGroup" onChange={this.radioOnChange} defaultValue={1}>
                            <Radio value={1}>上午</Radio>
                            <Radio value={2}>下午</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem
                        label="请假时长："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 3 }}>
                        {getFieldDecorator('holidayLong', {
                            initialValue: 0.5,
                            rules: [
                                { required: true, message: '请输入假期时长!' },
                                { pattern: /^\d+(\.5)?$/, message: '请假时长，必须0.5为单位！' }
                            ],
                        })(
                            <InputNumber className="holidayLong" min={0.5} step={0.5} />
                        )}
                        &nbsp;&nbsp;&nbsp;<span>天</span>
                    </FormItem>
                    <FormItem
                        label="请假事由："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 6 }}>
                        {getFieldDecorator('holidayReason', {
                            rules: [{ required: true, message: '请输入请假原因!' }],
                        })(
                            <TextArea style={{ marginTop: 10 }} placeholder="描述一下请假事由" autosize={{ minRows: 6, maxRows: 10 }} />
                        )}
                    </FormItem>
                    <FormItem
                        label="上传图片："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('uploadImg')(
                            <Upload {...props}>
                                {fileList.length >= 3 ? null : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        label="审批人："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 4 }}>
                        <div className="leaderInfo">
                            <Avatar size="large" icon="user" src={this.state.leaderInfo.hasHeadImg ? `http://p6g8b7pfx.bkt.clouddn.com/headIcon${this.state.leaderInfo._id}.jpg-jvzhong?v=${new Date().getTime()}` : 'http://p6g8b7pfx.bkt.clouddn.com/head$%23&%25%25%2319960906.jpg'} /><span className="leaderName">{this.state.leaderInfo.name}</span>
                        </div>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 8, offset: 2 }}>
                        <Button type="primary" htmlType="submit">提&nbsp;&nbsp;交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Holiday = Form.create()(Holiday);