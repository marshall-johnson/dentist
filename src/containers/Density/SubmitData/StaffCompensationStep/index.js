import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Card, Input, Button, Divider, PageHeader } from 'antd';

import AppConfig from '@/constants/AppConfig';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class StaffCompensationStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        assistants: {
          grossSalary: null,
          employerMatching: null,
          futaSuta: null,
          medicalInsurance: null,
          pensionProfitSharing: null,
          bonus: null,
          otherBenefit: null,
          workComp: null,
        },
        administrative: {
          grossSalary: null,
          employerMatching: null,
          futaSuta: null,
          medicalInsurance: null,
          pensionProfitSharing: null,
          bonus: null,
          otherBenefit: null,
        },
        hygiene: {
          grossSalary: null,
          employerMatching: null,
          futaSuta: null,
          medicalInsurance: null,
          pensionProfitSharing: null,
          bonus: null,
          otherBenefit: null,
        },
        hygieneAssistant: {
          grossSalary: null,
          employerMatching: null,
          futaSuta: null,
          medicalInsurance: null,
          pensionProfitSharing: null,
          bonus: null,
          otherBenefit: null,
        },
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(
      localStorage.getItem('dentistryStaffCompensation'),
    );

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryStaffCompensation');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryStaffCompensation', JSON.stringify(data));

    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`,
    );
  };

  render() {
    const { initialValues } = this.state;

    return (
      <div className="staff-compensation-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Staff Compensation"
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
            <Col span={6}>
              <Card title="Assistants">
                <Form.Item
                  label="Gross Salary"
                  name={['assistants', 'grossSalary']}
                  fieldKey={['assistants', 'grossSalary']}
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
                  label="Employer Matching SocSec, Medicare"
                  name={['assistants', 'employerMatching']}
                  fieldKey={['assistants', 'employerMatching']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="FUTA, SUTA"
                  name={['assistants', 'futaSuta']}
                  fieldKey={['assistants', 'futaSuta']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Medical Insurance"
                  name={['assistants', 'medicalInsurance']}
                  fieldKey={['assistants', 'medicalInsurance']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pension / Profit Sharing"
                  name={['assistants', 'pensionProfitSharing']}
                  fieldKey={['assistants', 'pensionProfitSharing']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bonus"
                  name={['assistants', 'bonus']}
                  fieldKey={['assistants', 'bonus']}
                  rules={[
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Bonus is not a valid number'),
                            ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other Benefit"
                  name={['assistants', 'otherBenefit']}
                  fieldKey={['assistants', 'otherBenefit']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Work Comp - all"
                  name={['assistants', 'workComp']}
                  fieldKey={['assistants', 'workComp']}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Administrative">
                <Form.Item
                  label="Gross Salary"
                  name={['administrative', 'grossSalary']}
                  fieldKey={['administrative', 'grossSalary']}
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
                  label="Employer Matching SocSec, Medicare"
                  name={['administrative', 'employerMatching']}
                  fieldKey={['administrative', 'employerMatching']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="FUTA, SUTA"
                  name={['administrative', 'futaSuta']}
                  fieldKey={['administrative', 'futaSuta']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Medical Insurance"
                  name={['administrative', 'medicalInsurance']}
                  fieldKey={['administrative', 'medicalInsurance']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pension / Profit Sharing"
                  name={['administrative', 'pensionProfitSharing']}
                  fieldKey={['administrative', 'pensionProfitSharing']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bonus"
                  name={['administrative', 'bonus']}
                  fieldKey={['administrative', 'bonus']}
                  rules={[
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Bonus is not a valid number'),
                            ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other Benefit"
                  name={['administrative', 'otherBenefit']}
                  fieldKey={['administrative', 'otherBenefit']}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Hygiene">
                <Form.Item
                  label="Gross Salary"
                  name={['hygiene', 'grossSalary']}
                  fieldKey={['hygiene', 'grossSalary']}
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
                  label="Employer Matching SocSec, Medicare"
                  name={['hygiene', 'employerMatching']}
                  fieldKey={['hygiene', 'employerMatching']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="FUTA, SUTA"
                  name={['hygiene', 'futaSuta']}
                  fieldKey={['hygiene', 'futaSuta']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Medical Insurance"
                  name={['hygiene', 'medicalInsurance']}
                  fieldKey={['hygiene', 'medicalInsurance']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pension / Profit Sharing"
                  name={['hygiene', 'pensionProfitSharing']}
                  fieldKey={['hygiene', 'pensionProfitSharing']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bonus"
                  name={['hygiene', 'bonus']}
                  fieldKey={['hygiene', 'bonus']}
                  rules={[
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Bonus is not a valid number'),
                            ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other Benefit"
                  name={['hygiene', 'otherBenefit']}
                  fieldKey={['hygiene', 'otherBenefit']}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Hygiene Assistant">
                <Form.Item
                  label="Gross Salary"
                  name={['hygieneAssistant', 'grossSalary']}
                  fieldKey={['hygieneAssistant', 'grossSalary']}
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
                  label="Employer Matching SocSec, Medicare"
                  name={['hygieneAssistant', 'employerMatching']}
                  fieldKey={['hygieneAssistant', 'employerMatching']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="FUTA, SUTA"
                  name={['hygieneAssistant', 'futaSuta']}
                  fieldKey={['hygieneAssistant', 'futaSuta']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Medical Insurance"
                  name={['hygieneAssistant', 'medicalInsurance']}
                  fieldKey={['hygieneAssistant', 'medicalInsurance']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pension / Profit Sharing"
                  name={['hygieneAssistant', 'pensionProfitSharing']}
                  fieldKey={['hygieneAssistant', 'pensionProfitSharing']}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bonus"
                  name={['hygieneAssistant', 'bonus']}
                  fieldKey={['hygieneAssistant', 'bonus']}
                  rules={[
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Bonus is not a valid number'),
                            ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other Benefit"
                  name={['hygieneAssistant', 'otherBenefit']}
                  fieldKey={['hygieneAssistant', 'otherBenefit']}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
          </Row>

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

StaffCompensationStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(StaffCompensationStep);
