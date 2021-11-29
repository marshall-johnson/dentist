import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Radio,
  Button,
  Divider,
  PageHeader,
  DatePicker,
  Select,
} from 'antd';
import { fetchStudents } from '@/actions/studentActions';

import AppConfig from '@/constants/AppConfig';
import { connect } from 'react-redux';

const { Option } = Select;

class ReviewSubmittedContainer extends Component {
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

    if (practiceType === 'dentistry') {
      href = `/${studentId}${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}?year=${dateMonth.year}&month=${dateMonth?.month}`;
    }

    if (practiceType === 'ortho') {
      href = `/${studentId}${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}?year=${dateMonth.year}&month=${dateMonth?.month}`;
    }

    return (
      <Button
        href={href}
        type="primary"
        disabled={!(studentId && dateMonth && href)}
      >
        Show
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
        <PageHeader className="site-page-header" title="Review Submitted" />

        <Divider />

        <Row align="bottom">
          <Col span={12}>
            <Form onFinish={this.onFinish}>
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
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 100 }}>Month/Year:</div>
                <DatePicker
                  size="middle"
                  picker="month"
                  onChange={this.onDateSelect}
                />
              </Row>
              <Row
                style={{
                  marginBottom: 30,
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: 100 }}>Students: </div>
                <Select
                  loading={loadingFetchStudent}
                  style={{
                    width: 200,
                  }}
                  onChange={(id) => {
                    this.setState({
                      studentId: id,
                    });
                  }}
                >
                  {students.map((student, index) => (
                    <Option value={student.id} key={index.toString()}>
                      {`${student.first_name} ${student.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Row>
              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
                style={{ marginBottom: 0 }}
              >
                <Col span={12}>{this.renderManuallyEnterData()}</Col>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

ReviewSubmittedContainer.propTypes = {
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
})(ReviewSubmittedContainer);
