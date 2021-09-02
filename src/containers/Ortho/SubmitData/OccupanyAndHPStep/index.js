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
        total: null,
        equipType: null,
        officeFurnitureAndRepairs: null,
        staffContinuingEducation: null,
        staffScpdTuitionOrTravel: null,
        icatExpenses: null,
        hpResourceTotal: null,
      }
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('orthoOccupanyAndHP'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoOccupanyAndHP');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`);
  }

  onFinish = data => {
    localStorage.setItem('orthoOccupanyAndHP', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`);
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div className="occupany-and-h-and-p-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Occupany & H&P"
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
              <Card title="Occupancy">
                <Form.Item
                  label="Mortgage / Rent"
                  name='mortgageOrRent'
                  fieldKey='mortgageOrRent'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Utilities"
                  name='utilities'
                  fieldKey='utilities'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Janitorial"
                  name='janitorial'
                  fieldKey='janitorial'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Repairs / Maintenance / Leasehold Improv"
                  name='repairs'
                  fieldKey='repairs'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Facilities Insurance"
                  name='facilitiesInsurance'
                  fieldKey='facilitiesInsurance'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Security System"
                  name='securitySystem'
                  fieldKey='securitySystem'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Property Tax"
                  name='propertyTax'
                  fieldKey='propertyTax'
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value) ?
                          Promise.resolve() :
                          Promise.reject(new Error('Property Tax is not a valid number'))
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name='total'
                  fieldKey='total'
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
              <Card title="Human & Physical Resource Development">
                <Form.Item
                  label="Office Furniture, Clinical Computers"
                  name='officeFurnitureAndRepairs'
                  fieldKey='officeFurnitureAndRepairs'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Equip Loan / Equip Maintenance"
                  name='equipType'
                  fieldKey='equipType'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="ICAT Expenses"
                  name='icatExpenses'
                  fieldKey='icatExpenses'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Staff Other CE Expenses"
                  name='staffContinuingEducation'
                  fieldKey='staffContinuingEducation'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Staff SCPD tuition/travel/lodge/meals"
                  name='staffScpdTuitionOrTravel'
                  fieldKey='staffScpdTuitionOrTravel'
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Total"
                  name='hpResourceTotal'
                  fieldKey='hpResourceTotal'
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
  history: PropTypes.object,
};

export default withRouter(OccupanyAndHPStep);
