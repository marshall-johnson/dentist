import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  PageHeader,
  InputNumber,
} from 'antd';

import PhoneInput from 'react-phone-input-2';

import { createUser } from '@/actions/user1Actions';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const { Option } = Select;

class CreateUserContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        user: {
          firstName: null,
          lastName: null,
          degree: null,
          address: null,
          city: null,
          zip: null,
          businessPhone: null,
          phoneNumber: null,
          spendingReportMonths: null,
          state: null,
          specialty: null,
        },
      },
    };
  }

  onFinish = (values) => {
    const { createUser, history } = this.props;

    createUser({ params: values, history });
  };

  render() {
    const { initialValues } = this.state;

    return (
      <div className="registration-container">
        <PageHeader className="site-page-header" title="Registation Page" />
        <Divider />

        <Form
          layout="vertical"
          onFinish={this.onFinish}
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
                  name={['user', 'firstName']}
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
                  name={['user', 'lastName']}
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
                  name={['user', 'degree']}
                  fieldKey="degree"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Address"
              name={['user', 'address']}
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
                  name={['user', 'city']}
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
                  name={['user', 'zip']}
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
                  name={['user', 'businessPhone']}
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
                  name={['user', 'phoneNumber']}
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
                  name={['user', 'spendingReportMonths']}
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
                  name={['user', 'state']}
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
                  name={['user', 'specialty']}
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

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

CreateUserContainer.propTypes = {
  history: PropTypes.object,
  createUser: PropTypes.func,
};

export default withRouter(
  connect(null, {
    createUser,
  })(CreateUserContainer),
);
