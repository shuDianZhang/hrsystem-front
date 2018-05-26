import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar, message, Modal, Badge, notification } from 'antd';
import { Link, hashHistory } from 'react-router'

import Upload from '../components/uploadImage'

import '../assets/css/manage.css'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const openNotification = () => {
    notification.open({
        message: 'Notification Title',
        description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};

export default class Manage extends Component {
    constructor() {
        super();
        this.state = {
            selectItem: 1,
            accountType: 1,
            isLogin: false,
            collapsed: false,
            visible: false,
            topMenuInfo: {},
            message: 0
        };
        this.onCollapse = this.onCollapse.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    // 根据URL初始化menu选中的Item
    selectItemMethod() {
        let hashTag = {
            '#/manage': 1, '#/manage/employeeinfo': 2, '#/manage/employeeInfoList': 3, '#/manage/changepassword': 4,
            '#/manage/aducation': 5, '#/manage/record': 6, '#/manage/payment': 7,
            '#/manage/attendance': 8, '#/manage/holiday': 9, "#/manage/paymentManage": 10, "#/manage/accountManage": 11,
            "#/manage/interview": 12, "#/manage/payment": 13, '#/manage/workRecord': 14, '/manage/record': 15,
            '#/manage/holidaylist': 16
        };
        let getHash = window.location.hash;
        for (var item in hashTag) {
            if (getHash === item) {
                this.setState({ selectItem: hashTag[item] });
            }
        }
    }
    componentWillMount() {
        // 判断用户是否登陆
        fetch('http://localhost:3111/user/checklogin', { method: 'POST', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error('请先登录!');
                    hashHistory.push('/');
                    return;
                }
                this.setState({ accountType: data.type });
            }, (err) => {
                message.error(err);
            })
        // 获取管理页面顶部信息
        fetch('http://localhost:3111/search/getTopMenuInfo', { method: 'GET', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error('请先登录!');
                    hashHistory.push('/');
                } else {
                    this.setState({ topMenuInfo: data.content, message: data.content.message });
                }
            }, (err) => {
                message.error(err);
            })
        this.selectItemMethod();
    }
    logout() {
        fetch('http://localhost:3111/user/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error(data.msg);
                } else {
                    message.success(data.msg);
                    hashHistory.push('/');
                }
            }, (err) => {
                message.error(err);
            })
    }
    // 控制上传头像的模态框
    showModal() {
        this.setState({ visible: true });
    }
    handleOk(e) {
        let topMenuInfo = this.state.topMenuInfo;
        fetch(`http://localhost:3111/upload/headimage`, { method: 'POST', credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    message.success('头像上传成功!');
                    topMenuInfo.hasHeadImg = true;
                    this.setState({ topMenuInfo: topMenuInfo });
                }
            }, (err) => { console.error(err) })
        this.setState({ visible: false });
    }
    handleCancel(e) {
        this.setState({ visible: false });
    }
    showMessage() {
        hashHistory.push('/message');
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={[`${this.state.selectItem}`]} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/manage">
                                <Icon type="like-o" />
                                <span>打卡</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="solution" /><span>{
                                this.state.accountType === 1 ? '个人信息' : '职员信息管理'
                            }</span></span>}
                        >
                            <Menu.Item key="2"><Link to="/manage/employeeinfo">查询个人信息</Link></Menu.Item>
                            {
                                this.state.accountType === 1 ?
                                    null : <Menu.Item key="3"><Link to="/manage/employeeInfoList">查看职员信息</Link></Menu.Item>
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="user" /><span>管理账户</span></span>}
                        >
                            <Menu.Item key="4"><Link to="/manage/changepassword">修改密码</Link></Menu.Item>
                            {
                                this.state.accountType === 1 ?
                                    null : (<Menu.Item key="11"><Link to="/manage/accountManage">职员账户管理</Link></Menu.Item>)
                            }
                        </SubMenu>
                        {
                            this.state.accountType === 2 ?
                                <SubMenu
                                    key="sub3"
                                    title={<span><Icon type="usergroup-add" /><span>招聘面试</span></span>}
                                >
                                    <Menu.Item key="12"><Link to="/manage/interview">邀请面试</Link></Menu.Item>
                                </SubMenu> : null
                        }
                        <SubMenu
                            key="sub4"
                            title={<span><Icon type="usergroup-add" /><span>奖惩信息</span></span>}
                        >
                            {
                                this.state.accountType === 2 ?
                                    (<Menu.Item key="14"><Link to="/manage/workRecord">管理奖罚信息</Link></Menu.Item>) : null
                            }
                            <Menu.Item key="15"><Link to="/manage/record">个人奖惩信息</Link></Menu.Item>
                        </SubMenu>
                        {
                            this.state.accountType === 1 ?
                                <Menu.Item key="7">
                                    <Link to="/manage/payment">
                                        <Icon type="pay-circle-o" />
                                        <span>薪酬结算</span>
                                    </Link>
                                </Menu.Item> :
                                <SubMenu
                                    key="sub5"
                                    title={<span><Icon type="pay-circle-o" /><span>薪酬管理</span></span>}
                                >
                                    <Menu.Item key="10"><Link to="/manage/paymentManage">员工薪酬管理</Link></Menu.Item>
                                    <Menu.Item key="13"><Link to="/manage/payment">个人薪酬结算</Link></Menu.Item>
                                </SubMenu>
                        }
                        <Menu.Item key="8">
                            <Link to="/manage/attendance">
                                <Icon type="flag" />
                                <span>职工出勤</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub6"
                            title={<span><Icon type="coffee" /><span>请假管理</span></span>}
                        >
                            <Menu.Item key="9"><Link to="/manage/holiday">请假</Link></Menu.Item>
                            <Menu.Item key="16"><Link to="/manage/holidaylist">请假列表</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 50 }}>
                        <div className="sectionRight">
                            <Badge className="message" onClick={this.showMessage} count={this.state.message}>
                                <Icon type="message" style={{ fontSize: 22 }} />
                            </Badge>
                            <Avatar className="userIcon" onClick={this.showModal} size="large" icon="user" src={this.state.topMenuInfo.hasHeadImg ? `http://p6g8b7pfx.bkt.clouddn.com/headIcon${this.state.topMenuInfo._id}.jpg-jvzhong?v=${new Date().getTime()}` : "http://p6g8b7pfx.bkt.clouddn.com/head$%23&%25%25%2319960906.jpg"} />
                            <span className="user">{this.state.topMenuInfo.name}</span><span className="separat">|</span><span onClick={this.logout} className="logout">退出</span>
                        </div>
                    </Header>
                    <Content style={{ margin: 16 }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        人力资源管理系统 ©2018 Created by shuDianZhang
              </Footer>
                </Layout>
                <Modal title="修改头像"
                    okText="上传"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="uploadImage">
                        <Upload _id={this.state.topMenuInfo._id} hasHead={this.state.topMenuInfo.hasHeadImg} headType="employee" />
                    </div>
                </Modal>
            </Layout>
        );
    }
}