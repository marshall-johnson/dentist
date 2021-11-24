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
import camelcaseKeys from 'camelcase-keys';
import queryString from 'query-string';

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

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistrySolvencySavingsROIFunds');
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
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_SALARY}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem(
      'dentistrySolvencySavingsROIFunds',
      JSON.stringify(data),
    );

    const {
      match: {
        params: { studentId },
      },
      history,
      dentistrySubmitData,
      location,
    } = this.props;

    const query = queryString.parse(location.search);

    const dentistryDoctorProduction = JSON.parse(
      localStorage.getItem('dentistryDoctorProduction'),
    );
    const dentistryHygienistProduction = JSON.parse(
      localStorage.getItem('dentistryHygienistProduction'),
    );

    const params = {
      dentistry: {
        month: query.month,
        year: query.year,
        doctorProduction: dentistryDoctorProduction
          ? dentistryDoctorProduction.doctorProduction
          : [],
        hygienistProduction: dentistryHygienistProduction
          ? dentistryHygienistProduction.hygienistProduction
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

    dentistrySubmitData(studentId, {
      params,
      history,
    });
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

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
                    solvency_savings_roi_funds:
                      this.formRef.current.getFieldValue(),
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
              {!data && (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
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
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  data: PropTypes.array,
  updateData: PropTypes.func,
};

export default withRouter(
  connect(null, {
    dentistrySubmitData,
  })(SolvencySavingsROIFundsStep),
);
