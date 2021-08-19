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
  fetchDoctors,
} from '@/actions/doctorActions';

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
            name: null,
            drProduction: null,
            discount: null,
            netProduction: null,
            drPatientHoursAvailable: null,
            drPatientHoursScheduled: null,
            drPatientHoursCancelled: null,
            drPatientHoursRecoverd: null,
            patientVisits: null,
          }
        ],
      }
    };
  }

  componentDidMount() {
    const { fetchDoctors, page } = this.props;
    const formData = JSON.parse(localStorage.getItem('dentistryDoctorProduction'));

    fetchDoctors({ page });

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryDoctorProduction');
    };
  }

  fetchDoctorList = (keyword) => api
    .get('/api/v1/doctors', { params: { search: keyword } })
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
    localStorage.setItem('dentistryDoctorProduction', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.HYGEINIST_PRODUCTION}`);
  }

  render() {
    const {
      initialValues,
    } = this.state;

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
          labelCol={{ span: 8 }}
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={[32, 16]}>
            <Form.List name="doctorProduction">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col span={12} key={field.key}>
                      <Form.Item
                        label="Doctor Name"
                        rules={[{ required: true }]}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
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
                        label="Dr. Production"
                        name={[field.name, 'drProduction']}
                        fieldKey={[field.fieldKey, 'drProduction']}
                        rules={[{ required: true }]}
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
                        label="Dr Patient Hours Available"
                        name={[field.name, 'drPatientHoursAvailable']}
                        fieldKey={[field.fieldKey, 'drPatientHoursAvailable']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Dr Patient Hours Available is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Dr Patient Hours Scheduled"
                        name={[field.name, 'drPatientHoursScheduled']}
                        fieldKey={[field.fieldKey, 'drPatientHoursScheduled']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Dr Patient Hours Scheduled is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Dr. Patient Hours Cancelled"
                        name={[field.name, 'drPatientHoursCancelled']}
                        fieldKey={[field.fieldKey, 'drPatientHoursCancelled']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Dr. Patient Hours Cancelled is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Dr. Patient Hours Recoverd"
                        name={[field.name, 'drPatientHoursRecoverd']}
                        fieldKey={[field.fieldKey, 'drPatientHoursRecoverd']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Dr. Patient Hours Recoverd is not a valid number'))
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
                      Add Doctor
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
                href={`${AppConfig.ROUTES.STUDENTS_SUBMIT_DATA}`}
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
      </div >
    );
  }
}

DoctorProductionStep.propTypes = {
  fetchDoctors: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  history: PropTypes.object,
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
