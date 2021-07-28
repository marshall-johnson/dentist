import React, { Component } from 'react';
import {
  Button,
  PageHeader,
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
        <Button
          href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`}
          type="primary"
        >
          Manually Enter Data
        </Button>
      </div>
    );
  }
}

export default SubmitDataContainer;
