import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import Routes from '@/routes';
import FlashMessage from '@/components/FlashMessage';
import { clearErrors } from '@/actions/errorActions';
import AppConfig from '@/constants/AppConfig';
import logoImage from '@/assets/images/logo.png';

import '@/styles/index.scss';
import './index.scss';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
class AppContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    const { history, dispatchClearErrors } = this.props;

    this.unlistenHistory = history.listen(() => {
      dispatchClearErrors();
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div className="app-container">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            width="330"
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo">
              <img src={logoImage} alt="logo" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu key="sub1" icon={<UserOutlined />} title="Students">
                <Menu.Item key="2">
                  <Link to={`${AppConfig.ROUTES.STUDENTS_SCHEDULE}/${AppConfig.SCHEDULE_CLASS_STEPS.REGISTER_CLASS}`}>Schedule</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={`${AppConfig.ROUTES.STUDENTS_SUBMIT_DATA}`}>Submit Data</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to={`${AppConfig.ROUTES.STUDENTS_PURCHASE_ITEMS}`}>Purchase Items</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="5" icon={<PieChartOutlined />}>
                <Link to={`${AppConfig.ROUTES.REPORT}`}>Reporting</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined />}>
                <Link to={`${AppConfig.ROUTES.COACHING}`}>Coaching</Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<UserOutlined />} title="Registration">
                <Menu.Item key="7">
                  <Link to={`${AppConfig.ROUTES.REGISTRATION}`}>Registration</Link>
                </Menu.Item>
                <SubMenu key="sub-inside-1" title="Energy Conversion">
                  <Menu.Item key="8">
                    <Link to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.ENERGY}`}>Energy</Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.DIRECTION}`}>Direction</Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.STRUCTURE_AND_SYSTEMS}`}>Structure and Systems</Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.COMMUNICATION_AND_COORDINATION}`}>Communication and Coordination</Link>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <Link to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.ATTITUDE_AND_SKILLS}`}>Attitude and Skills</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="13">
                  <Link to={`${AppConfig.ROUTES.ENERGY_PROFILE}`}>Energy Profile</Link>
                </Menu.Item>
                <Menu.Item key="14">
                  <Link to={`${AppConfig.ROUTES.PROFIT_AND_LOSS}`}>Profit and Loss</Link>
                </Menu.Item>
                <Menu.Item key="15">
                  <Link to={`${AppConfig.ROUTES.PROFIT_SCAN}`}>Profit Scan</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <FlashMessage />
                <Routes />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

AppContainer.propTypes = {
  history: PropTypes.object,
  dispatchClearErrors: PropTypes.func,
};

export default withRouter(
  connect(null, {
    dispatchClearErrors: clearErrors,
  })(AppContainer),
);
