import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Button,
  DatePicker,
} from 'antd';

const { Option } = Select;

class Filter extends Component {
  render() {
    return (
      <Form
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              label='Select Report'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Option value="report 1">Report 1</Option>
                <Option value="report 2">Report 2</Option>
                <Option value="report 3">Report 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="DatePicker">
              <DatePicker
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Select Practice Type'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                <Option value="dentistry">Dentistry</Option>
                <Option value="ortho">Ortho</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Filter;
