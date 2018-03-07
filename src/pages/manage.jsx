import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router'
import '../assets/css/manage.css'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class Manage extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
        };
        this.onCollapse = this.onCollapse.bind(this);
    }
    onCollapse(collapsed) {
        console.log(collapsed);
        this.setState({ collapsed });
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
                            title={<span><Icon type="solution" /><span>个人信息</span></span>}
                        >
                            <Menu.Item key="2"><Link to="/manage/employeeinfo">查询个人信息</Link></Menu.Item>
                            <Menu.Item key="3">修改个人信息</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="user" /><span>管理账户</span></span>}
                        >
                            <Menu.Item key="4"><Link to="/manage/changepassword">修改密码</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="5">
                            <Icon type="bulb" />
                            <span>培训信息</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="line-chart" />
                            <span>奖惩信息</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to="/manage/payment">
                                <Icon type="pay-circle-o" />
                                <span>薪酬结算</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="flag" />
                            <span>职工出勤</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Icon type="coffee" />
                            <span>请假</span>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Icon type="smile-o" />
                            <span>调休</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: 16 }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        人力资源管理系统 ©2018 Created by shuDianZhang
              </Footer>
                </Layout>
            </Layout>
        );
    }
}