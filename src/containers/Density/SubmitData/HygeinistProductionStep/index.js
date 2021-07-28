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

class HygeinistProductionStep extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Density Submit Data"
          subTitle="Hygeinist Production"
        />

        <Divider />

        <Form
          labelCol={{
            span: 5,
          }}
          layout="horizontal"
        >
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Form.Item label="Hygenist Name">
                <Select>
                  <Select.Option value="Hygenist 01">Hygenist 01</Select.Option>
                  <Select.Option value="Hygenist 02">Hygenist 02</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Production">
                <Input />
              </Form.Item>
              <Form.Item label="Discounts">
                <Input />
              </Form.Item>
              <Form.Item label="Net Production">
                <Input />
              </Form.Item>
              <Form.Item label="Hours Available">
                <Input />
              </Form.Item>
              <Form.Item label="Hours Scheduled">
                <Input />
              </Form.Item>
              <Form.Item label="Hours Cancelled">
                <Input />
              </Form.Item>
              <Form.Item label="Hours Recoverd">
                <Input />
              </Form.Item>
              <Form.Item label="# of Patient Visits">
                <Input />
              </Form.Item>
              <Form.Item label="Product Sales">
                <Input />
              </Form.Item>
            </Col>
            <Form.List name="hygenist">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col span={12} key={field.key}>
                      <Form.Item label="Hygenist Name">
                        <Select>
                          <Select.Option value="Hygenist 01">Hygenist 01</Select.Option>
                          <Select.Option value="Hygenist 02">Hygenist 02</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Production">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Discounts">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Net Production">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Hours Available">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Hours Scheduled">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Hours Cancelled">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Hours Recoverd">
                        <Input />
                      </Form.Item>
                      <Form.Item label="# of Patient Visits">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Product Sales">
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
                      Add Hygenist
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`}
              >
                Back
              </Button>
              <Button
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.COLLECTIONS}`}
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

export default HygeinistProductionStep;
