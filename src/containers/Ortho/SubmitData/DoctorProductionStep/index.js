import React, { Component } from 'react';
import {
  PlusOutlined
} from '@ant-design/icons';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Divider,
  PageHeader,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

class DoctorProductionStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Doctor Production"
        />

        <Divider />

        <Form
          labelCol={{
            span: 7,
          }}
          layout="horizontal"
        >
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Form.Item label="Doctor Name">
                <Select>
                  <Select.Option value="Doctor 01">Doctor 01</Select.Option>
                  <Select.Option value="Doctor 02">Doctor 02</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Dr. Production">
                <Input />
              </Form.Item>
              <Form.Item label="Production Adj">
                <Input />
              </Form.Item>
              <Form.Item label="Net Production">
                <Input />
              </Form.Item>
              <Form.Item label="Hours Available">
                <Input />
              </Form.Item>
              <Form.Item label="Hours Schedule w/ Pts">
                <Input />
              </Form.Item>
              <Form.Item label="# of Start Appts Available">
                <Input />
              </Form.Item>
              <Form.Item label="# of Start Appts Available">
                <Input />
              </Form.Item>
              <Form.Item label="# of Patient Visits">
                <Input />
              </Form.Item>
              <Form.Item label="# of Appt Changes">
                <Input />
              </Form.Item>
            </Col>
            <Form.List name="doctor">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col span={12} key={field.key}>
                      <Form.Item label="Doctor Name">
                        <Select>
                          <Select.Option value="Doctor 01">Doctor 01</Select.Option>
                          <Select.Option value="Doctor 02">Doctor 02</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Dr. Production">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Production Adj">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Net Production">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Hours Available">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Hours Schedule w/ Pts">
                        <Input />
                      </Form.Item>
                      <Form.Item label="# of Start Appts Available">
                        <Input />
                      </Form.Item>
                      <Form.Item label="# of Start Appts Available">
                        <Input />
                      </Form.Item>
                      <Form.Item label="# of Patient Visits">
                        <Input />
                      </Form.Item>
                      <Form.Item label="# of Appt Changes">
                        <Input />
                      </Form.Item>
                      <Form.Item
                        style={{ textAlign: 'right' }}
                      >
                        <Button
                          onClick={() => remove(field.name)}
                          type="danger"
                        >
                          Remove
                        </Button>
                      </Form.Item>
                    </Col>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Doctor
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Row>
          <Row>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                href={`${AppConfig.ROUTES.STUDENTS_SUBMIT_DATA}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.COLLECTIONS}`}
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

export default DoctorProductionStep;
