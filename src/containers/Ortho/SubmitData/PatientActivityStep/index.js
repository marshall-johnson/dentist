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

class PatientActivityStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Patient Activity"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={8}>
              <Card title="4 to 11">
                <Form.Item label="New Patients Exams">
                  <Input />
                </Form.Item>
                <Form.Item label="# of New Patient Records">
                  <Input />
                </Form.Item>
                <Form.Item label="# Who Scheduled Records">
                  <Input />
                </Form.Item>
                <Form.Item label="# of Contract Presented">
                  <Input />
                </Form.Item>
                <Form.Item label="# of Contract Accepted">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="12 to 18">
                <Form.Item label="New Patients Exams">
                  <Input />
                </Form.Item>
                <Form.Item label="# of New Patient Records">
                  <Input />
                </Form.Item>
                <Form.Item label="# Who Scheduled Records">
                  <Input />
                </Form.Item>
                <Form.Item label="# of Contract Presented">
                  <Input />
                </Form.Item>
                <Form.Item label="# of Contract Accepted">
                  <Input />
                </Form.Item>

              </Card>
            </Col>
            <Col span={8}>
              <Card title="19+">
                <Form.Item label="New Patients Exams">
                  <Input />
                </Form.Item>
                <Form.Item label="# of New Patient Records">
                  <Input />
                </Form.Item>
                <Form.Item label="# Who Scheduled Records">
                  <Input />
                </Form.Item>
                <Form.Item label="# of Contract Presented">
                  <Input />
                </Form.Item>
                <Form.Item label="# of Contract Accepted">
                  <Input />
                </Form.Item>

              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col span={12}>
              <Form.Item label="Active Patient Count">
                <Input />
              </Form.Item>
              <Form.Item label="# of Pts in Extended Tx">
                <Input />
              </Form.Item>
              <Form.Item label="# due of Pre-Tx Observation Pts">
                <Input />
              </Form.Item>
              <Form.Item label="# of Pre-Tx Observation Pts Seen">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={12}>
              <h3 className="ant-form-text">Referred By</h3>
              <Form.Item label="Patients of Record">
                <Input />
              </Form.Item>
              <Form.Item label="Yellow Pages">
                <Input />
              </Form.Item>
              <Form.Item label="Doctors">
                <Input />
              </Form.Item>
              <Form.Item label="Family">
                <Input />
              </Form.Item>
              <Form.Item label="Website">
                <Input />
              </Form.Item>
              <Form.Item label="Other">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={12}>
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
            </Col>
          </Row>

          <Row style={{ marginTop: 16 }}>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.COLLECTIONS}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`}
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
