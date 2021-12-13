/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Space,
  Button,
  Divider,
  PageHeader,
  Typography,
  Upload,
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { omit } from 'lodash';
import { connect } from 'react-redux';
import { createProfitPotential } from '@/actions/profitPotentialAction';

const { Text } = Typography;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'is required!',
};

class ProfitAndLoss extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backTaxes: false,
    };
  }

  onSubmit = (data) => {
    const { createProfitPotential } = this.props;
    const { file } = data.document;

    const formData = new FormData();
    formData.append('data', JSON.stringify(omit(data, 'document')));
    formData.append('document', file.originFileObj);

    createProfitPotential(formData);
  };

  onChangeRadio = ({ target: { value } }) => {
    this.setState({ backTaxes: value === 'yes' });
  };

  render() {
    const { backTaxes } = this.state;

    return (
      <div className="profit-and-loss-container">
        <PageHeader
          className="site-page-header"
          title="Profit Potential Profile"
        />
        <Divider />
        <Row>
          <Col span={12}>
            <Form
              layout="vertical"
              validateMessages={validateMessages}
              onFinish={this.onSubmit}
            >
              <Form.Item
                label="Doctor(s) Salary Amount (if not shown on or listed as separate item on P & L):"
                name="salary"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error('is not a valid number')),
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Space direction="vertical" style={{ marginBottom: 10 }}>
                <Text>
                  Practice Loan Payments (All loan payments made through the
                  practice should be listed)
                </Text>
                <Text italic type="secondary">
                  Type refers to: Equipment, Building, Practice Purchase, Cars,
                  etc.
                </Text>
              </Space>
              <Form.List name="loans">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'amount']}
                          fieldKey={[fieldKey, 'amount']}
                          label="Loan Payment (Monthly):"
                          rules={[{ required: true }]}
                        >
                          <InputNumber
                            formatter={(value) =>
                              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Type"
                          name={[name, 'type']}
                          fieldKey={[fieldKey, 'type']}
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Loan Payment
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item label="Are there back taxes?">
                <Radio.Group onChange={this.onChangeRadio}>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>

              {backTaxes && (
                <Form.Item
                  label="How much?"
                  name="back_taxes_amount"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        !isNaN(value)
                          ? Promise.resolve()
                          : Promise.reject(new Error('is not a valid number')),
                    },
                  ]}
                >
                  <InputNumber
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              )}

              <Form.Item
                label="Ave. Dentist(s) Clinical Hours in the Practice:"
                name="ave_dentist_clinical_hours_practice"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error('is not a valid number')),
                  },
                ]}
              >
                <Input suffix="Monthly" type="number" />
              </Form.Item>

              <Form.Item
                label="Ave. Number of Patient Visits (Doctor(s)):"
                name="ave_number_patient_visits"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error('is not a valid number')),
                  },
                ]}
              >
                <Input suffix="Monthly" type="number" />
              </Form.Item>
              <Form.Item name="document" rules={[{ required: true }]}>
                <Upload accept=".csv,.pdf" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload 12 month P&L</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 20 }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

ProfitAndLoss.propTypes = {
  createProfitPotential: PropTypes.func,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  createProfitPotential,
})(ProfitAndLoss);
