import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Divider, PageHeader } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import AppConfig from '@/constants/AppConfig';

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
        total: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(
      localStorage.getItem('dentistryAdministrativeServices'),
    );

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryAdministrativeServices');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.LABORTORY}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem(
      'dentistryAdministrativeServices',
      JSON.stringify(data),
    );

    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_SALARY}`,
    );
  };

  render() {
    const { initialValues } = this.state;

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
        >
          <Row gutter={48}>
            <Col span={12}>
              <Form.Item
                label="Administrative Office Supplies"
                name="administrativeOfficeSupplies"
                fieldKey="administrativeOfficeSupplies"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Bank & CC Services Charges"
                name="bankCcServicesCharges"
                fieldKey="bankCcServicesCharges"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Business Equipment Purchases"
                name="businessEquipmentPurchases"
                fieldKey="businessEquipmentPurchases"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Business Equipment Repair / Main"
                name="businessEquipmentRepair"
                fieldKey="businessEquipmentRepair"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Collection Cost"
                name="collectionCost"
                fieldKey="collectionCost"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Dues" name="dues" fieldKey="dues">
                <Input />
              </Form.Item>
              <Form.Item
                label="Laundry / Towel Services"
                name="laundryOrTowelServices"
                fieldKey="laundryOrTowelServices"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Prof fees / Legal / Acct"
                name="prof"
                fieldKey="prof"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Licenses" name="licenses" fieldKey="licenses">
                <Input />
              </Form.Item>
              <Form.Item
                label="CRM Software"
                name="crmSoftware"
                fieldKey="crmSoftware"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Malpractice Insurance"
                name="malpracticeInsurance"
                fieldKey="malpracticeInsurance"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Other" name="other" fieldKey="other">
                <Input />
              </Form.Item>
              <Form.Item
                label="Overhead Insurance"
                name="overheadInsurance"
                fieldKey="overheadInsurance"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Cell Phone"
                name="cellPhone"
                fieldKey="cellPhone"
              >
                <PhoneInput country="us" inputStyle={{ width: '100%' }} />
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
                <Input />
              </Form.Item>
              <Form.Item
                label="Postage and Freight"
                name="postageAndFreight"
                fieldKey="postageAndFreight"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Subscriptions"
                name="subscriptions"
                fieldKey="subscriptions"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Personal Property Taxes"
                name="personalPropertyTaxes"
                fieldKey="personalPropertyTaxes"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Personal Property Taxes is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Telephone"
                name="telephone"
                fieldKey="telephone"
              >
                <PhoneInput country="us" inputStyle={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Uniforms" name="uniforms" fieldKey="uniforms">
                <Input />
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
                <Input />
              </Form.Item>
            </Col>
          </Row>

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
  history: PropTypes.object,
};

export default withRouter(AdministrativeServicesStep);
