import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  PageHeader,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class DoctorSalaryStep extends Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`);
  }

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Doctor Salary"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="Gross Salary">
                <Input />
              </Form.Item>
              <Form.Item label="Employer Match for Soc Sec, Medicare">
                <Input />
              </Form.Item>
              <Form.Item label="Draws / Dividends / Distributions">
                <Input />
              </Form.Item>
              <Form.Item label="Insurance Premiums">
                <Input />
              </Form.Item>
              <Form.Item label="Personal Expenses Pd by Practice">
                <Input />
              </Form.Item>
              <Form.Item label="Other">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ marginTop: 16 }}>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                onClick={this.onBack}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.SOLVENCY_SAVINGS_ROI_FUNDS}`}
                type="primary"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

DoctorSalaryStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(DoctorSalaryStep);
