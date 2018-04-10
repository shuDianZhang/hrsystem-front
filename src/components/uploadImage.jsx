import React, { Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';

export default class PicturesWall extends React.Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            token: '',
            fileList: [{
                uid: -1,
                name: 'default.png',
                status: 'done',
                url: 'http://p6g8b7pfx.bkt.clouddn.com/head$%23&%25%25%2319960906.jpg',
            }]
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
    }
    handleCancel() {
        this.setState({ previewVisible: false });
    }
    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl, previewVisible: true
        });
    }
    handleChange({ file, fileList }) {
        this.setState({ fileList });
        if (file.status === 'done' && this.props.headType === 'jobFinder') {
            sessionStorage.setItem('headImageUrl', `http://p6g8b7pfx.bkt.clouddn.com/${file.response.key}`);
        }
    }
    beforeUpload(file) {
        const isType = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isType) {
            message.error('只支持上传jpg/png格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传图片需要小于 2MB!');
        }
        return isType && isLt2M;
    }
    componentWillMount() {
        fetch(`http://localhost:3111/upload/gettoken?bucket=headimage&&keyToOverwrite=headIcon${this.props._id}.jpg`, { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ token: data.token });
                }
            }, (err) => { console.error(err) })
        if (this.props._id && this.props.hasHead && this.props.headType === "employee") {
            this.setState({
                fileList: [{
                    uid: -1,
                    name: 'user.png',
                    status: 'done',
                    url: `http://p6g8b7pfx.bkt.clouddn.com/headIcon${this.props._id}.jpg-jvzhong?v=${new Date().getTime()}`
                }]
            });
        }
        if (sessionStorage.getItem('headImageUrl') && this.props.headType === "jobFinder") {
            this.setState({
                fileList: [{
                    uid: -1,
                    name: 'user.png',
                    status: 'done',
                    url: `${sessionStorage.getItem('headImageUrl')}-jvzhong?v=${new Date().getTime()}`
                }]
            });
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
            <div className="clearfix">
                <Upload
                    action="https://upload-z2.qiniup.com"
                    data={{ token: this.state.token, key: `headIcon${this.props._id}.jpg` }}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={this.beforeUpload}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div >
        );
    }
}
