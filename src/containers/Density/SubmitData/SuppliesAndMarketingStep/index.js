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

class SuppliesAndMarketingStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Supplies & Marketing"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Supplies / Raw Materials">
                <Form.Item label="Shared Supplies">
                  <Input />
                </Form.Item>
                <Form.Item label="Doctors Supplies (hazard waste)">
                  <Input />
                </Form.Item>
                <Form.Item label="Orthodontic Supplies">
                  <Input />
                </Form.Item>
                <Form.Item label="Hygiene Supplies">
                  <Input />
                </Form.Item>
                <Form.Item label="Hygiene Product">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Marketing / Advertising">
                <Form.Item label="Advertising">
                  <Input />
                </Form.Item>
                <Form.Item label="Marketing">
                  <Input />
                </Form.Item>
                <Form.Item label="Website">
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.LABORTORY_DOCTORS}`}
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

export default SuppliesAndMarketingStep;
