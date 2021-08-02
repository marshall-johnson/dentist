import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Space,
  Divider,
  PageHeader,
  Descriptions,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class RegisterClassStep extends Component {
  renderInformationConfirm = () => (
    <div>
      <Descriptions title="Class Selected">
        <Descriptions.Item label="Class Name">Class G</Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Date">7/17/2021</Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Start Time">9:00 AM PST</Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="End Time">12:00 PM PST</Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Description">
          Training on managing and accounting with Accounts Receivable
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Instructor">
          Brenda Penwell
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Meterial Include">
          Worksheets, Training Manual
        </Descriptions.Item>
      </Descriptions>
    </div>
  )

  render() {
    return (
      <div className="schedule-class-confirm-container">
        <PageHeader
          className="site-page-header"
          title="Schedule Classes / Sessions"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row>
            <Col span={12}>
              {this.renderInformationConfirm()}
            </Col>
          </Row>

          <Row>
            <Col>
              <Space>
                <Button
                  type="primary"
                  href={`${AppConfig.ROUTES.STUDENTS_SCHEDULE}/${AppConfig.SCHEDULE_CLASS_STEPS.REGISTER_CLASS}`}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                >
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default RegisterClassStep;
