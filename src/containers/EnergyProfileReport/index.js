import React, { Component } from 'react';
import {
  Space,
  Button,
  Divider,
  PageHeader,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class EnergyProfile extends Component {
  render() {
    return (
      <div className="energy-profile-container">
        <PageHeader
          className="site-page-header"
          title="Energy Profile"
        />
        <Divider />

        <Space align="bottom">
          <Button
            href={`${AppConfig.ROUTES.ENERGY_PROFILE}/${AppConfig.ENERGY_PROFILE.DATA_RESULT}`}
            type="primary"
          >
            Sort Data
          </Button>
          <Button
            href={`${AppConfig.ROUTES.ENERGY_PROFILE}/${AppConfig.ENERGY_PROFILE.DATA_ANALYSIS}`}
            type="primary"
          >
            Print Report
          </Button>
        </Space>
      </div>
    );
  }
}

export default EnergyProfile;
