import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Space, Button, Divider, PageHeader } from 'antd';

import AppConfig from '@/constants/AppConfig';
import { connect } from 'react-redux';
import { UserAccountType } from '@/constants';

class RegistrationContainer extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="registration-container">
        <PageHeader className="site-page-header" title="Registation Page" />
        <Divider />

        <Space align="bottom">
          {currentUser?.account_type === UserAccountType.ADMIN && (
            <Button
              href={`${AppConfig.ROUTES.REGISTRATION}/${AppConfig.REGISTRATIONS.CREATE_STUDENT}`}
              type="primary"
            >
              Create Student
            </Button>
          )}

          {currentUser?.account_type === UserAccountType.STUDENT_ADMIN && (
            <Button
              href={`${AppConfig.ROUTES.REGISTRATION}/${AppConfig.REGISTRATIONS.CREATE_USER}`}
              type="primary"
            >
              Create User
            </Button>
          )}
        </Space>
      </div>
    );
  }
}

RegistrationContainer.propTypes = {
  currentUser: PropTypes.object,
};

function mapStateToProps({ auth }) {
  return {
    currentUser: auth.currentUser,
  };
}

export default connect(mapStateToProps, {})(RegistrationContainer);
