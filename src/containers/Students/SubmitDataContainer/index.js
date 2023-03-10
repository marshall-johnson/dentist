/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Radio,
  Upload,
  Button,
  Divider,
  PageHeader,
  DatePicker,
  Select,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchStudents } from '@/actions/studentActions';
import { fetchDoctors } from '@/actions/doctorActions';
import { forEach } from 'lodash';
import AppConfig from '@/constants/AppConfig';
import { connect } from 'react-redux';
import { UserAccountType } from '@/constants';
import api from '@/api';
import camelcaseKeys from 'camelcase-keys';
import DebounceSelect from '@/components/DebounceSelect';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class SubmitDataContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      practiceType: null,
      studentId: null,
      dateMonth: {},
    };
  }

  componentDidMount() {
    const { fetchStudents, fetchDoctors, currentUser } = this.props;

    if (
      [UserAccountType.ADMIN, UserAccountType.STUDENT_ADMIN].includes(
        currentUser?.account_type,
      )
    ) {
      fetchStudents({
        filter: UserAccountType.STUDENT_STAFF,
      });
      fetchDoctors();
    }

    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryDoctorProduction');
      localStorage.removeItem('dentistryHygienistProduction');
      localStorage.removeItem('dentistryPatientActivity');
      localStorage.removeItem('dentistryCollections');
      localStorage.removeItem('dentistryStaffCompensation');
      localStorage.removeItem('dentistryOccupanyAndHP');
      localStorage.removeItem('dentistrySuppliesAndMarketing');
      localStorage.removeItem('dentistryLaboratory');
      localStorage.removeItem('dentistryAdministrativeServices');
      localStorage.removeItem('dentistryDoctorSalary');
      localStorage.removeItem('dentistrySolvencySavingsROIFunds');
      localStorage.removeItem('orthoDoctorProduction');
      localStorage.removeItem('orthoPatientActivity');
      localStorage.removeItem('orthoCollections');
      localStorage.removeItem('orthoStaffCompensation');
      localStorage.removeItem('orthoOccupanyAndHP');
      localStorage.removeItem('orthoSuppliesAndMarketing');
      localStorage.removeItem('orthoDoctorSalary');
      localStorage.removeItem('orthoLaboratory');
      localStorage.removeItem('orthoAdministrativeServices');
      localStorage.removeItem('orthoSolvencySavingsROIFunds');
    };
  }

  normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  renderManuallyEnterData = () => {
    const { practiceType, studentId, dateMonth } = this.state;
    const { currentUser } = this.props;
    let href = null;

    const isStudent = [
      UserAccountType.STUDENT_STAFF,
      UserAccountType.STUDENT_DOCTOR,
    ].includes(currentUser?.account_type);
    console.log(isStudent);

    if (practiceType === 'dentistry' && dateMonth && (studentId || isStudent)) {
      href = `/${studentId || currentUser.id}${AppConfig.ROUTES.DENTISTRY}/${
        AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION
      }?year=${dateMonth?.year}&month=${dateMonth?.month}`;
    }

    if (practiceType === 'ortho' && dateMonth && (studentId || isStudent)) {
      href = `/${studentId || currentUser.id}${AppConfig.ROUTES.ORTHO}/${
        AppConfig.ORTHO_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION
      }?year=${dateMonth?.year}&month=${dateMonth?.month}`;
    }

    return (
      <Button
        href={href}
        type="primary"
        htmlType="submit"
        onClick={() => {
          this.formRef.current.submit();
        }}
      >
        Manually Enter Data
      </Button>
    );
  };

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

  onChangePracticeType = (e) => {
    this.setState({ practiceType: e.target.value });
  };

  optionInit = () => {
    // eslint-disable-next-line react/prop-types
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

  onDateSelect = (value) => {
    if (value) {
      this.setState({
        dateMonth: {
          month: value.month() + 1,
          year: value.year(),
        },
      });
    } else {
      this.setState({
        dateMonth: null,
      });
    }
  };

  render() {
    const { doctors, currentUser } = this.props;
    return (
      <div className="submit-data-container">
        <PageHeader className="site-page-header" title="Submit Data Page" />

        <Divider />

        <Row align="bottom">
          <Col span={12}>
            <Form
              onFinish={this.onFinish}
              ref={this.formRef}
              validateMessages={validateMessages}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please pick an item!',
                  },
                ]}
                name="radio-group"
                label="Select Practice Type:"
              >
                <Radio.Group onChange={this.onChangePracticeType}>
                  <Radio value="dentistry">Dentistry</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Month/Year:"
                name="month_year"
                rules={[
                  {
                    required: true,
                    message: 'Please pick a Month/Year!',
                  },
                ]}
              >
                <DatePicker
                  size="middle"
                  picker="month"
                  onChange={this.onDateSelect}
                />
              </Form.Item>

              {[UserAccountType.ADMIN, UserAccountType.STUDENT_ADMIN].includes(
                currentUser?.account_type,
              ) && (
                <Form.Item
                  label="Dr/Practice"
                  name="student"
                  rules={[
                    {
                      required: true,
                      message: 'Please pick a Dr/Practice!',
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: 200,
                    }}
                    showSearch
                    optionFilterProp="children"
                    onChange={(id) => {
                      this.setState({
                        studentId: id,
                      });
                      localStorage.setItem('studentsSubmitDataStudentId', id);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {this.optionInit().map((doctor, index) => (
                      <Option value={doctor.value} key={index.toString()}>
                        {`${doctor?.label}`}
                      </Option>
                    ))}
                  </Select>
                  {/* <DebounceSelect
                    showSearch
                    optionInit={this.optionInit()}
                    placeholder="Select Doctor"
                    fetchOptions={this.fetchDoctorList}
                    onChange={(id) => {
                      this.setState({
                        studentId: id,
                      });
                      localStorage.setItem('studentsSubmitDataStudentId', id);
                    }}
                    style={{ width: '100%' }}
                  /> */}
                </Form.Item>
              )}

              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={this.normFile}
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Upload name="file" listType="picture">
                  <Button icon={<UploadOutlined />}>Browser</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
                style={{ marginBottom: 0 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>{this.renderManuallyEnterData()}</Col>
        </Row>
      </div>
    );
  }
}

SubmitDataContainer.propTypes = {
  doctors: PropTypes.array,
  fetchStudents: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = ({ student, doctor, auth }) => ({
  students: student.items,
  items: doctor.items,
  loadingFetchStudent: student.loading,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, {
  fetchStudents,
  fetchDoctors,
})(SubmitDataContainer);
