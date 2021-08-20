import React, { Component } from 'react';
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
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SOLVENCY_SAVINGS_ROI_FUNDS}`}
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

export default DoctorSalaryStep;
