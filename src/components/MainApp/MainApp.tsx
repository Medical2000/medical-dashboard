import React, { useState } from 'react';
import './styles.css'
import {
  AuditOutlined,
  CaretDownOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  HistoryOutlined,
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
      <Link className='label' to="/home"> Trang chủ</Link>, '1', <DashboardOutlined style={{ fontSize: 17 }} />),
    getItem(
      <Link className='label' to="home/appointment" >Lịch đặt khám bệnh</Link>, '2', <CreditCardOutlined style={{ fontSize: 17 }} />),
    getItem(
      <Link className='label' to="home/history" >Lịch sử cuộc gọi</Link>, '3', <HistoryOutlined style={{ fontSize: 17 }} />),
    getItem(
      <div className='label'>Quản lí bác sĩ</div>, 'sub1', <MedicineBoxOutlined style={{ fontSize: 17 }} />, [
      getItem(
        <Link to="/home/doctor">Bác sĩ</Link>, '4'),
      getItem(
        <Link to="/home/workplace">Nơi làm việc</Link>, '5'),
      getItem(
        <Link to="/home/degree">Bằng cấp</Link>, '6'),
    ]),
    getItem(
      <div className='label'>Quản lí bệnh nhân</div>, 'sub2', <AuditOutlined style={{ fontSize: 17 }} />, [
      getItem(
        <Link to="/home/patient">Bệnh nhân</Link>, '7'),
      getItem(
        <Link to="/home/doctor">Bệnh án</Link>, '8'),
      getItem(
        <Link to="home/bloodGroup">Nhóm máu</Link>, '9'),
    ]),
    getItem(
      <div className='label'>Quản trị hệ thống</div>, 'sub3', <SettingOutlined style={{ fontSize: 17 }} />, [
      getItem(
        <Link to="/home/user">Người dùng</Link>, '11',),
      getItem(
        <Link to="/home/role">Quyền</Link>, '12',),

    ])

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
        // onScroll={}
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