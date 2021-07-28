import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Button,
  Divider,
  PageHeader,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class SolvencySavingsROIFundsStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Solvency, Savings and ROI Funds"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Solvency / Savings">
                <Form.Item label="Deposits Made">
                  <Input />
                </Form.Item>
                <Form.Item label="Pymts on Pre-Mgmt Year Short-Term Debt">
                  <Input />
                </Form.Item>
                <Form.Item label="Transferred out of Solvency Acct">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="ROI Funds">
                <Form.Item label="Dr. Pension">
                  <Input />
                </Form.Item>
                <Form.Item label="Other CE">
                  <Input />
                </Form.Item>
                <Form.Item label="Long-Term Investments">
                  <Input />
                </Form.Item>
                <Form.Item label="Goodwill Loan Practice Payments">
                  <Input />
                </Form.Item>
                <Form.Item label="SCPD Expenses">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Row style={{ marginTop: 16 }}>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`}
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default SolvencySavingsROIFundsStep;
