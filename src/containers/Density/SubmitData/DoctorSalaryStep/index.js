import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Divider, PageHeader } from 'antd';
import camelcaseKeys from 'camelcase-keys';

import AppConfig from '@/constants/AppConfig';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class DoctorSalaryStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        grossSalary: null,
        employerMatch: null,
        drawsDividendsDistributions: null,
        insurancePremiums: null,
        personalExpenses: null,
        other: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryDoctorSalary'));

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryDoctorSalary');
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      const formatData = camelcaseKeys(data);

      if (formatData) {
        this.formRef.current.setFieldsValue(formatData);
      }
    }
  }

  onBack = () => {
    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryDoctorSalary', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SOLVENCY_SAVINGS_ROI_FUNDS}${location.search}`,
    );
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

    return (
      <div className="doctor-salary-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Doctor Salary"
        />
        <Divider />

        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Gross Salary"
                name="grossSalary"
                fieldKey="grossSalary"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('Gross Salary is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Employer Match for Soc Sec, Medicare"
                name="employerMatch"
                fieldKey="employerMatch"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Draws / Dividends / Distributions"
                name="drawsDividendsDistributions"
                fieldKey="drawsDividendsDistributions"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Insurance Premiums"
                name="insurancePremiums"
                fieldKey="insurancePremiums"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Insurance Premiums is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Personal Expenses Pd by Practice"
                name="personalExpenses"
                fieldKey="personalExpenses"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Personal Expenses Pd by Practice is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Other" name="other" fieldKey="other">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {data && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                style={{
                  marginRight: '8px',
                  marginBottom: '20px',
                  background: '#13AF22',
                  color: 'white',
                }}
                onClick={() =>
                  updateData({
                    doctor_salary: this.formRef.current.getFieldValue(),
                  })
                }
              >
                Update
              </Button>
            </div>
          )}

          <Row style={{ marginTop: 16 }}>
            <Col>
              <Button
                type="primary"
                style={{ marginRight: '8px' }}
                onClick={this.onBack}
              >
                Back
              </Button>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

DoctorSalaryStep.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  history: PropTypes.object,
  data: PropTypes.array,
  updateData: PropTypes.func,
};

export default withRouter(DoctorSalaryStep);
