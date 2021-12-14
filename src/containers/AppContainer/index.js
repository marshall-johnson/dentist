import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, notification } from 'antd';
import {
  UserOutlined,
  PieChartOutlined,
  SettingOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';

import Routes from '@/routes';
import FlashMessage from '@/components/FlashMessage';
import { clearErrors } from '@/actions/errorActions';
import AppConfig from '@/constants/AppConfig';
import logoImage from '@/assets/images/logo.png';
import { logout } from '@/actions/authActions';

import '@/styles/index.scss';
import './index.scss';
import { UserAccountType } from '@/constants';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
class AppContainer extends Component {
  constructor(props) {
    super();

    this.state = {
      collapsed: false,
      openKeys: null,
    };
  }

  componentDidMount() {
    const { history, dispatchClearErrors, currentUser } = this.props;

    if (!currentUser) {
      history.push('/login');
    }
    this.unlistenHistory = history.listen(() => {
      dispatchClearErrors();
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onLogout = async () => {
    const { logout, history } = this.props;
    const isSuccess = await logout();

    if (isSuccess) {
      notification.success({
        message: 'Logout Successfully',
      });
      history.push({
        pathname: AppConfig.ROUTES.LOGIN,
      });
    }
  };

  render() {
    const { collapsed, openKeys } = this.state;
    const { currentUser } = this.props;

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
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              openKeys={[openKeys]}
              mode="inline"
            >
              {[
                UserAccountType.ADMIN,
                UserAccountType.STUDENT_ADMIN,
                UserAccountType.STUDENT_STAFF,
                UserAccountType.STUDENT_DOCTOR,
              ].includes(currentUser?.account_type) && (
                <SubMenu
                  key="registration"
                  icon={<UserOutlined />}
                  title="Registration"
                  onTitleClick={() => {
                    this.setState({
                      openKeys: 'registration',
                    });
                  }}
                >
                  {[
                    UserAccountType.ADMIN,
                    UserAccountType.STUDENT_ADMIN,
                  ].includes(currentUser?.account_type) && (
                    <Menu.Item key="1">
                      <Link to={`${AppConfig.ROUTES.REGISTRATION}`}>
                        Registration
                      </Link>
                    </Menu.Item>
                  )}
                  {[
                    UserAccountType.ADMIN,
                    UserAccountType.STUDENT_ADMIN,
                  ].includes(currentUser?.account_type) && (
                    <Menu.Item key="2">
                      <Link to={`${AppConfig.ROUTES.PROFIT_AND_LOSS}`}>
                        PPP
                      </Link>
                    </Menu.Item>
                  )}
                  {[
                    UserAccountType.ADMIN,
                    UserAccountType.STUDENT_ADMIN,
                  ].includes(currentUser?.account_type) && (
                    <Menu.Item key="3">
                      <Link to={`${AppConfig.ROUTES.CHART_AUDIT}`}>
                        Chart audit
                      </Link>
                    </Menu.Item>
                  )}
                  {[
                    UserAccountType.ADMIN,
                    UserAccountType.STUDENT_ADMIN,
                    UserAccountType.STUDENT_STAFF,
                    UserAccountType.STUDENT_DOCTOR,
                  ].includes(currentUser?.account_type) && (
                    <SubMenu key="sub-inside-1" title="Energy Conversion">
                      <Menu.Item key="4">
                        <Link
                          to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.ENERGY}`}
                        >
                          Energy
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="5">
                        <Link
                          to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.DIRECTION}`}
                        >
                          Direction
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="6">
                        <Link
                          to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.STRUCTURE_AND_SYSTEMS}`}
                        >
                          Structure and Systems
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="7">
                        <Link
                          to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.COMMUNICATION_AND_COORDINATION}`}
                        >
                          Communication and Coordination
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="8">
                        <Link
                          to={`${AppConfig.ROUTES.ENERGY_CONVERSION}/${AppConfig.ENERGY_CONVERSION.ATTITUDE_AND_SKILLS}`}
                        >
                          Attitude and Skills
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                  )}
                </SubMenu>
              )}
              {[UserAccountType.ADMIN, UserAccountType.STUDENT_ADMIN].includes(
                currentUser?.account_type,
              ) && (
                <SubMenu
                  key="management"
                  icon={<DatabaseOutlined />}
                  title="Management"
                  onTitleClick={() => {
                    this.setState({
                      openKeys: 'management',
                    });
                  }}
                >
                  <Menu.Item key="mangement-student">
                    <Link
                      to={`${AppConfig.ROUTES.MANGEMENT}/${AppConfig.MANGEMENT.STUDENT}`}
                    >
                      Student
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              {[
                UserAccountType.ADMIN,
                UserAccountType.STUDENT_ADMIN,
                UserAccountType.STUDENT_STAFF,
                UserAccountType.STUDENT_DOCTOR,
              ].includes(currentUser?.account_type) && (
                <SubMenu
                  key="student"
                  icon={<UserOutlined />}
                  title="Students"
                  onTitleClick={() => {
                    this.setState({
                      openKeys: 'student',
                    });
                  }}
                >
                  <Menu.Item key="9">
                    <Link
                      to={`${AppConfig.ROUTES.STUDENTS_SCHEDULE}/${AppConfig.SCHEDULE_CLASS_STEPS.REGISTER_CLASS}`}
                    >
                      Schedule
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to={`${AppConfig.ROUTES.STUDENTS_SUBMIT_DATA}`}>
                      Submit Data
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link to={`${AppConfig.ROUTES.STUDENTS_PURCHASE_ITEMS}`}>
                      Purchase Items
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              {[
                UserAccountType.ADMIN,
                UserAccountType.STUDENT_ADMIN,
                UserAccountType.COACH,
              ].includes(currentUser?.account_type) && (
                <SubMenu
                  key="coaching"
                  icon={<UserOutlined />}
                  title="Coaching"
                  onTitleClick={() => {
                    this.setState({
                      openKeys: 'coaching',
                    });
                  }}
                >
                  <Menu.Item key="12">
                    <Link to={`${AppConfig.ROUTES.REVIEW_SUBMITED}`}>
                      Review submitted
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="13">
                    <Link to={`${AppConfig.ROUTES.COACHING_PPP}`}>PPP</Link>
                  </Menu.Item>
                  <Menu.Item key="14">
                    <Link to={`${AppConfig.ROUTES.ENERGY_PROFILE_REPORT}`}>
                      Energy Profile Report
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="15">
                    <Link to={`${AppConfig.ROUTES.CHART_AUDIT_REPORT}`}>
                      Chart Audit Report
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )}
              {[
                UserAccountType.ADMIN,
                UserAccountType.STUDENT_ADMIN,
                UserAccountType.STUDENT_STAFF,
                UserAccountType.STUDENT_DOCTOR,
                UserAccountType.COACH,
              ].includes(currentUser?.account_type) && (
                <Menu.Item key="16" icon={<PieChartOutlined />}>
                  <Link to={`${AppConfig.ROUTES.REPORT}`}>Reporting</Link>
                </Menu.Item>
              )}
              <SubMenu
                key="setting"
                icon={<SettingOutlined />}
                title="Setting"
                onTitleClick={() => {
                  this.setState({
                    openKeys: 'setting',
                  });
                }}
              >
                <Menu.Item key="18" onClick={this.onLogout}>
                  Log out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '16px' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
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
  currentUser: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    currentUser: auth.currentUser,
  };
}

export default withRouter(
  connect(mapStateToProps, {
    dispatchClearErrors: clearErrors,
    logout,
  })(AppContainer),
);
