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
  InputNumber,
} from 'antd';
import camelcaseKeys from 'camelcase-keys';

import AppConfig from '@/constants/AppConfig';
import { decFormatter, decFormatterTotal } from '@/utils/helpers';

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
        total: 0,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryLaboratory'));

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryLaboratory');
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

  handleTotal = (_, value) => {
    const total = Object.keys(value).reduce((previousValue, currentKey) => {
      if (currentKey !== 'total') {
        return previousValue + (Number(value[currentKey]) || 0);
      }

      return previousValue;
    }, 0);
    this.formRef.current.setFieldsValue({
      total,
    });
  };

  onBack = () => {
    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.SUPPLIES_MARKETING}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryLaboratory', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.ADMINISTRATIVE_SERVICES}${location.search}`,
    );
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

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
          onValuesChange={this.handleTotal}
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
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Aligners / Ortho Lab"
                name="alignersOrthoLab"
                fieldKey="alignersOrthoLab"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item
                label="Implant Supplies"
                name="implantSupplies"
                fieldKey="implantSupplies"
              >
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <Form.Item label="Cerec" name="cerec" fieldKey="cerec">
                <InputNumber
                  formatter={(value) => decFormatter(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
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
                <InputNumber
                  formatter={(value) => decFormatterTotal(value)}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  disabled
                />
              </Form.Item>
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
                    laboratory: this.formRef.current.getFieldValue(),
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

LaboratoryStep.propTypes = {
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

export default withRouter(LaboratoryStep);
