/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Space,
  Button,
  Divider,
  PageHeader,
  Select,
  Row,
  Col,
  Form,
} from 'antd';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class EnergyProfile extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      studentId: null,
    };
  }

  componentDidMount() {
    const { fetchStudents } = this.props;
    fetchStudents();
  }

  render() {
    const { students, loadingFetchStudent } = this.props;
    const { studentId } = this.state;

    return (
      <div className="energy-profile-container">
        <PageHeader className="site-page-header" title="Energy Profile" />
        <Divider />

        <Row align="bottom">
          <Col span={12}>
            <Form ref={this.formRef} validateMessages={validateMessages}>
              <Form.Item
                label="Student"
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
                  }}
                >
                  {students.map((student, index) => (
                    <Option value={student.id} key={index.toString()}>
                      {`${student.first_name} ${student.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Space align="bottom" style={{ marginTop: 40 }}>
                <Button
                  onClick={() => {
                    this.formRef.current.submit();
                  }}
                  href={
                    studentId &&
                    `${AppConfig.ROUTES.ENERGY_PROFILE}/${AppConfig.ENERGY_PROFILE.DATA_ANALYSIS}?studentId=${studentId}`
                  }
                  type="primary"
                  htmlType="submit"
                >
                  Print Report
                </Button>
              </Space>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

EnergyProfile.propTypes = {
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
})(EnergyProfile);
