import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar, message, Modal } from 'antd';
import { Link, hashHistory } from 'react-router'

import Upload from '../components/uploadImage'

import '../assets/css/manage.css'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class Manage extends Component {
    constructor() {
        super();
        this.state = {
            accountType: 1,
            isLogin: false,
            collapsed: false,
            visible: false
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
    componentWillMount() {
        fetch('http://localhost:3111/user/checklogin', {
            method: 'POST',
            credentials: 'include'
        })
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
        console.log(e);
        this.setState({ visible: false });
    }
    handleCancel(e) {
        console.log(e);
        this.setState({ visible: false });
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
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                            <Menu.Item key="3">修改个人信息</Menu.Item>
                            {
                                this.state.accountType === 1 ?
                                    null : (<Menu.Item key="10">查看职员信息</Menu.Item>)
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="user" /><span>管理账户</span></span>}
                        >
                            <Menu.Item key="4"><Link to="/manage/changepassword">修改密码</Link></Menu.Item>
                            {
                                this.state.accountType === 1 ?
                                    null : (<Menu.Item key="11">职员账户管理</Menu.Item>)
                            }
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="usergroup-add" /><span>招聘面试</span></span>}
                        >
                            <Menu.Item key="12"><Link to="">邀请面试</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5">
                            <Link to="/manage/aducation">
                                <Icon type="bulb" />
                                <span>培训信息</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to="/manage/record">
                                <Icon type="line-chart" />
                                <span>奖惩信息</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/manage/payment">
                                <Icon type="pay-circle-o" />
                                <span>薪酬结算</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/manage/attendance">
                                <Icon type="flag" />
                                <span>职工出勤</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/manage/holiday">
                                <Icon type="coffee" />
                                <span>请假</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: 50 }}>
                        <div className="sectionRight">
                            <Avatar className="userIcon" onClick={this.showModal} size="large" icon="user" src="http://p5eq9w66k.bkt.clouddn.com/bingguo.jpg" />
                            <span className="user">舒健</span><span className="separat">|</span><span onClick={this.logout} className="logout">退出</span>
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
                        <Upload />
                    </div>
                </Modal>
            </Layout>
        );
    }
}