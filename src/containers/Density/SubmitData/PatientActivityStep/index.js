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

class PatientActivityStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Patient Activity"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="Active Patient Count">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="New Patient (6 to 20)">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="New Patient (21 to 40)">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="New Patient (41+)">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="# of Formal Review of Findings">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="$ Presented">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="# of Formal Review of Findings">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="$ Presented">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="# of Formal Review of Findings">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="$ Presented">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="# of actual appointed">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="$ Accepted">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="# of Informal Review of Findings">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="$ Presented">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="# of actual appointed">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="$ Accepted">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="Due in Recare This Month">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="# Seen">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={8}>
              <h3 className="ant-form-text">Referred By</h3>
              <Form.Item label="Patients of Record">
                <Input />
              </Form.Item>
              <Form.Item label="Doctors">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={8}>
              <h3 className="ant-form-text">Production By Category $</h3>
              <Form.Item label="A Services">
                <Input />
              </Form.Item>
              <Form.Item label="B Services">
                <Input />
              </Form.Item>
              <Form.Item label="C Services">
                <Input />
              </Form.Item>
              <Form.Item label="Production Adj">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.COLLECTIONS}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`}
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

export default PatientActivityStep;
