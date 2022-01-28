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
  InputNumber,
} from 'antd';
import camelcaseKeys from 'camelcase-keys';
import AppConfig from '@/constants/AppConfig';
import { decFormatter, decFormatterTotal } from '@/utils/helpers';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class SuppliesAndMarketingStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        supplies: null,
        hygieneSupplies: null,
        sharedSupplies: null,
        hygieneProduct: null,
        website: null,
        marketing: null,
        advertising: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(
      localStorage.getItem('dentistrySuppliesAndMarketing'),
    );

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistrySuppliesAndMarketing');
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      const formatData = camelcaseKeys(data);

      if (formatData) {
        this.formRef.current.setFieldsValue(formatData);
      }
    }
  }

  onBack = () => {
    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.OCCUPANY_AND_H_P}${location.search}`,
    );
  };

  handleTotal = (_, value) => {
    const totalH = Object.keys(value).reduce((previousValue, currentKey) => {
      if (
        currentKey === 'supplies' ||
        currentKey === 'hygieneSupplies' ||
        currentKey === 'sharedSupplies' ||
        currentKey === 'hygieneProduct'
      ) {
        return previousValue + (Number(value[currentKey]) || 0);
      }
      return previousValue;
    }, 0);
    const totalM = Object.keys(value).reduce((previousValue, currentKey) => {
      if (
        currentKey === 'advertising' ||
        currentKey === 'website' ||
        currentKey === 'marketing'
      ) {
        return previousValue + (Number(value[currentKey]) || 0);
      }
      return previousValue;
    }, 0);
    this.formRef.current.setFieldsValue({
      totalH,
      totalM,
    });
  };

  onFinish = (data) => {
    localStorage.setItem('dentistrySuppliesAndMarketing', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.LABORTORY}${location.search}`,
    );
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

    return (
      <div className="supplies-and-marketing-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Supplies & Marketing"
        />
        <Divider />

        <Form
          ref={this.formRef}
          layout="vertical"
          onValuesChange={this.handleTotal}
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Card title="Supplies / Raw Materials">
                <Form.Item
                  label="Dr. Supplies"
                  name="supplies"
                  fieldKey="supplies"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>

                <Form.Item
                  label="Hygiene Supplies"
                  name="hygieneSupplies"
                  fieldKey="hygieneSupplies"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Shared Supplies"
                  name="sharedSupplies"
                  fieldKey="sharedSupplies"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Hygiene Product"
                  name="hygieneProduct"
                  fieldKey="hygieneProduct"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item label="Total" name="totalH" fieldKey="totalH">
                  <InputNumber
                    formatter={(value) => decFormatterTotal(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Marketing">
                <Form.Item label="Website" name="website" fieldKey="website">
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Marketing"
                  name="marketing"
                  fieldKey="marketing"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item
                  label="Advertising"
                  name="advertising"
                  fieldKey="advertising"
                >
                  <InputNumber
                    formatter={(value) => decFormatter(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item label="Total" name="totalM" fieldKey="totalM">
                  <InputNumber
                    formatter={(value) => decFormatterTotal(value)}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    disabled
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          {data && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                style={{
                  marginRight: '8px',
                  marginBottom: '20px',
                  background: '#13AF22',
                  color: 'white',
                }}
                onClick={() =>
                  updateData({
                    supplies_and_marketing:
                      this.formRef.current.getFieldValue(),
                  })
                }
              >
                Update
              </Button>
            </div>
          )}

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

SuppliesAndMarketingStep.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  history: PropTypes.object,
  data: PropTypes.array,
  updateData: PropTypes.func,
};

export default withRouter(SuppliesAndMarketingStep);
