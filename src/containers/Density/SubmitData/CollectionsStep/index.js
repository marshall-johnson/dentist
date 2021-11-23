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

import AppConfig from '@/constants/AppConfig';
import camelcaseKeys from 'camelcase-keys';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const regex0To30 = new RegExp(/^([0-9]|[12]\d|3[0])$/);
const regex31To60 = new RegExp(/^(3[1-9]|[45][0-9]|6[0])$/);
const regex61To90 = new RegExp(/^(6[1-9]|[78][0-9]|9[0])$/);
const regex91ToMore = new RegExp(/^(9[1-9]|\d{3,})$/);

class CollectionsStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        totalGross: null,
        refunds: null,
        totalNet: null,
        collectionsAtTos: null,
        zeroToThirtyDays: null,
        thirtyOneToSixtyDays: null,
        sixtyOneToNinetyDays: null,
        ninetyOneToMoreDays: null,
        total: null,
        unpaidBillsDueThisMonth: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryCollections'));
    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryCollections');
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
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.HYGEINIST_PRODUCTION}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryCollections', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}${location.search}`,
    );
  };

  getValueOfKey = (key) =>
    this.formRef.current.getFieldValue().doctorProduction[key];

  setTotalGross = (value) => {
    this.formRef.current.setFieldsValue({
      totalNet:
        Number(value) - Number(this.formRef.current.getFieldValue('refunds')),
    });
  };

  setTotalRefund = (value) => {
    this.formRef.current.setFieldsValue({
      totalNet:
        Number(this.formRef.current.getFieldValue('totalGross')) -
        Number(value),
    });
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

    return (
      <div className="collection-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Collections"
        />
        <Divider />

        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Form.Item
                label="Total Gross Collection"
                tooltip="Total dollars collected for the entire practice in the month."
                name="totalGross"
                fieldKey="totalGross"
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={(value) => this.setTotalGross(value)}
                />
              </Form.Item>
              <Form.Item
                label="Refunds to Patients or Insurance Companies"
                tooltip="Only refunds to patients or refunds to insurance companies are
considered collection adjustments."
                name="refunds"
                fieldKey="refunds"
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={(value) => this.setTotalRefund(value)}
                />
              </Form.Item>
              <Form.Item
                label="Total Net Collections"
                tooltip="Total dollars gross collections minus the collection adjustments.
There is a formula in this cell so the spreadsheet will automatically compute this."
                name="totalNet"
                fieldKey="totalNet"
              >
                <Input prefix="$" disabled />
              </Form.Item>
              <Form.Item
                label="Collections at Time of Service"
                name="collectionsAtTos"
                tooltip="Revenue collected from patients at their appointment"
                fieldKey="collectionsAtTos"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <h3 className="ant-form-text">Accounts Recievables</h3>
              <Form.Item
                label="0 to 30 Days"
                name="zeroToThirtyDays"
                fieldKey="zeroToThirtyDays"
                rules={[
                  {
                    pattern: regex0To30,
                    message: 'must be between 0 and 30',
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('0 to 30 Days is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="31 to 60 Days"
                name="thirtyOneToSixtyDays"
                fieldKey="thirtyOneToSixtyDays"
                rules={[
                  {
                    pattern: regex31To60,
                    message: 'must be between 31 and 60',
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('31 to 60 Days is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="61 to 90 Days"
                name="sixtyOneToNinetyDays"
                fieldKey="sixtyOneToNinetyDays"
                rules={[
                  {
                    pattern: regex61To90,
                    message: 'must be between 61 and 90',
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('61 to 90 Days is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="91+ Days"
                name="ninetyOneToMoreDays"
                fieldKey="ninetyOneToMoreDays"
                rules={[
                  {
                    pattern: regex91ToMore,
                    message: 'cannot be less than 91',
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('91+ Days is not a valid number'),
                          ),
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
              <Form.Item
                label="Unpaid Bills Due This Month"
                name="unpaidBillsDueThisMonth"
                fieldKey="unpaidBillsDueThisMonth"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Unpaid Bills Due This Month is not a valid number',
                            ),
                          ),
                  },
                ]}
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
                    collections: this.formRef.current.getFieldValue(),
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

CollectionsStep.propTypes = {
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

export default withRouter(CollectionsStep);
