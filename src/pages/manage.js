import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import '../assets/css/manage.css'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Manage extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="1">
                                <Icon type="like-o" />
                                <span>打 卡</span>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><Icon type="solution" /><span>个人信息</span></span>}>
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="user" /><span>管理账户</span></span>}>
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <Menu.Item key="7">Option 7</Menu.Item>
                                <Menu.Item key="8">Option 8</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="2">
                                <Icon type="pay-circle-o" />
                                <span>薪酬管理</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="flag" />
                                <span>职工出勤</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ paddingLeft: '10px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            Content
                </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}