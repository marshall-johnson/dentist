import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Divider, PageHeader } from 'antd';

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
        restoriveLab: null,
        alignersOrthoLab: null,
        implantSupplies: null,
        cerec: null,
        total: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryLaboratory'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryLaboratory');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryLaboratory', JSON.stringify(data));

    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}`,
    );
  };

  render() {
    const { initialValues } = this.state;

    return (
      <div className="labortory-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
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
                label="Restorive Lab"
                name="restoriveLab"
                fieldKey="restoriveLab"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Aligners / Ortho Lab"
                name="alignersOrthoLab"
                fieldKey="alignersOrthoLab"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Implant Supplies"
                name="implantSupplies"
                fieldKey="implantSupplies"
              >
                <Input />
              </Form.Item>
              <Form.Item label="Cerec" name="cerec" fieldKey="cerec">
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

LaboratoryStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LaboratoryStep);
