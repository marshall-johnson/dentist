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

class AdministrativeServicesStep extends Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.LABORTORY}`);
  }

  render() {
    return (
      <div className="administrative-services-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Administrative Services"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={48}>
            <Col span={12}>
              <Form.Item label="Administrative Office Supplies">
                <Input />
              </Form.Item>
              <Form.Item label="Bank & CC Services Charges">
                <Input />
              </Form.Item>
              <Form.Item label="Business Equipment Purchases">
                <Input />
              </Form.Item>
              <Form.Item label="Business Equipment Repair / Main">
                <Input />
              </Form.Item>
              <Form.Item label="Collection Cost">
                <Input />
              </Form.Item>
              <Form.Item label="Dues">
                <Input />
              </Form.Item>
              <Form.Item label="Laundry / Towel Services">
                <Input />
              </Form.Item>
              <Form.Item label="Prof fees / Legal / Acct">
                <Input />
              </Form.Item>
              <Form.Item label="Licenses">
                <Input />
              </Form.Item>
              <Form.Item label="CRM Software">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Malpractice Insurance">
                <Input />
              </Form.Item>
              <Form.Item label="Other">
                <Input />
              </Form.Item>
              <Form.Item label="Overhead Insurance">
                <Input />
              </Form.Item>
              <Form.Item label="Cell Phone">
                <Input />
              </Form.Item>
              <Form.Item label="Payroll Services Fee">
                <Input />
              </Form.Item>
              <Form.Item label="Postage and Freight">
                <Input />
              </Form.Item>
              <Form.Item label="Subscriptions">
                <Input />
              </Form.Item>
              <Form.Item label="Personal Property Taxes">
                <Input />
              </Form.Item>
              <Form.Item label="Telephone">
                <Input />
              </Form.Item>
              <Form.Item label="Uniforms">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Total">
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
                href={`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_SALARY}`}
                type="primary"
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

AdministrativeServicesStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AdministrativeServicesStep);
