import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Card, Input, Button, Divider, PageHeader } from 'antd';

import AppConfig from '@/constants/AppConfig';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

// eslint-disable-next-line max-len
const urlPatternRegex = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
);

class PatientActivityStep extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        children: {
          newPatientsExams: null,
          newPatientRecords: null,
          whoScheduledRecords: null,
          contractPresented: null,
          contractAccepted: null,
        },
        minor: {
          newPatientsExams: null,
          newPatientRecords: null,
          whoScheduledRecords: null,
          contractPresented: null,
          contractAccepted: null,
        },
        adult: {
          newPatientsExams: null,
          newPatientRecords: null,
          whoScheduledRecords: null,
          contractPresented: null,
          contractAccepted: null,
        },
        activePatientCount: null,
        ptsExtendedTx: null,
        preTxObservationPts: null,
        preTxObservationPtsSeen: null,
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
    const formData = JSON.parse(localStorage.getItem('orthoPatientActivity'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('orthoPatientActivity');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.COLLECTIONS}`,
    );
  };

  onFinish = (data) => {
    localStorage.setItem('orthoPatientActivity', JSON.stringify(data));

    const { history } = this.props;
    history.push(
      `${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`,
    );
  };

  render() {
    const { initialValues } = this.state;

    return (
      <div className="patient-activity-container">
        <PageHeader
          className="site-page-header"
          title="Ortho Submit Data"
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
          <Row gutter={32}>
            <Col span={8}>
              <Card title="4 to 11">
                <Form.Item
                  label="New Patients Exams"
                  name={['children', 'newPatientsExams']}
                  fieldKey={['children', 'newPatientsExams']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of New Patient Records"
                  name={['children', 'newPatientRecords']}
                  fieldKey={['children', 'newPatientRecords']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# Who Scheduled Records"
                  name={['children', 'whoScheduledRecords']}
                  fieldKey={['children', 'whoScheduledRecords']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of Contract Presented"
                  name={['children', 'contractPresented']}
                  fieldKey={['children', 'contractPresented']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of Contract Accepted"
                  name={['children', 'contractAccepted']}
                  fieldKey={['children', 'contractAccepted']}
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
            <Col span={8}>
              <Card title="12 to 18">
                <Form.Item
                  label="New Patients Exams"
                  name={['minor', 'newPatientsExams']}
                  fieldKey={['minor', 'newPatientsExams']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of New Patient Records"
                  name={['minor', 'newPatientRecords']}
                  fieldKey={['minor', 'newPatientRecords']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# Who Scheduled Records"
                  name={['minor', 'whoScheduledRecords']}
                  fieldKey={['minor', 'whoScheduledRecords']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of Contract Presented"
                  name={['minor', 'contractPresented']}
                  fieldKey={['minor', 'contractPresented']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of Contract Accepted"
                  name={['minor', 'contractAccepted']}
                  fieldKey={['minor', 'contractAccepted']}
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
            <Col span={8}>
              <Card title="19+">
                <Form.Item
                  label="New Patients Exams"
                  name={['adult', 'newPatientsExams']}
                  fieldKey={['adult', 'newPatientsExams']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of New Patient Records"
                  name={['adult', 'newPatientRecords']}
                  fieldKey={['adult', 'newPatientRecords']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# Who Scheduled Records"
                  name={['adult', 'whoScheduledRecords']}
                  fieldKey={['adult', 'whoScheduledRecords']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of Contract Presented"
                  name={['adult', 'contractPresented']}
                  fieldKey={['adult', 'contractPresented']}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="# of Contract Accepted"
                  name={['adult', 'contractAccepted']}
                  fieldKey={['adult', 'contractAccepted']}
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
            <Col span={12}>
              <Form.Item
                label="Active Patient Count"
                name="activePatientCount"
                fieldKey="activePatientCount"
                rules={[
                  {
                    required: true,
                  },
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
              <Form.Item
                label="# of Pts in Extended Tx"
                name="ptsExtendedTx"
                fieldKey="ptsExtendedTx"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="# due of Pre-Tx Observation Pts"
                name="preTxObservationPts"
                fieldKey="preTxObservationPts"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="# of Pre-Tx Observation Pts Seen"
                name="preTxObservationPtsSeen"
                fieldKey="preTxObservationPtsSeen"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={12}>
              <h3 className="ant-form-text">Referred By</h3>
              <Form.Item
                label="Patients of Record"
                name="patientsOfRecord"
                fieldKey="patientsOfRecord"
                rules={[
                  {
                    required: true,
                  },
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
              <Form.Item
                label="Other Doctors"
                name="otherDoctors"
                fieldKey="otherDoctors"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
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
                    message: 'Website is not valid!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Signage"
                name="signage"
                fieldKey="signage"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Team Members"
                name="teamMembers"
                fieldKey="teamMembers"
                rules={[
                  {
                    required: true,
                  },
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
              <Form.Item
                label="Other"
                name="other"
                fieldKey="other"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={12}>
              <h3 className="ant-form-text">Perio Production $</h3>
              <Form.Item
                label="RPC Quadrant"
                name="rpcQuadrant"
                fieldKey="rpcQuadrant"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('RPC Quadrant is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="RPC 1-3 teeth"
                name="rpcTeeth"
                fieldKey="rpcTeeth"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('RPC 1-3 teeth is not a valid number'),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Perio Maintenance"
                name="perioMaintenance"
                fieldKey="perioMaintenance"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              'Perio Maintenance is not a valid number',
                            ),
                          ),
                  },
                ]}
              >
                <Input />
              </Form.Item>
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
  history: PropTypes.object,
};

export default withRouter(PatientActivityStep);
