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
  InputNumber,
} from 'antd';

import AppConfig from '@/constants/AppConfig';
import { dentistrySubmitData } from '@/actions/dentistryActions';

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
        draw: null,
        dividend: null,
        distributions: null,
        profitabilityPayForTeam: null,
        otherShortTermDebt: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(
      localStorage.getItem('dentistrySolvencySavingsROIFunds'),
    );

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistrySolvencySavingsROIFunds');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_SALARY}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem(
      'dentistrySolvencySavingsROIFunds',
      JSON.stringify(data),
    );

    const { history, dentistrySubmitData } = this.props;

    const dentistryDoctorProduction = JSON.parse(
      localStorage.getItem('dentistryDoctorProduction'),
    );
    const dentistryHygienistProduction = JSON.parse(
      localStorage.getItem('dentistryHygienistProduction'),
    );

    const params = {
      dentistry: {
        month: JSON.parse(localStorage.getItem('studentsSubmitDataDate')).month,
        year: JSON.parse(localStorage.getItem('studentsSubmitDataDate')).year,
        doctorProduction: dentistryDoctorProduction
          ? dentistryDoctorProduction.doctorProduction
          : [],
        hygienistProduction: dentistryHygienistProduction
          ? dentistryHygienistProduction.hygenistProduction
          : [],
        patientActivity:
          JSON.parse(localStorage.getItem('dentistryPatientActivity')) || {},
        collections:
          JSON.parse(localStorage.getItem('dentistryCollections')) || {},
        staffCompensation:
          JSON.parse(localStorage.getItem('dentistryStaffCompensation')) || {},
        occupancyAndHP:
          JSON.parse(localStorage.getItem('dentistryOccupanyAndHP')) || {},
        suppliesAndMarketing:
          JSON.parse(localStorage.getItem('dentistrySuppliesAndMarketing')) ||
          {},
        laboratory:
          JSON.parse(localStorage.getItem('dentistryLaboratory')) || {},
        administrativeServices:
          JSON.parse(localStorage.getItem('dentistryAdministrativeServices')) ||
          {},
        doctorSalary:
          JSON.parse(localStorage.getItem('dentistryDoctorSalary')) || {},
        solvencySavingsROIFunds:
          JSON.parse(
            localStorage.getItem('dentistrySolvencySavingsROIFunds'),
          ) || {},
      },
    };

    dentistrySubmitData(localStorage.getItem('studentsSubmitDataStudentId'), {
      params,
      history,
    });
  };

  render() {
    const { initialValues } = this.state;

    return (
      <div className="solvency-savings-roi-funds-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
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
                  tooltip="Total dollars deposited into the Power Account for
the purpose of solvency."
                  name="deposit"
                  fieldKey="deposit"
                >
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Retiring Past Due Debt"
                  tooltip="Total of checks written for
paying expenses that had balances before the Schuster Program began. Included here are:
Payments toward credit cards balances, used credit line draws, past due payables or past
due business taxes."
                  name="retiringPastDueDebt"
                  fieldKey="retiringPastDueDebt"
                >
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Transferred out of Solvency Acct"
                  tooltip="Total dollars transferred out of Solvency to
pay the current month’s expenses."
                  name="transferredOutOfSolvencyAcct"
                  fieldKey="transferredOutOfSolvencyAcct"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name="total"
                  fieldKey="total"
                  rules={[
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Total is not a valid number'),
                            ),
                    },
                  ]}
                >
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="ROI Funds">
                <Form.Item
                  label="Dr. Pension"
                  name="pension"
                  fieldKey="pension"
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Dr. CE" name="drCe" fieldKey="drCe">
                  <Input />
                </Form.Item>
                <Form.Item label="Draw" name="draw" fieldKey="draw">
                  <Input />
                </Form.Item>
                <Form.Item label="Dividend" name="dividend" fieldKey="dividend">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Distributions"
                  name="distributions"
                  fieldKey="distributions"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Profitability Pay for Team"
                  name="profitabilityPayForTeam"
                  fieldKey="profitabilityPayForTeam"
                >
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Other Short Term Debt"
                name="otherShortTermDebt"
                fieldKey="otherShortTermDebt"
              >
                <Input />
              </Form.Item>
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
  dentistrySubmitData: PropTypes.func,
};

export default withRouter(
  connect(null, {
    dentistrySubmitData,
  })(SolvencySavingsROIFundsStep),
);
