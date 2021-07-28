import React, { Component } from 'react';
import {
  Button,
  PageHeader,
  Space,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class SubmitDataContainer extends Component {

  render() {
    return (
      <div className="submit-data-container">
        <PageHeader
          className="site-page-header"
          title="Submit Data Page"
        />
        <Space>
          <Button
            href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`}
            type="primary"
          >
            Manually Enter Density Data
          </Button>
          <Button
            href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`}
            type="primary"
          >
            Manually Enter Ortho Data
          </Button>
        </Space>
      </div>
    );
  }
}

export default SubmitDataContainer;
