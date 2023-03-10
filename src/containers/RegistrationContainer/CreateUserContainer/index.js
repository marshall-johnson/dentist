/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  PageHeader,
  Row,
} from 'antd';

import { createStudent } from '@/actions/studentActions';
import { STUDENT_ACCOUNT_TYPES } from '@/constants';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const { Option } = Select;

class CreateStudentContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        student: {
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
          newPractice: null,
        },
      },
    };
  }

  onFinish = (values) => {
    const { createStudent, history, currentUser } = this.props;

    createStudent({
      params: {
        student: {
          ...values.student,
          admin_id: currentUser.id,
        },
      },
      history,
    });
  };

  render() {
    const { initialValues } = this.state;
    const { loading } = this.props;

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
              <Col span={24}>
                <Form.Item
                  label="Practice Name"
                  name={['student', 'practiceName']}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="First Name"
                  name={['student', 'firstName']}
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
                  name={['student', 'lastName']}
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
              label="Email"
              name={['student', 'email']}
              fieldKey="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Col span={8}>
              <Form.Item
                label="Type"
                name={['student', 'account_type']}
                fieldKey="account_type"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select>
                  {STUDENT_ACCOUNT_TYPES.map((data, index) => (
                    <Option value={data.value} key={index.toString()}>
                      {data.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Form.Item
              label="Password"
              name={['student', 'password']}
              fieldKey="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

CreateStudentContainer.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  createStudent: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = ({ student, auth }) => ({
  loading: student.loading,
  currentUser: auth.currentUser,
});

export default withRouter(
  connect(mapStateToProps, {
    createStudent,
  })(CreateStudentContainer),
);
