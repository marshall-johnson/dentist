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

class LaboratoryStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        smileCost: null,
        alignerCost: null,
        labFabricatedAppliances: null,
        labSupplies: null,
        total: null,
      }
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('orthoLaboratory'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoLaboratory');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`);
  }

  onFinish = data => {
    localStorage.setItem('orthoLaboratory', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`);
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div className="laboratory">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Laboratory"
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
              <Form.Item
                label="Sure Smile Costs"
                name="smileCost"
                fieldKey="smileCost"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Aligners & Aligner Cost"
                name="alignerCost"
                fieldKey="alignerCost"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lab Fabricated Appliances & Retainers"
                name="labFabricatedAppliances"
                fieldKey="labFabricatedAppliances"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Lab Supplies"
                name="labSupplies"
                fieldKey="labSupplies"
                rules={[
                  {
                    required: true,
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

LaboratoryStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LaboratoryStep);
