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

import AppConfig from '@/constants/AppConfig';
import { connect } from 'react-redux';

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
    const { fetchStudents } = this.props;
    fetchStudents();

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
    let href = null;

    if (practiceType === 'dentistry' && dateMonth && studentId) {
      href = `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}?year=${dateMonth?.year}&month=${dateMonth?.month}`;
    }

    if (practiceType === 'ortho' && dateMonth && studentId) {
      href = `/${studentId}${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}?year=${dateMonth?.year}&month=${dateMonth?.month}`;
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

  onChangePracticeType = (e) => {
    this.setState({ practiceType: e.target.value });
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
    const { students, loadingFetchStudent } = this.props;
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

              <Form.Item
                label="Students"
                name="student"
                rules={[
                  {
                    required: true,
                    message: 'Please pick a Student!',
                  },
                ]}
              >
                <Select
                  loading={loadingFetchStudent}
                  style={{
                    width: 200,
                  }}
                  onChange={(id) => {
                    this.setState({
                      studentId: id,
                    });
                    localStorage.setItem('studentsSubmitDataStudentId', id);
                  }}
                >
                  {students.map((student, index) => (
                    <Option value={student.id} key={index.toString()}>
                      {`${student.first_name} ${student.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

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
  students: PropTypes.array,
  loadingFetchStudent: PropTypes.bool,
  fetchStudents: PropTypes.func,
};

const mapStateToProps = ({ student }) => ({
  students: student.items,
  loadingFetchStudent: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
})(SubmitDataContainer);
