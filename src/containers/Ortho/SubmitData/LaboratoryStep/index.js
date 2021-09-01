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

class LaboratoryStep extends Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`);
  }

  render() {
    return (
      <div className="laboratory">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Laboratory"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label="Sure Smile Costs">
                <Input />
              </Form.Item>
              <Form.Item label="Aligners & Aligner Cost">
                <Input />
              </Form.Item>
              <Form.Item label="Lab Fabricated Appliances & Retainers">
                <Input />
              </Form.Item>
              <Form.Item label="Lab Supplies">
                <Input />
              </Form.Item>
              <Form.Item label="Total">
                <Input />
              </Form.Item>
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
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`}
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

LaboratoryStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LaboratoryStep);
