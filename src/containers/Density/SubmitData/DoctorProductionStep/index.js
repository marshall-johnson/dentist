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
import { fetchDoctors } from '@/actions/doctorActions';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class DoctorProductionStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        doctorProduction: [
          {
            doctorId: null,
            production: null,
            discount: null,
            netProduction: null,
            patientHoursAvailable: null,
            patientHoursScheduled: null,
            patientHoursCancelled: null,
            patientHoursRecoverd: null,
            patientVisits: null,
          },
        ],
      },
    };
  }

  componentDidMount() {
    const { fetchDoctors, page } = this.props;
    const formData = JSON.parse(
      localStorage.getItem('dentistryDoctorProduction'),
    );

    fetchDoctors({ page });

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryDoctorProduction');
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (prevProps.data !== data) {
      const formatData = data?.map((record) => camelcaseKeys(record));

      if (formatData) {
        this.formRef.current.setFieldsValue({
          doctorProduction: formatData,
        });
      }
    }
  }

  fetchDoctorList = (keyword) =>
    api
      .get('/api/v1/doctors', { params: { search: keyword } })
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
    localStorage.setItem('dentistryDoctorProduction', JSON.stringify(data));
    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;

    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.HYGEINIST_PRODUCTION}${location.search}`,
    );
  };

  getValueOfKey = (key) =>
    this.formRef.current.getFieldValue().doctorProduction[key];

  setProduction = (fieldKey, value) => {
    const data = this.formRef.current.getFieldValue('doctorProduction');

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

    this.formRef.current.setFieldsValue({ doctorProduction: updateData });
  };

  setDiscount = (fieldKey, value) => {
    const data = this.formRef.current.getFieldValue('doctorProduction');

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

    this.formRef.current.setFieldsValue({ doctorProduction: updateData });
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, history, data } = this.props;

    return (
      <div className="doctor-production-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Doctor Production"
        />

        <Divider />

        <Form
          ref={this.formRef}
          layout="horizontal"
          labelCol={{
            xl: {
              span: 10,
            },
            lg: {
              span: 8,
            },
            md: {
              span: 12,
            },
            sm: {
              span: 8,
            },
          }}
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={[32, 16]}>
            <Form.List name="doctorProduction">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col
                      key={field.key}
                      xl={{ span: 16 }}
                      lg={{ span: 24 }}
                      md={{ span: 24 }}
                    >
                      <Form.Item
                        label="Doctor Name"
                        name={[field.name, 'doctorId']}
                        fieldKey={[field.fieldKey, 'doctorId']}
                      >
                        <DebounceSelect
                          showSearch
                          optionInit={this.optionInit()}
                          placeholder="Select Doctor"
                          fetchOptions={this.fetchDoctorList}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip="Each Doctor’s individual production for the month. Gross
Production represents the dollars produced by the Doctor before any discounts. i.e. as if
every patient paid the private fee for service fee."
                        label="Dr. Production"
                        name={[field.name, 'production']}
                        fieldKey={[field.fieldKey, 'production']}
                      >
                        <InputNumber
                          formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={(value) =>
                            this.setProduction(field.key, value)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        tooltip="All adjustments made to gross production including courtesies, senior,
employee and friends and family discounts as well as insurance and Care Credit write
offs. Be sure to include only Dr. production discounts in this section. Discounts to
hygiene production belong under the hygiene adjustments colum"
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
                          formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                          onChange={(value) =>
                            this.setDiscount(field.key, value)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label="Net Production"
                        tooltip="Each doctor’s gross production for the month, minus any
adjustment discounts. There is a formula in this cell so it will automatically compute."
                        name={[field.name, 'netProduction']}
                        fieldKey={[field.fieldKey, 'netProduction']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Net Production is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input
                          style={{ color: 'black', fontWeight: 'bold' }}
                          disabled
                        />
                      </Form.Item>
                      <Form.Item
                        label="Dr Patient Hours Available"
                        tooltip="Total hours available for patient care in the month. (Staff meeting
times, administrative time, or lunch breaks are not included). Available hours should be
determined at the END of each day ."
                        name={[field.name, 'patientHoursAvailable']}
                        fieldKey={[field.fieldKey, 'patientHoursAvailable']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Dr Patient Hours Available is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Dr Patient Hours Scheduled"
                        tooltip="Report the total hours scheduled with patients.
Determine “Scheduled hours” at the END of the day. "
                        name={[field.name, 'patientHoursScheduled']}
                        fieldKey={[field.fieldKey, 'patientHoursScheduled']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Dr Patient Hours Scheduled is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Dr. Patient Hours Cancelled"
                        tooltip="Total number of hours cancelled by patients.
Establish a system to track cancellations each day."
                        name={[field.name, 'patientHoursCancelled']}
                        fieldKey={[field.fieldKey, 'patientHoursCancelled']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Dr. Patient Hours Cancelled is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Dr. Patient Hours Recoverd"
                        tooltip="Total number of cancelled hours that were refilled with other
patients each day."
                        name={[field.name, 'patientHoursRecoverd']}
                        fieldKey={[field.fieldKey, 'patientHoursRecoverd']}
                        rules={[
                          {
                            validator: (_, value) =>
                              !isNaN(value)
                                ? Promise.resolve()
                                : Promise.reject(
                                    new Error(
                                      'Dr. Patient Hours Recoverd is not a valid number',
                                    ),
                                  ),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="# of Patient Visits"
                        tooltip="Total number of patient visits on the doctor’s schedule, not including
hygiene checks. "
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
                      Add Doctor
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
                onClick={() => {
                  history.goBack();
                }}
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

DoctorProductionStep.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  fetchDoctors: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  history: PropTypes.object,
  data: PropTypes.array,
  updateData: PropTypes.func,
};

const mapStateToProps = ({ doctor, error }) => ({
  items: doctor.items,
  totalCount: doctor.totalCount,
  page: doctor.page,
  loading: doctor.loading,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchDoctors,
  })(DoctorProductionStep),
);
