/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Input, Select, InputNumber } from 'antd';

import PhoneInput from 'react-phone-input-2';

import { STUDENT_DEGREES } from '@/constants';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const { Option } = Select;

class EnterClientPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        student: {
          first_name: null,
          last_name: null,
          degree: null,
          address: null,
          city: null,
          zip: null,
          business_phone: null,
          phone_number: null,
          spending_report_months: null,
          state: null,
          specialty: null,
        },
      },
    };
  }

  render() {
    const { initialValues } = this.state;
    const { formRef } = this.props;

    return (
      <Form
        ref={formRef}
        layout="vertical"
        initialValues={initialValues}
        validateMessages={validateMessages}
      >
        <Form.Item
          wrapperCol={{
            span: 12,
          }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name={['student', 'first_name']}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Last Name"
                name={['student', 'last_name']}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Degree"
                name={['student', 'degree']}
                fieldKey="degree"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select>
                  {STUDENT_DEGREES.map((data, index) => (
                    <Option key={index.toString()} value={data.value}>
                      {data.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Address"
            name={['student', 'address']}
            fieldKey="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="City"
                name={['student', 'city']}
                fieldKey="city"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Zip"
                name={['student', 'zip']}
                fieldKey="zip"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Business Phone"
                name={['student', 'business_phone']}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <PhoneInput country="us" inputStyle={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Home Number"
                name={['student', 'phone_number']}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <PhoneInput country="us" inputStyle={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Spending Report Months"
                name={['student', 'spending_report_months']}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="State"
                name={['student', 'state']}
                fieldKey="state"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Specialty"
                name={['student', 'specialty']}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select>
                  <Option value="general">General</Option>
                  <Option value="prostho">Prostho</Option>
                  <Option value="ortho">Ortho</Option>
                  <Option value="pedo">Pedo</Option>
                  <Option value="perio">Perio</Option>
                  <Option value="endo">Endo</Option>
                  <Option value="surg">Surg</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

EnterClientPage.propTypes = {
  formRef: PropTypes.object,
};

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, {})(EnterClientPage));
