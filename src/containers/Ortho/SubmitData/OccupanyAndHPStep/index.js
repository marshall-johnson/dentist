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

class OccupanyAndHPStep extends Component {
  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`);
  }

  render() {
    return (
      <div className="occupany-and-h-and-p-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Occupany & H&P"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Occupancy">
                <Form.Item label="Mortgage / Rent">
                  <Input />
                </Form.Item>
                <Form.Item label="Utilities">
                  <Input />
                </Form.Item>
                <Form.Item label="Janitorial">
                  <Input />
                </Form.Item>
                <Form.Item label="Repairs / Maintenance / Leasehold Improv">
                  <Input />
                </Form.Item>
                <Form.Item label="Facilities Insurance">
                  <Input />
                </Form.Item>
                <Form.Item label="Security System">
                  <Input />
                </Form.Item>
                <Form.Item label="Property Tax">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Human & Physical Resource Development">
                <Form.Item label="Office Furniture, Clinical Computers">
                  <Input />
                </Form.Item>
                <Form.Item label="Equip Loan / Equip Maintenance">
                  <Input />
                </Form.Item>
                <Form.Item label="ICAT Expenses">
                  <Input />
                </Form.Item>
                <Form.Item label="Staff Other CE Expenses">
                  <Input />
                </Form.Item>
                <Form.Item label="Staff SCPD tuition/travel/lodge/meals">
                  <Input />
                </Form.Item>
                <Form.Item label="Total">
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
                href={`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`}
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

OccupanyAndHPStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(OccupanyAndHPStep);
