import React, { useState } from 'react';
import './styles.css'
import {
  CaretDownOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  LinkOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, MenuProps, Avatar, Dropdown } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { removeToken } from '../../constants/appconstants';
import { Link, useNavigate } from 'react-router-dom';
import MainContainer from '../MainConten/MainConen';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Logout', '1', <LogoutOutlined />),
];
const MainApp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuLogout = () => {
    removeToken();
    navigate('/Login')
  };
  const items2: MenuItem[] = [
    getItem(
      <Link className='label' to="/home"> Dashboard</Link>, '1', <DashboardOutlined style={{ fontSize: 17 }} />),
    getItem(
      <div className='label' >Navigation Two</div>, '2', <CreditCardOutlined style={{ fontSize: 17 }} />),
    getItem(
      <div className='label'>Doctor management</div>, 'sub1', <MedicineBoxOutlined style={{ fontSize: 17 }} />, [
      getItem(
        <Link to="/home/doctor"> Doctor</Link>, '3'),
      getItem(
        <Link to="/home/workplace"> Workplace</Link>, '4'),
      getItem(
        <Link to="/home/degree"> Degree</Link>, '5'),
    ]),
    getItem('Navigation Three', 'sub2', <SettingOutlined />, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
    ]),
    getItem(
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>,
      'link',
      <LinkOutlined />,
    ),
  ];

  const menuProps = {
    items,
    onClick: handleMenuLogout,
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={'17%'} >
        <div style={{ display: 'flex', height: "15%", justifyContent: 'center', alignItems: 'center' }} >
          <img src={require("../../asset/image/logo.png")} style={!collapsed ? { width: '25%', transform: 'revert-layer' } : { width: "40%" }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items2}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className='header' style={{ padding: 0, background: colorBgContainer }} >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Dropdown menu={menuProps}>
            <Button className='button'>
              <Avatar size="small" icon={<UserOutlined />} />
              <div className='textUser'>Admin</div>
              <CaretDownOutlined />
            </Button>
          </Dropdown>
        </Header>

        <Content style={{ margin: '16px  16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <MainContainer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainApp;