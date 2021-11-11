import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Card, Input, Button, Divider, PageHeader } from 'antd';

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
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryOccupanyAndHP'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryOccupanyAndHP');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryOccupanyAndHP', JSON.stringify(data));

    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`,
    );
  };

  render() {
    const { initialValues } = this.state;

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
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Utilities"
                  name="utilities"
                  fieldKey="utilities"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Janitorial"
                  name="janitorial"
                  fieldKey="janitorial"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Repairs / Maintenance / Leasehold Improv"
                  name="repairs"
                  fieldKey="repairs"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Facilities Insurance"
                  name="facilitiesInsurance"
                  fieldKey="facilitiesInsurance"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Security System"
                  name="securitySystem"
                  fieldKey="securitySystem"
                >
                  <Input />
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
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Human & Physical Resource Development">
                <Form.Item
                  label="Dental Equip Loan / Equip Maintenance"
                  name="equipType"
                  fieldKey="equipType"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Office Furniture and Repairs"
                  name="officeFurnitureAndRepairs"
                  fieldKey="officeFurnitureAndRepairs"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Staff Continuing Education"
                  name="staffContinuingEducation"
                  fieldKey="staffContinuingEducation"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Staff SCPD Tuition / Travel"
                  name="staffScpdTuitionOrTravel"
                  fieldKey="staffScpdTuitionOrTravel"
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
  history: PropTypes.object,
};

export default withRouter(OccupanyAndHPStep);
