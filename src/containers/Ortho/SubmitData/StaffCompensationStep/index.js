import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Button,
  Divider,
  PageHeader,
} from 'antd';

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
      }
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('orthoStaffCompensation'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoStaffCompensation');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}`);
  }

  onFinish = data => {
    localStorage.setItem('orthoStaffCompensation', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`);
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div className="staff-compensation-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
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
            <Col span={8}>
              <Card title="Assistants (QB 6100.00)">
                <Form.Item
                  label="Gross Salary"
                  name={['assistants', 'grossSalary']}
                  fieldKey={['assistants', 'grossSalary']}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Gross Salary is not a valid number'))
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Employer Matching SocSec, Medicare"
                  name={['assistants', 'employerMatching']}
                  fieldKey={['assistants', 'employerMatching']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="FUTA, SUTA"
                  name={['assistants', 'futaSuta']}
                  fieldKey={['assistants', 'futaSuta']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Medical Insurance"
                  name={['assistants', 'medicalInsurance']}
                  fieldKey={['assistants', 'medicalInsurance']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pension / Profit Sharing"
                  name={['assistants', 'pensionProfitSharing']}
                  fieldKey={['assistants', 'pensionProfitSharing']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bonus"
                  name={['assistants', 'bonus']}
                  fieldKey={['assistants', 'bonus']}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Bonus is not a valid number'))
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other Benefit"
                  name={['assistants', 'otherBenefit']}
                  fieldKey={['assistants', 'otherBenefit']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Work Comp - all"
                  name={['assistants', 'workComp']}
                  fieldKey={['assistants', 'workComp']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Administrative (6400)">
                <Form.Item
                  label="Gross Salary"
                  name={['administrative', 'grossSalary']}
                  fieldKey={['administrative', 'grossSalary']}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Gross Salary is not a valid number'))
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Employer Matching SocSec, Medicare"
                  name={['administrative', 'employerMatching']}
                  fieldKey={['administrative', 'employerMatching']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="FUTA, SUTA"
                  name={['administrative', 'futaSuta']}
                  fieldKey={['administrative', 'futaSuta']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Medical Insurance"
                  name={['administrative', 'medicalInsurance']}
                  fieldKey={['administrative', 'medicalInsurance']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Pension / Profit Sharing"
                  name={['administrative', 'pensionProfitSharing']}
                  fieldKey={['administrative', 'pensionProfitSharing']}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bonus"
                  name={['administrative', 'bonus']}
                  fieldKey={['administrative', 'bonus']}
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Bonus is not a valid number'))
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other Benefit"
                  name={['administrative', 'otherBenefit']}
                  fieldKey={['administrative', 'otherBenefit']}
                  rules={[{ required: true }]}
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
              <Button
                type="primary"
                htmlType="submit"
              >
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
