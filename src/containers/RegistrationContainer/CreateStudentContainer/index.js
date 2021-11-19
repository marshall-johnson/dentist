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
  Radio,
} from 'antd';

import PhoneInput from 'react-phone-input-2';

import { createStudent } from '@/actions/studentActions';

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
    const { createStudent, history } = this.props;

    createStudent({ params: values, history });
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
                  <Input />
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
                  name={['student', 'businessPhone']}
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
                  name={['student', 'phoneNumber']}
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
                  name={['student', 'spendingReportMonths']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name={['student', 'newPractice']}
                  fieldKey="newPractice"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value>New Practice</Radio>
                    <Radio value={false}>Existing Practice</Radio>
                  </Radio.Group>
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
};

const mapStateToProps = ({ student }) => ({
  loading: student.loading,
});

export default withRouter(
  connect(mapStateToProps, {
    createStudent,
  })(CreateStudentContainer),
);
