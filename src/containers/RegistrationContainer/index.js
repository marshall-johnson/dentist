import React, { Component } from 'react';
import {
  Space,
  Button,
  Divider,
  PageHeader,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class RegistrationContainer extends Component {
  render() {
    return (
      <div className="registration-container">
        <PageHeader
          className="site-page-header"
          title="Registation Page"
        />
        <Divider />

        <Space align="bottom">
          <Button
            href={`${AppConfig.ROUTES.REGISTRATION}/${AppConfig.REGISTRATIONS.CREATE_USER}`}
            type="primary"
          >
            Create User
          </Button>
          <Button
            type="primary"
          >
            Finish Registration
          </Button>
        </Space>
      </div>
    );
  }
}

export default RegistrationContainer;
