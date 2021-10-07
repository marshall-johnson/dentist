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
  Divider,
  PageHeader,
} from 'antd';

import PhoneInput from 'react-phone-input-2';

import {
  createUser,
} from '@/actions/userActions';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class RegistrationContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        user: {
          first_name: null,
          last_name: null,
          email: null,
          phone_number: null,
        }
      }
    };
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values);

    const { createUser, history } = this.props;

    createUser({ params: values, history });
  };

  render() {

    const { initialValues } = this.state;

    return (
      <div className="registration-container">
        <PageHeader
          className="site-page-header"
          title="Registation Page"
        />
        <Divider />

        <Row align="bottom">
          <Col span={12}>
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
                <Form.Item
                  label="First Name"
                  name={['user', 'first_name']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name={['user', 'last_name']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name={['user', 'email']}
                  fieldKey="email"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: 'email',
                      message: 'is not a valid email'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name={['user', 'phone_number']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <PhoneInput
                    country='us'
                    inputStyle={{ width: '100%' }}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

RegistrationContainer.propTypes = {
  history: PropTypes.object,
  createUser: PropTypes.func,
};

export default withRouter(
  connect(null, {
    createUser,
  })(RegistrationContainer)
);
