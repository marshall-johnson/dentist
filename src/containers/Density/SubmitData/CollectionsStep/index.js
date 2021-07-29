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

class CollectionsStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Collections"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Form.Item label="Total Gross Collection">
                <Input />
              </Form.Item>
              <Form.Item label="Refunds to Patients or Insurance Companies">
                <Input />
              </Form.Item>
              <Form.Item label="Total Net Collections">
                <Input />
              </Form.Item>
              <Form.Item label="Collections at Time of Service">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <h3 className="ant-form-text">Accounts Recievables</h3>
              <Form.Item label="0 to 30 Days">
                <Input />
              </Form.Item>
              <Form.Item label="31 to 60 Days">
                <Input />
              </Form.Item>
              <Form.Item label="61 to 90 Days">
                <Input />
              </Form.Item>
              <Form.Item label="91+ Days">
                <Input />
              </Form.Item>
              <Form.Item label="Total">
                <Input />
              </Form.Item>
              <Form.Item label="Unpaid Bills Due This Month">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.HYGEINIST_PRODUCTION}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}`}
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

export default CollectionsStep;
