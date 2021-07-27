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

class StaffCompensationStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Staff Compensation"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={6}>
              <Card title="Assistants">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension Contribution">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SS, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA / SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Uniform Allowance">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Profit Sharing / Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Sub Totals">
                  <Input />
                </Form.Item>
                <Form.Item label="Work Comp - all">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Administrative">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension Contribution">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SS, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA / SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Uniform Allowance">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Profit Sharing / Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Sub Totals">
                  <Input />
                </Form.Item>
                <Form.Item label="Work Comp - all">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Hygene">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension Contribution">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SS, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA / SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Uniform Allowance">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Profit Sharing / Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Sub Totals">
                  <Input />
                </Form.Item>
                <Form.Item label="Work Comp - all">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Hygiene Assistant">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension Contribution">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SS, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA / SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Uniform Allowance">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Profit Sharing / Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Sub Totals">
                  <Input />
                </Form.Item>
                <Form.Item label="Work Comp - all">
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`}
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

export default StaffCompensationStep;
