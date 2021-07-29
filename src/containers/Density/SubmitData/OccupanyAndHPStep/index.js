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

class OccupanyAndHPStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Occupany & H&P"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Occupancy">
                <Form.Item label="Mortgage / Rent">
                  <Input />
                </Form.Item>
                <Form.Item label="Utilities">
                  <Input />
                </Form.Item>
                <Form.Item label="Janitorial">
                  <Input />
                </Form.Item>
                <Form.Item label="Repairs / Maintenance / Leasehold Improv">
                  <Input />
                </Form.Item>
                <Form.Item label="Facilities Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Security System">
                  <Input />
                </Form.Item>
                <Form.Item label="Property Tax">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Human & Physical Resource Development">
                <Form.Item label="Dental Equip Loan / Equip Maintenance">
                  <Input />
                </Form.Item>
                <Form.Item label="Office Furniture and Repairs">
                  <Input />
                </Form.Item>
                <Form.Item label="Staff Continuing Education">
                  <Input />
                </Form.Item>
                <Form.Item label="Staff SCPD Tuition / Travel">
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`}
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

export default OccupanyAndHPStep;
