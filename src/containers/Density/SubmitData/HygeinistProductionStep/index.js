import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { forEach } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
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

import api from '@/api';
import DebounceSelect from '@/components/DebounceSelect';
import AppConfig from '@/constants/AppConfig';
import { fetchHygienists } from '@/actions/hygienistActions';
import { decFormatter, decFormatterTotal } from '@/utils/helpers';

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
        hygienistProduction: [
          {
            hygienistId: null,
            production: null,
            discount: null,
            netProduction: null,
            hoursAvailable: null,
            hoursScheduled: null,
            hoursCancelled: null,
            hoursRecoverd: null,
            patientVisits: null,
            productSales: null,
          },
        ],
      },
    };
  }

  componentDidMount() {
    const { fetchHygienists, page, data } = this.props;
    const formatData = data?.map((record) => camelcaseKeys(record));

    const formData = JSON.parse(
      localStorage.getItem('dentistryHygienistProduction'),
    );

    fetchHygienists({ page });

    if (formatData) {
      this.formRef.current.setFieldsValue({
        hygienistProduction: formatData,
      });
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryHygienistProduction');
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      const formatData = data?.map((record) => camelcaseKeys(record));

      if (formatData) {
        this.formRef.current.setFieldsValue({
          hygienistProduction: formatData,
        });
      }
    }
  }

  fetchHygienistList = (keyword) =>
    api
      .get('/api/v1/hygienists', { params: { search: keyword } })
      .then(({ data: response }) => camelcaseKeys(response, { deep: true }))
      .then(({ result }) =>
        result.data.map((item) => ({
          label: item.attributes.fullname,
          value: item.id,
        })),
      )
      .catch((error) => {
        throw error;
      });

  optionInit = () => {
    const { items } = this.props;

    const data = [];

    forEach(items, (item) => {
      const { fullname } = item.attributes;

      data.push({
        label: fullname,
        value: item.id,
      });
    });

    return data;
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryHygienistProduction', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.COLLECTIONS}${location.search}`,
    );
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
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}${location.search}`,
    );
  };

  getValueOfKey = (key) =>
    this.formRef.current.getFieldValue().hygienistProduction[key];

  setProduction = (fieldKey, value) => {
    const data = this.formRef.current.getFieldValue('hygienistProduction');

    const updateData = data.map((doctor, index) => {
      if (index === fieldKey) {
        return {
          ...doctor,
          netProduction:
            Number(value) - Number(this.getValueOfKey(fieldKey)?.discount || 0),
        };
      }

      return doctor;
    });

    this.formRef.current.setFieldsValue({ hygienistProduction: updateData });
  };

  setDiscount = (fieldKey, value) => {
    const data = this.formRef.current.getFieldValue('hygienistProduction');

    const updateData = data.map((doctor, index) => {
      if (index === fieldKey) {
        return {
          ...doctor,
          netProduction:
            Number(this.getValueOfKey(fieldKey)?.production || 0) -
            Number(value),
        };
      }

      return doctor;
    });

    this.formRef.current.setFieldsValue({ hygienistProduction: updateData });
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

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
            <Form.List name="hygienistProduction">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col span={16} key={field.key}>
                      <Form.Item
                        label="Hygenist Name"
                        tooltip="Please place all hygiene names on your master copy so that each
hygienist’s statistics are placed in the same column every month."
                        name={[field.name, 'hygienistId']}
                        fieldKey={[field.fieldKey, 'hygienistId']}
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
                      >
                        <InputNumber
                          formatter={(value) => decFormatter(value)}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={(value) =>
                            this.setProduction(field.key, value)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label="Discounts"
                        name={[field.name, 'discount']}
                        fieldKey={[field.fieldKey, 'discount']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Discounts is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <InputNumber
                          formatter={(value) => decFormatter(value)}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={(value) =>
                            this.setDiscount(field.key, value)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label="Net Production"
                        name={[field.name, 'netProduction']}
                        fieldKey={[field.fieldKey, 'netProduction']}
                      >
                        <InputNumber
                          formatter={(value) => decFormatterTotal(value)}
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          disabled
                        />
                      </Form.Item>
                      <Form.Item
                        label="Hygiene Hours Available"
                        tooltip="Total hours available for patient care in the month. (Staff
meeting times, administrative time, or lunch breaks are not included). Available hours
should be determined at the END of each day."
                        name={[field.name, 'hoursAvailable']}
                        fieldKey={[field.fieldKey, 'hoursAvailable']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Hours Available is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hygiene Hours Scheduled"
                        tooltip="Report the total hours scheduled with patients. Determine
“Scheduled hours” at the END of each day."
                        name={[field.name, 'hoursScheduled']}
                        fieldKey={[field.fieldKey, 'hoursScheduled']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Hours Scheduled is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hygiene Hours Cancelled"
                        tooltip="Report the total hours scheduled with patients.
Determine “Scheduled hours” at the END of the day"
                        name={[field.name, 'hoursCancelled']}
                        fieldKey={[field.fieldKey, 'hoursCancelled']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Hours Cancelled is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Hygiene Hours Recoverd"
                        tooltip="Total number of cancelled hours that were refilled with
other patients each day."
                        name={[field.name, 'hoursRecoverd']}
                        fieldKey={[field.fieldKey, 'hoursRecoverd']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Hours Recoverd is not a valid number',
                                    ),
                                  ),
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
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      '# of Patient Visits is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Product Sales"
                        tooltip="Total dollar amount of products sold to patients by each
hygienist."
                        name={[field.name, 'productSales']}
                        fieldKey={[field.fieldKey, 'productSales']}
                      >
                        <Input />
                      </Form.Item>

                      {field.key > 0 && (
                        <Form.Item style={{ textAlign: 'right' }}>
                          <Button
                            onClick={() => remove(field.name)}
                            type="danger"
                          >
                            Remove
                          </Button>
                        </Form.Item>
                      )}
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
                onClick={() => updateData(this.formRef.current.getFieldValue())}
              >
                Update
              </Button>
            </div>
          )}

          <Row>
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

HygeinistProductionStep.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  fetchHygienists: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  history: PropTypes.object,
  data: PropTypes.array,
  updateData: PropTypes.func,
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
