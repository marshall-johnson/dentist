import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  forEach,
} from 'lodash';
import {
  PlusOutlined
} from '@ant-design/icons';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  PageHeader,
} from 'antd';
import camelcaseKeys from 'camelcase-keys';

import api from '@/api';
import DebounceSelect from '@/components/DebounceSelect';
import AppConfig from '@/constants/AppConfig';
import {
  fetchHygienists,
} from '@/actions/hygienistActions';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class HygeinistProductionStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        hygenistProduction: [
          {
            name: null,
            production: null,
            discount: null,
            netProduction: null,
            hoursAvailable: null,
            hoursScheduled: null,
            hoursCancelled: null,
            hoursRecoverd: null,
            patientVisits: null,
            productSales: null,
          }
        ],
      }
    };
  }

  componentDidMount() {
    const { fetchHygienists, page } = this.props;
    const formData = JSON.parse(localStorage.getItem('dentistryHygienistProduction'));

    fetchHygienists({ page });

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryHygienistProduction');
    };
  }

  fetchHygienistList = (keyword) => api
    .get('/api/v1/hygienists', { params: { search: keyword } })
    .then(({ data: response }) => camelcaseKeys(response, { deep: true }))
    .then(({ result }) => result.data.map((item) => ({
      label: item.attributes.fullname,
      value: item.id,
    })))
    .catch((error) => {
      throw error;
    })

  optionInit = () => {
    const {
      items
    } = this.props;

    const data = [];

    forEach(items, item => {
      const {
        fullname,
      } = item.attributes;

      data.push({
        label: fullname,
        value: item.id,
      });
    });

    return data;
  }

  onFinish = data => {
    localStorage.setItem('dentistryHygienistProduction', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.COLLECTIONS}`);
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`);
  }

  render() {
    const { initialValues } = this.state;

    return (
      <div className="hygienist-production-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Hygeinist Production"
        />

        <Divider />

        <Form
          ref={this.formRef}
          layout="horizontal"
          labelCol={{ span: 9 }}
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={[32, 16]}>
            <Form.List name="hygenistProduction">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col span={12} key={field.key}>
                      <Form.Item
                        label="Hygenist Name"
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        rules={[{ required: true, message: 'Hygenist is required' }]}
                      >
                        <DebounceSelect
                          showSearch
                          optionInit={this.optionInit()}
                          placeholder="Select Hygenist"
                          fetchOptions={this.fetchDoctorList}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Production"
                        name={[field.name, 'production']}
                        fieldKey={[field.fieldKey, 'production']}
                        rules={[{ required: true, message: 'Production is required' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Discounts"
                        name={[field.name, 'discount']}
                        fieldKey={[field.fieldKey, 'discount']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Discounts is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Net Production"
                        name={[field.name, 'netProduction']}
                        fieldKey={[field.fieldKey, 'netProduction']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Net Production is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hours Available"
                        name={[field.name, 'hoursAvailable']}
                        fieldKey={[field.fieldKey, 'hoursAvailable']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Hours Available is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hours Scheduled"
                        name={[field.name, 'hoursScheduled']}
                        fieldKey={[field.fieldKey, 'hoursScheduled']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Hours Scheduled is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hours Cancelled"
                        name={[field.name, 'hoursCancelled']}
                        fieldKey={[field.fieldKey, 'hoursCancelled']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Hours Cancelled is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hours Recoverd"
                        name={[field.name, 'hoursRecoverd']}
                        fieldKey={[field.fieldKey, 'hoursRecoverd']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Hours Recoverd is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="# of Patient Visits"
                        name={[field.name, 'patientVisits']}
                        fieldKey={[field.fieldKey, 'patientVisits']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('# of Patient Visits is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Product Sales"
                        name={[field.name, 'productSales']}
                        fieldKey={[field.fieldKey, 'productSales']}
                        rules={[{ required: true, message: 'Product Sales is required' }]}
                      >
                        <Input />
                      </Form.Item>

                      {field.key > 0 &&
                        <Form.Item
                          style={{ textAlign: 'right' }}
                        >
                          <Button
                            onClick={() => remove(field.name)}
                            type="danger"
                          >
                            Remove
                          </Button>
                        </Form.Item>
                      }
                    </Col>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Hygenist
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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


HygeinistProductionStep.propTypes = {
  fetchHygienists: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  history: PropTypes.object,
};

const mapStateToProps = ({ hygienist, error }) => ({
  items: hygienist.items,
  totalCount: hygienist.totalCount,
  page: hygienist.page,
  loading: hygienist.loading,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchHygienists,
  })(HygeinistProductionStep),
);
