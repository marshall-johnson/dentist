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
  Spin,
} from 'antd';

import PhoneInput from 'react-phone-input-2';

import { fetchStudent, updateStudent } from '@/actions/studentActions';
import { STUDENT_DEGREES } from '@/constants';
import { camelCase } from 'lodash';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const { Option } = Select;

class DetailStudentContainer extends Component {
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
          email: null,
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

  componentDidMount() {
    const {
      match: {
        params: { studentId },
      },
      fetchStudent,
    } = this.props;
    fetchStudent(studentId);
  }

  componentDidUpdate(prevProps) {
    const { student } = this.props;

    if (student !== prevProps.student && this.formRef?.current && student) {
      const formatData = {};
      Object.keys(student).forEach((key) => {
        formatData[camelCase(key)] = student[key];
      });
      this.formRef.current.setFieldsValue({
        student: formatData,
      });
    }
  }

  onFinish = async (values) => {
    const {
      match: {
        params: { studentId },
      },
      updateStudent,
    } = this.props;

    await updateStudent(studentId, {
      params: values,
    });
  };

  getFieldValue = (key) => {
    if (this.formRef.current) {
      return (this.formRef.current.getFieldValue('student') || {})[key];
    }
    return null;
  };

  render() {
    const { initialValues } = this.state;
    const {
      loading,
      actionLoading,
      match: {
        params: { studentId },
      },
      history,
    } = this.props;

    return (
      <div className="registration-container">
        <PageHeader
          className="site-page-header"
          title={`Student ID: ${studentId}`}
        />
        <Divider />

        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '48%',
              left: '48%',
            }}
          >
            <Spin />
          </div>
        )}
        <Form
          layout="vertical"
          ref={this.formRef}
          style={{ opacity: loading ? 0 : 1 }}
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
                {this.getFieldValue('degree') && (
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
                )}
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

            {this.getFieldValue('address') && (
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
            )}

            <Row gutter={24}>
              <Col span={12}>
                {this.getFieldValue('city') && (
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
                )}

                {this.getFieldValue('zip') && (
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
                )}

                {this.getFieldValue('businessPhone') && (
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
                )}

                {this.getFieldValue('phoneNumber') && (
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
                )}

                {this.getFieldValue('spendingReportMonths') && (
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
                )}

                {this.getFieldValue('newPractice') && (
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
                )}
              </Col>

              <Col span={12}>
                {this.getFieldValue('state') && (
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
                )}

                {this.getFieldValue('specialty') && (
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
                )}
              </Col>
            </Row>

            <Button
              type="default"
              style={{ marginRight: 20 }}
              loading={actionLoading}
              onClick={() => history.goBack()}
            >
              Back
            </Button>

            <Button type="primary" htmlType="submit" loading={actionLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

DetailStudentContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      studentId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.object,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  updateStudent: PropTypes.func,
  fetchStudent: PropTypes.func,
  student: PropTypes.object,
};

const mapStateToProps = ({ student }) => ({
  loading: student.loading,
  student: student.item,
  actionLoading: student.actionLoading,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchStudent,
    updateStudent,
  })(DetailStudentContainer),
);
