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
// eslint-disable-next-line max-len
const urlPatternRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/);

class SuppliesAndMarketingStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        backetsBandsAdhesives: null,
        wiresLigaturesHeadgearFacebow: null,
        xRayFilm: null,
        dispoables: null,
        total: null,
        website: null,
        marketing: null,
        advertising: null,
      }
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('orthoSuppliesAndMarketing'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoSuppliesAndMarketing');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}`);
  }

  onFinish = data => {
    localStorage.setItem('orthoSuppliesAndMarketing', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.LABORTORY}`);
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div className="supplies-and-marketing-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Supplies & Marketing"
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
              <Card title="Supplies / Raw Materials">
                <Form.Item
                  label="Backets / Bands / Adhesives"
                  name="backetsBandsAdhesives"
                  fieldKey="backetsBandsAdhesives"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Wires / ligatures / headgears / facebows"
                  name="wiresLigaturesHeadgearFacebow"
                  fieldKey="wiresLigaturesHeadgearFacebow"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="X-ray Film"
                  name="xRayFilm"
                  fieldKey="xRayFilm"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Dispoables"
                  name="dispoables"
                  fieldKey="dispoables"
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
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Marketing">
                <Form.Item
                  label="Website"
                  name="website"
                  fieldKey="website"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      pattern: urlPatternRegex,
                      message: 'Website is not valid!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Marketing"
                  name="marketing"
                  fieldKey="marketing"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Advertising"
                  name="advertising"
                  fieldKey="advertising"
                  rules={[
                    {
                      required: true,
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

SuppliesAndMarketingStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SuppliesAndMarketingStep);
