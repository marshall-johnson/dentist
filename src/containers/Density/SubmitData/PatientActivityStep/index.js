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

import AppConfig from '@/constants/AppConfig';
import camelcaseKeys from 'camelcase-keys';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class PatientActivityStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        activePatientCount: null,
        newPatient6To20: null,
        newPatient21To40: null,
        newPatient41ToMore: null,
        formalReviewOfFindings: null,
        formalReviewAppointed: null,
        formalReviewPresented: null,
        formalReviewAccepted: null,
        informalReviewOfFindings: null,
        informalReviewAppointed: null,
        informalReviewPresented: null,
        informalReviewAccepted: null,
        dueInRecareThisMonth: null,
        seen: null,
        patientsOfRecord: null,
        otherDoctors: null,
        website: null,
        signage: null,
        teamMembers: null,
        other: null,
        rpcQuadrant: null,
        rpcTeeth: null,
        perioMaintenance: null,
      },
    };
  }

  componentDidMount() {
    const formData = JSON.parse(
      localStorage.getItem('dentistryPatientActivity'),
    );

    const { data } = this.props;
    const formatData = camelcaseKeys(data);

    if (formatData) {
      this.formRef.current.setFieldsValue(formatData);
    } else {
      this.formRef.current.setFieldsValue(formData);
    }

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryPatientActivity');
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
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.COLLECTIONS}${location.search}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('dentistryPatientActivity', JSON.stringify(data));

    const {
      history,
      match: {
        params: { studentId },
      },
      location,
    } = this.props;
    history.push(
      `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}${location.search}`,
    );
  };

  render() {
    const { initialValues } = this.state;
    const { updateData, data } = this.props;

    return (
      <div className="patient-activity-container">
        <PageHeader
          className="site-page-header"
          title="Dentistry Submit Data"
          subTitle="Patient Activity"
        />
        <Divider />

        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="Active Patient Count"
                name="activePatientCount"
                tooltip="The practice probably has an active patient count
from their Baseline Report. This number should be increased each month by the number
of patients entering the practice as New Patients and reduced by the number that you are
aware have left the practice. Emergency only patients are not considered a New Patient
until they have been through your New Patient process."
                fieldKey="activePatientCount"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Active Patient Count is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="New Patient (6 to 20)"
                name="newPatient6To20"
                tooltip="Total number of New Patients for the month, according to their age
group. "
                fieldKey="newPatient6To20"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'New Patient (6 to 20) is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="New Patient (21 to 40)"
                name="newPatient21To40"
                tooltip="Total number of New Patients for the month, according to their age group. "
                fieldKey="newPatient21To40"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'New Patient (21 to 40) is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="New Patient (41+)"
                name="newPatient41ToMore"
                tooltip="Total number of New Patients for the month, according to their age group. "
                fieldKey="newPatient41ToMore"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'New Patient (41+) is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <h3 className="ant-form-text">Referred By</h3>
              <Form.Item
                label="Patients of Record"
                name="patientsOfRecord"
                tooltip="Total number of New Patients joining the practice
this month who were sent to the practice by a patient of record."
                fieldKey="patientsOfRecord"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Patients of Record is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Website" name="website" fieldKey="website">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} style={{ paddingTop: '33px' }}>
              <Form.Item
                label="Other Doctors"
                tooltip="Total number of New Patients joining the practice this
month who were sent to the practice by another healthcare professional."
                name="otherDoctors"
                fieldKey="otherDoctors"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Team Members"
                name="teamMembers"
                fieldKey="teamMembers"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('Team Members is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} style={{ paddingTop: '33px' }}>
              <Form.Item label="Signage" name="signage" fieldKey="signage">
                <Input />
              </Form.Item>

              <Form.Item label="Other" name="other" fieldKey="other">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# of Formal Review of Findings"
                tooltip="Track formal and informal presentations separately. An informal presentation is done at
the same appointment where the need was diagnosed. A formal presentation occurs when
the patient is brought back for a separate appointment for a longer discussion.

Assistants and Hygienists may be responsible for tracking the number of informal ROFs.
The formal number of ROFs may be tracked by the Administrato
                "
                name="formalReviewOfFindings"
                fieldKey="formalReviewOfFindings"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              '# of Formal Review of Findings is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="$ Presented"
                tooltip="– Track the total dollars presented for formal presentations and separately
track the total dollars presented for informal presentations."
                name="formalReviewPresented"
                fieldKey="formalReviewPresented"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('$ Presented is not a valid number'),
                          ),
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
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# appointed"
                tooltip="How many of the patients who had a formal or informal presentation
scheduled their next appointment before leaving the office? "
                name="formalReviewAppointed"
                fieldKey="formalReviewAppointed"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              '# of actual appointed is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="$ Accepted"
                tooltip="Total dollars accepted by patients from formal presentations and
separately from informal presentations. "
                name="formalReviewAccepted"
                fieldKey="formalReviewAccepted"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('$ Accepted is not a valid number'),
                          ),
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
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# of Informal Review of Findings"
                name="informalReviewOfFindings"
                fieldKey="informalReviewOfFindings"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              '# of Informal Review of Findings is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="$ Presented"
                name="informalReviewPresented"
                fieldKey="informalReviewPresented"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('$ Presented is not a valid number'),
                          ),
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
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# appointed"
                tooltip="How many of the patients who had a formal or informal presentation
scheduled their next appointment before leaving the office? "
                name="informalReviewAppointed"
                fieldKey="informalReviewAppointed"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('# appointed is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="$ Accepted"
                name="informalReviewAccepted"
                fieldKey="informalReviewAccepted"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('$ Accepted is not a valid number'),
                          ),
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
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="Due in Recare This Month"
                tooltip="Total number of patients due for a recare appointment with the
Hygiene Dept Department this month?"
                name="dueInRecareThisMonth"
                fieldKey="dueInRecareThisMonth"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Due in Recare This Month is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="# Seen"
                tooltip="Of the patients who were due, how many were seen in the month?"
                name="seen"
                fieldKey="seen"
                rules={[
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('# Seen is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Divider />

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
                    patient_activity: this.formRef.current.getFieldValue(),
                  })
                }
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

PatientActivityStep.propTypes = {
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

export default withRouter(PatientActivityStep);
