import React, { useState } from 'react';
import './styles.css'
import {
  CaretDownOutlined,
  DesktopOutlined,
  FileOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, MenuProps, Dropdown } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { removeToken } from '../../constants/appconstants';
import { Link, useNavigate } from 'react-router-dom';
import MainContainer from '../MainConten/MainConen';

const { Header, Content, Footer, Sider } = Layout;

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

  const menuProps = {
    items,
    onClick: handleMenuLogout,
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={'15%'} >
        <div style={{ display: 'flex', height: "15%", justifyContent: 'center', alignItems: 'center' }} >
          <img src={require("../../asset/image/logo.png")} style={!collapsed ? { height: "80%", width: "30%", transform: 'revert-layer' } : { height: "40%", width: "40%" }} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}

        >
          <Menu.Item key={1}>
            <Link to="/home/doctor"> Doctor</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className='header' style={{ padding: 0, background: colorBgContainer }} >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Dropdown menu={menuProps}>
            <Button className='button'>
              <UserOutlined />
              <div className='textUser'>Admin</div>
              <CaretDownOutlined />
            </Button>
          </Dropdown>
        </Header>

        <Content style={{ margin: '16px  16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <MainContainer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainApp;