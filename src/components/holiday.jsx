import React, { Component } from 'react';
import { Cascader, DatePicker, Input, Avatar, Button, Upload, Modal, Icon, Radio, InputNumber, message } from 'antd';
import moment from 'moment';

import './css/holiday.css'

const { TextArea } = Input;
const RadioGroup = Radio.Group;

const options = [
    {
        value: 'shijia',
        label: '事假'
    }, {
        value: 'bingjia',
        label: '病假'
    },
    {
        value: 'sangjia',
        label: '丧假'
    },
    {
        value: 'chanjia',
        label: '产假'
    },
    {
        value: 'hunjia',
        label: '婚假'
    },
    {
        value: 'waichu',
        label: '外出'
    },
    {
        value: 'gongshangjia',
        label: '工伤假'
    }
];

export default class Holiday extends Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            radioValue: 1
        },
            this.radioOnChange = this.radioOnChange.bind(this);
    }
    radioOnChange(e) {
        this.setState({
            radioValue: e.target.value,
        });
    }


    // 上传图片部分////////////////
    handleCancel() {
        this.setState({ previewVisible: false });
    }
    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange({ fileList }) {
        this.setState({ fileList });
    }
    ///////////////////////////////

    onChange(value) {
        console.log(value);
    }
    selectTime(date, dateString) {
        if (moment(dateString).isBefore(moment().format('YYYY-MM-D'))) {
            message.error('请假开始时间小于当前时间!');
        }
    }
    checkNumber(e) {
        if (e.target.value % 0.5 != 0) {
            message.error('请假时长必须以0.5为单位!');
            e.target.value = 0.5;
        }
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                请假类型：&nbsp;<Cascader className="selectHoliday" options={options} onChange={this.onChange} placeholder="请选择" /><br />
                开始时间：&nbsp;<DatePicker className="selectArea" onChange={this.selectTime} allowClear={true} placeholder="请选择" />
                <RadioGroup className="radioGroup" onChange={this.radioOnChange} value={this.state.radioValue}>
                    <Radio value={1}>上午</Radio>
                    <Radio value={2}>下午</Radio>
                </RadioGroup>
                <br />
                请假时长： <InputNumber className="holidayLong" onBlur={this.checkNumber} min={0.5} defaultValue={0.5} step={0.5} /><span className="day">天</span>
                <div className="reason">
                    请假事由：&nbsp;<TextArea style={{ marginTop: 10 }} placeholder="描述一下请假事由" autosize={{ minRows: 6, maxRows: 10 }} />
                </div>
                <div className="upload">
                    上传图片：
                </div>
                <div className="clearfix">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
                <div className="examination">
                    审批人：&nbsp;<Avatar size="large" icon="user" />
                </div>
                <Button className="handUp" type="primary">提 交</Button>
            </div>
        )
    }
}