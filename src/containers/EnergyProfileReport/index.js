import React, { Component } from 'react';
import { Space, Button, Divider, PageHeader, Select } from 'antd';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

const { Option } = Select;

class EnergyProfile extends Component {
  componentDidMount() {
    const { fetchStudents } = this.props;
    fetchStudents();
  }

  render() {
    const { students, loadingFetchStudent } = this.props;

    return (
      <>
        <div className="energy-profile-container">
          <PageHeader className="site-page-header" title="Energy Profile" />
          <Divider />

          <div>
            <div style={{ width: 100 }}>Students </div>
            <Select
              loading={loadingFetchStudent}
              style={{
                width: 200,
              }}
              onChange={(id) => {
                console.log(id);
              }}
            >
              {students.map((student, index) => (
                <Option value={student.id} key={index.toString()}>
                  {`${student.first_name} ${student.last_name}`}
                </Option>
              ))}
            </Select>
          </div>

          <Space align="bottom" style={{ marginTop: 40 }}>
            <Button
              href={`${AppConfig.ROUTES.ENERGY_PROFILE}/${AppConfig.ENERGY_PROFILE.DATA_ANALYSIS}`}
              type="primary"
            >
              Print Report
            </Button>
          </Space>
        </div>
      </>
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
