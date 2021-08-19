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
} from 'antd';

import AppConfig from '@/constants/AppConfig';

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
      }
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryCollections'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryCollections');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.HYGEINIST_PRODUCTION}`);
  }

  onFinish = data => {
    localStorage.setItem('dentistryCollections', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}`);
  }

  render() {
    const {
      initialValues,
    } = this.state;

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
                name="totalGross"
                fieldKey="totalGross"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Refunds to Patients or Insurance Companies"
                name="refunds"
                fieldKey="refunds"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Total Net Collections"
                name="totalNet"
                fieldKey="totalNet"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Collections at Time of Service"
                name="collectionsAtTos"
                fieldKey="collectionsAtTos"
                rules={[{ required: true }]}
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
                    required: true,
                  },
                  {
                    pattern: regex0To30,
                    message: 'must be between 0 and 30'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('0 to 30 Days is not a valid number'))
                  }
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
                    required: true,
                  },
                  {
                    pattern: regex31To60,
                    message: 'must be between 31 and 60'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('31 to 60 Days is not a valid number'))
                  }
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
                    required: true,
                  },
                  {
                    pattern: regex61To90,
                    message: 'must be between 61 and 90'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('61 to 90 Days is not a valid number'))
                  }
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
                    required: true,
                  },
                  {
                    pattern: regex91ToMore,
                    message: 'cannot be less than 91'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('91+ Days is not a valid number'))
                  }
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
              <Form.Item
                label="Unpaid Bills Due This Month"
                name="unpaidBillsDueThisMonth"
                fieldKey="unpaidBillsDueThisMonth"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('Unpaid Bills Due This Month is not a valid number'))
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

CollectionsStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(CollectionsStep);
