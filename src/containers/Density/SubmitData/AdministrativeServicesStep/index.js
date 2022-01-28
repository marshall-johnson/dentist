import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  PageHeader,
  InputNumber,
} from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import camelcaseKeys from 'camelcase-keys';

import AppConfig from '@/constants/AppConfig';
import { parseInt } from 'lodash';
import { decFormatter, decFormatterTotal } from '@/utils/helpers';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class AdministrativeServicesStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        administrativeOfficeSupplies: null,
        bankCcServicesCharges: null,
        businessEquipmentPurchases: null,
        businessEquipmentRepair: null,
        collectionCost: null,
        dues: null,
        laundryOrTowelServices: null,
        prof: null,
        licenses: null,
        crmSoftware: null,
        malpracticeInsurance: null,
        other: null,
        overheadInsurance: null,
        cellPhone: null,
        payrollServicesFee: null,
        postageAndFreight: null,
        subscriptions: null,
        personalPropertyTaxes: null,
        telephone: null,
        uniforms: null,
        mealAndEntertainment: null,
        printing: null,
        total: 0,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(
      localStorage.getItem('dentistryAdministrativeServices'),
    );

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryAdministrativeServices');
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
      if (currentKey !== 'total') {
        return previousValue + (Number(value[currentKey]) || 0);
      }

      return previousValue;
    }, 0);
    this.formRef.current.setFieldsValue({
      total,
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
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.LABORTORY}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem(
      'dentistryAdministrativeServices',
      JSON.stringify(data),
    );

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

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

    return (
      <div className="administrative-services-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Administrative Services"
        />
        <Divider />

        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
          onValuesChange={this.handleTotal}
        >
          <Row gutter={48}>
            <Col span={12}>
              <Form.Item
                label="Administrative Office Supplies"
                name="administrativeOfficeSupplies"
                fieldKey="administrativeOfficeSupplies"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Bank & CC Services Charges"
                name="bankCcServicesCharges"
                fieldKey="bankCcServicesCharges"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Business Equipment Purchases"
                name="businessEquipmentPurchases"
                fieldKey="businessEquipmentPurchases"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Business Equipment Repair / Main"
                name="businessEquipmentRepair"
                fieldKey="businessEquipmentRepair"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Collection Cost"
                name="collectionCost"
                fieldKey="collectionCost"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Dues" name="dues" fieldKey="dues">
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Meal and Entertainment"
                name="mealAndEntertainment"
                fieldKey="mealAndEntertainment"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Printing" name="printing" fieldKey="printing">
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Laundry / Towel Services"
                name="laundryOrTowelServices"
                fieldKey="laundryOrTowelServices"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Prof fees / Legal / Acct"
                name="prof"
                fieldKey="prof"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Licenses" name="licenses" fieldKey="licenses">
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="CRM Software"
                name="crmSoftware"
                fieldKey="crmSoftware"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Malpractice Insurance"
                name="malpracticeInsurance"
                fieldKey="malpracticeInsurance"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Other" name="other" fieldKey="other">
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Overhead Insurance"
                name="overheadInsurance"
                fieldKey="overheadInsurance"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Cell Phone"
                name="cellPhone"
                fieldKey="cellPhone"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Payroll Services Fee"
                name="payrollServicesFee"
                fieldKey="payrollServicesFee"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Payroll Services Fee is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Postage and Freight"
                name="postageAndFreight"
                fieldKey="postageAndFreight"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Subscriptions"
                name="subscriptions"
                fieldKey="subscriptions"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Taxes (Personal Property OR Other)"
                name="personalPropertyTaxes"
                fieldKey="personalPropertyTaxes"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Taxes (Personal Property OR Other) is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Telephone"
                name="telephone"
                fieldKey="telephone"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Uniforms" name="uniforms" fieldKey="uniforms">
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                  formatter={(value) => decFormatterTotal(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  disabled
                />
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
                    administrative_services:
                      this.formRef.current.getFieldValue(),
                  })
                }
              >
                Update
              </Button>
            </div>
          )}

          <Row>
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

AdministrativeServicesStep.propTypes = {
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

export default withRouter(AdministrativeServicesStep);
