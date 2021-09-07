import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  PlusOutlined
} from '@ant-design/icons';
import {
  forEach,
} from 'lodash';
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
            doctorId: null,
            production: null,
            productionAdj: null,
            netProduction: null,
            patientHoursAvailable: null,
            patientHoursScheduled: null,
            startApptsAvailable: null,
            patientVisits: null,
            apptChanges: null,
          }
        ],
      }
    };
  }

  componentDidMount() {
    const { fetchDoctors, page } = this.props;
    const formData = JSON.parse(localStorage.getItem('orthoDoctorProduction'));

    fetchDoctors({ page });

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoDoctorProduction');
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
    localStorage.setItem('orthoDoctorProduction', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.COLLECTIONS}`);
  }

  render() {
    const {
      initialValues,
    } = this.state;

    return (
      <div className="ortho-doctor-production-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
          subTitle="Doctor Production"
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
            <Form.List name="doctorProduction">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Col span={12} key={field.key}>
                      <Form.Item
                        label="Doctor Name"
                        rules={[{ required: true }]}
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
                        label="Dr. Production"
                        name={[field.name, 'production']}
                        fieldKey={[field.fieldKey, 'production']}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Production Adj"
                        name={[field.name, 'productionAdj']}
                        fieldKey={[field.fieldKey, 'productionAdj']}
                        rules={[
                          {
                            required: true,
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
                        name={[field.name, 'patientHoursAvailable']}
                        fieldKey={[field.fieldKey, 'patientHoursAvailable']}
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
                        label="Dr. Patient Hours Schedule w/ Pts"
                        name={[field.name, 'patientHoursScheduled']}
                        fieldKey={[field.fieldKey, 'patientHoursScheduled']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('Dr. Patient Hours Schedule w/ Pts is not a valid number'))
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="# of Start Appts Available"
                        name={[field.name, 'startApptsAvailable']}
                        fieldKey={[field.fieldKey, 'startApptsAvailable']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('# of Start Appts Available is not a valid number'))
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
                        label="# of Appt Changes"
                        name={[field.name, 'apptChanges']}
                        fieldKey={[field.fieldKey, 'apptChanges']}
                        rules={[
                          {
                            required: true,
                          },
                          {
                            validator: (_, value) =>
                              !isNaN(value) ?
                                Promise.resolve() :
                                Promise.reject(new Error('# of Appt Changes is not a valid number'))
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
      </div>
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
