import React from "react";
import { Button, Layout, Menu, Avatar } from 'antd';
import Manager from '../../component/Manager/Manager'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
import "./Home.css"
import { Route } from "react-router-dom";
import Statistics from "../../component/Statistics/Statistics";
import Classify from "../../component/Classify/Classify";
import Product from "../../component/Product/Product";
import order from "../../component/order/order";
export default class Home extends React.Component {
  state = {
    collapsed: false,
    defaultSelectedKeys: JSON.parse(sessionStorage.getItem("activeMenu")) || ["statistics"],
    img: ''
  };
  toggle = () => {
    console.log(this)
    this.setState({
      collapsed: !this.state.collapsed,
    });

  };
  jump = (item) => {
    console.log(item)
    sessionStorage.setItem("activeMenu", JSON.stringify(item.keyPath))
    this.props.history.push("/home/" + item.key)
  }
  loginOut = () => {
    this.props.history.push('/')
  }
  render() {

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>

          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys} onClick={this.jump}>
            <Menu.Item key="statistics" icon={<UserOutlined />}>
              统计
            </Menu.Item>
            <Menu.Item key="manager" icon={<VideoCameraOutlined />}>
              管理员
            </Menu.Item>
            <Menu.Item key="classify" icon={<UploadOutlined />}>
              分类
            </Menu.Item>
            <Menu.Item key="product" icon={<UploadOutlined />}>
              产品
            </Menu.Item>
            <Menu.Item key="order" icon={<UploadOutlined />}>
              订单
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background header" style={{ paddingLeft: 15 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <span className="title">财务管理系统</span>
            <div>
              <Avatar size={48} icon={<UserOutlined />} src={this.state.img} className="avater" />
              <Button
                onClick={this.loginOut}
              >退出登录</Button>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,

            }}
          >
            <Route component={Manager} path='/home/manager'></Route>
            <Route component={Statistics} path='/home/statistics'></Route>
            <Route component={Classify} path='/home/classify'></Route>
            <Route component={Product} path='/home/product'></Route>
            <Route component={order} path='/home/order'></Route>
          </Content>
        </Layout>
      </Layout>
    )
  }

}


