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
  InputNumber,
} from 'antd';
import camelcaseKeys from 'camelcase-keys';

import AppConfig from '@/constants/AppConfig';
import { decFormatter, decFormatterTotal } from '@/utils/helpers';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class OccupanyAndHPStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        mortgageOrRent: null,
        utilities: null,
        janitorial: null,
        repairs: null,
        facilitiesInsurance: null,
        securitySystem: null,
        propertyTax: null,
        total: 0,
        equipType: null,
        officeFurnitureAndRepairs: null,
        staffContinuingEducation: null,
        staffScpdTuitionOrTravel: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryOccupanyAndHP'));

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryOccupanyAndHP');
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

  handleTotal = (_, value) => {
    const total = Object.keys(value).reduce((previousValue, currentKey) => {
      if (
        currentKey === 'mortgageOrRent' ||
        currentKey === 'utilities' ||
        currentKey === 'janitorial' ||
        currentKey === 'repairs' ||
        currentKey === 'facilitiesInsurance' ||
        currentKey === 'securitySystem' ||
        currentKey === 'propertyTax'
      ) {
        return previousValue + (Number(value[currentKey]) || 0);
      }

      return previousValue;
    }, 0);
    const totalHp = Object.keys(value).reduce((previousValue, currentKey) => {
      if (
        currentKey === 'officeFurnitureAndRepairs' ||
        currentKey === 'equipType' ||
        currentKey === 'icatExpenses' ||
        currentKey === 'staffContinuingEducation' ||
        currentKey === 'staffScpdTuitionOrTravel'
      ) {
        return previousValue + (Number(value[currentKey]) || 0);
      }

      return previousValue;
    }, 0);
    this.formRef.current.setFieldsValue({
      total,
      totalHp,
    });
  };

  onBack = () => {
    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryOccupanyAndHP', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}${location.search}`,
    );
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

    return (
      <div className="occupany-and-h-and-p-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Occupany & H&P"
        />
        <Divider />

        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={initialValues}
          onValuesChange={this.handleTotal}
          validateMessages={validateMessages}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Occupancy">
                <Form.Item
                  label="Mortgage / Rent"
                  name="mortgageOrRent"
                  fieldKey="mortgageOrRent"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Utilities"
                  name="utilities"
                  fieldKey="utilities"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Janitorial"
                  name="janitorial"
                  fieldKey="janitorial"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Repairs / Maintenance / Leasehold Improv"
                  name="repairs"
                  fieldKey="repairs"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Facilities Insurance"
                  name="facilitiesInsurance"
                  fieldKey="facilitiesInsurance"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Security System"
                  name="securitySystem"
                  fieldKey="securitySystem"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Property Tax"
                  name="propertyTax"
                  fieldKey="propertyTax"
                  rules={[
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Property Tax is not a valid number'),
                            ),
                    },
                  ]}
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item label="Total" name="total" fieldKey="total">
                  <InputNumber
                    formatter={(value) => decFormatterTotal(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Human & Physical Resource Development">
                <Form.Item
                  label="Dental Equip Loan / Equip Maintenance"
                  name="equipType"
                  fieldKey="equipType"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Office Furniture and Repairs"
                  name="officeFurnitureAndRepairs"
                  fieldKey="officeFurnitureAndRepairs"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Staff Continuing Education"
                  name="staffContinuingEducation"
                  fieldKey="staffContinuingEducation"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Staff SCPD Tuition / Travel"
                  name="staffScpdTuitionOrTravel"
                  fieldKey="staffScpdTuitionOrTravel"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item label="Total" name="totalHp" fieldKey="totalHp">
                  <InputNumber
                    formatter={(value) => decFormatterTotal(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
              </Card>
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
                    occupancy_and_hp: this.formRef.current.getFieldValue(),
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

OccupanyAndHPStep.propTypes = {
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

export default withRouter(OccupanyAndHPStep);
