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
} from 'antd';

import AppConfig from '@/constants/AppConfig';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const regex6To20 = new RegExp(/^([6-9]|1\d|2[0])$/);
const regex21To40 = new RegExp(/^(2[1-9]|[3][0-9]|4[0])$/);
const regex41ToMore = new RegExp(/^(4[1-9]|[5-9][0-9]|\d{3,})$/);

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
      }
    };
  };

  componentDidMount() {
    const formData = JSON.parse(localStorage.getItem('dentistryPatientActivity'));

    this.formRef.current.setFieldsValue(formData);

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryPatientActivity');
    };
  }

  onBack = () => {
    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.COLLECTIONS}`);
  }

  onFinish = data => {
    localStorage.setItem('dentistryPatientActivity', JSON.stringify(data));

    const { history } = this.props;
    history.push(`${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.STAFF_COMPENSATION}`);
  }

  render() {
    const {
      initialValues,
    } = this.state;

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
                fieldKey="activePatientCount"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('Active Patient Count is not a valid number'))
                  }
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
                fieldKey="newPatient6To20"
                rules={[
                  {
                    required: true,
                  },
                  {
                    pattern: regex6To20,
                    message: 'must be between 6 and 20'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('New Patient (6 to 20) is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="New Patient (21 to 40)"
                name="newPatient21To40"
                fieldKey="newPatient21To40"
                rules={[
                  {
                    required: true,
                  },
                  {
                    pattern: regex21To40,
                    message: 'must be between 21 and 40'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('New Patient (21 to 40) is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="New Patient (41+)"
                name="newPatient41ToMore"
                fieldKey="newPatient41ToMore"
                rules={[
                  {
                    required: true,
                  },
                  {
                    pattern: regex41ToMore,
                    message: 'cannot be less than 41'
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('New Patient (41+) is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# of Formal Review of Findings"
                name="formalReviewOfFindings"
                fieldKey="formalReviewOfFindings"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('# of Formal Review of Findings is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="$ Presented"
                name="formalReviewPresented"
                fieldKey="formalReviewPresented"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('$ Presented is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# appointed"
                name="formalReviewAppointed"
                fieldKey="formalReviewAppointed"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('# of actual appointed is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="$ Accepted"
                name="formalReviewAccepted"
                fieldKey="formalReviewAccepted"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('$ Accepted is not a valid number'))
                  }
                ]}
              >
                <Input />
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
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('# of Informal Review of Findings is not a valid number'))
                  }
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
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('$ Presented is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="# appointed"
                name="informalReviewAppointed"
                fieldKey="informalReviewAppointed"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('# appointed is not a valid number'))
                  }
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
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('$ Accepted is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="Due in Recare This Month"
                name="dueInRecareThisMonth"
                fieldKey="dueInRecareThisMonth"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('Due in Recare This Month is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="# Seen"
                name="seen"
                fieldKey="seen"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('# Seen is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={8}>
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
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('Patients of Record is not a valid number'))
                  }
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
                  }
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
                  }
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
                  }
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
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('Team Members is not a valid number'))
                  }
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
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[32, 16]}>
            <Col span={8}>
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
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('RPC Quadrant is not a valid number'))
                  }
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
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('RPC 1-3 teeth is not a valid number'))
                  }
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
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('Perio Maintenance is not a valid number'))
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
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

PatientActivityStep.propTypes = {
  history: PropTypes.object,
};

export default withRouter(PatientActivityStep);
