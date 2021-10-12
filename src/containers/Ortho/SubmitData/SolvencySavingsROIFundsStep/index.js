import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import {
  orthoSubmitData
} from '@/actions/orthoActions';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class SolvencySavingsROIFundsStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        deposit: null,
        retiringPastDueDebt: null,
        transferredOutOfSolvencyAcct: null,
        total: null,
        pension: null,
        drCe: null,
        longTermInvestments: null,
        goodwillLoanPracticePayments: null,
        scpdExpenses: null,
        roiFundTotal: null,
      }
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('orthoSolvencySavingsROIFunds'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoSolvencySavingsROIFunds');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.DOCTOR_SALARY}`);
  }

  onFinish = data => {
    localStorage.setItem('orthoSolvencySavingsROIFunds', JSON.stringify(data));

    const {
      history,
      orthoSubmitData,
    } = this.props;

    const orthoDoctorProduction = JSON.parse(localStorage.getItem('orthoDoctorProduction'));

    const params = {
      ortho: {
        doctorProduction: orthoDoctorProduction ? orthoDoctorProduction.doctorProduction : [],
        patientActivity: JSON.parse(localStorage.getItem('orthoPatientActivity')) || {},
        collections: JSON.parse(localStorage.getItem('orthoCollections')) || {},
        staffCompensation: JSON.parse(localStorage.getItem('orthoStaffCompensation')) || {},
        occupancyAndHP: JSON.parse(localStorage.getItem('orthoOccupanyAndHP')) || {},
        suppliesAndMarketing: JSON.parse(localStorage.getItem('orthoSuppliesAndMarketing')) || {},
        laboratory: JSON.parse(localStorage.getItem('orthoLaboratory')) || {},
        administrativeServices: JSON.parse(localStorage.getItem('orthoAdministrativeServices')) || {},
        doctorSalary: JSON.parse(localStorage.getItem('orthoDoctorSalary')) || {},
        solvencySavingsROIFunds: JSON.parse(localStorage.getItem('orthoSolvencySavingsROIFunds')) || {},
      },
    };

    orthoSubmitData({ params, history });
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div className="solvency-savings-roi-funds-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Solvency, Savings and ROI Funds"
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
              <Card title="Solvency / Savings">
                <Form.Item
                  label="Deposits Made"
                  name="deposit"
                  fieldKey="deposit"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Retiring Past Due Debt"
                  name="retiringPastDueDebt"
                  fieldKey="retiringPastDueDebt"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Transferred out of Solvency Acct"
                  name="transferredOutOfSolvencyAcct"
                  fieldKey="transferredOutOfSolvencyAcct"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name="total"
                  fieldKey="total"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Total is not a valid number'))
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="ROI Funds">
                <Form.Item
                  label="Dr. Pension"
                  name="pension"
                  fieldKey="pension"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Other CE"
                  name="drCe"
                  fieldKey="drCe"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Long-Term Investments"
                  name="longTermInvestments"
                  fieldKey="longTermInvestments"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Goodwill Loan Practice Payments"
                  name="goodwillLoanPracticePayments"
                  fieldKey="goodwillLoanPracticePayments"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="SCPD Expenses"
                  name="scpdExpenses"
                  fieldKey="scpdExpenses"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name="roiFundTotal"
                  fieldKey="roiFundTotal"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Total is not a valid number'))
                    },
                  ]}
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
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

SolvencySavingsROIFundsStep.propTypes = {
  history: PropTypes.object,
  orthoSubmitData: PropTypes.func,
};

export default withRouter(
  connect(null, {
    orthoSubmitData,
  })(SolvencySavingsROIFundsStep)
);
