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

class LabortoryAndDoctorsStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Labortory & Doctors"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Labotory">
                <Form.Item label="Restorive Lab">
                  <Input />
                </Form.Item>
                <Form.Item label="Ortho Lab">
                  <Input />
                </Form.Item>
                <Form.Item label="Implant Supplies">
                  <Input />
                </Form.Item>
                <Form.Item label="Cerec">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Doctor Salary">
                <Form.Item label="Gross Salary / Draws / Taxes on Draws">
                  <Input />
                </Form.Item>
                <Form.Item label="Matching 941 Deposit">
                  <Input />
                </Form.Item>
                <Form.Item label="Personal Expenses Paid By Office">
                  <Input />
                </Form.Item>
                <Form.Item label="Insurnace Premiums">
                  <Input />
                </Form.Item>
                <Form.Item label="Other">
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`}
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

export default LabortoryAndDoctorsStep;
