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
          title="Ortho Submit Data"
          subTitle="Supplies & Marketing"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Supplies / Raw Materials">
                <Form.Item label="Backets / Bands / Adhesives">
                  <Input />
                </Form.Item>
                <Form.Item label="Wires / ligatures / headgears / facebows">
                  <Input />
                </Form.Item>
                <Form.Item label="X-ray Film">
                  <Input />
                </Form.Item>
                <Form.Item label="Dispoables">
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
                <Form.Item label="Internal and External Marketing">
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
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.LABORTORY_DOCTORS}`}
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
