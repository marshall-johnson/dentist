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

class StaffCompensationStep extends Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.PATIENT_ACTIVITY}`);
  }

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Staff Compensation"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={6}>
              <Card title="Assistants">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SocSec, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA, SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension / Profit Sharing">
                  <Input />
                </Form.Item>
                <Form.Item label="Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Other Benefit">
                  <Input />
                </Form.Item>
                <Form.Item label="Work Comp - all">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Administrative">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SocSec, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA, SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension / Profit Sharing">
                  <Input />
                </Form.Item>
                <Form.Item label="Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Other Benefit">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Hygene">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SocSec, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA, SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension / Profit Sharing">
                  <Input />
                </Form.Item>
                <Form.Item label="Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Other Benefit">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Hygiene Assistant">
                <Form.Item label="Gross Salary">
                  <Input />
                </Form.Item>
                <Form.Item label="Employer Matching SocSec, Medicare">
                  <Input />
                </Form.Item>
                <Form.Item label="FUTA, SUTA">
                  <Input />
                </Form.Item>
                <Form.Item label="Medical Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Pension / Profit Sharing">
                  <Input />
                </Form.Item>
                <Form.Item label="Bonus">
                  <Input />
                </Form.Item>
                <Form.Item label="Other Benefit">
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`}
                type="primary"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

StaffCompensationStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(StaffCompensationStep);
