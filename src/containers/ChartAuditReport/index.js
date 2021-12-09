import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import './index.scss';
import { Col, Row, Select } from 'antd';
import MarketingAnalysis from './MarketingAnalysis';
import MoneyAnalysis from './MoneyAnalysis';
import ReferralSource from './ReferralSource';
import SchedulingAnalysis from './SchedulingAnalysis';
import PtChart from './PtChart';

const { Option } = Select;

class ChartAuditReport extends Component {
  componentDidMount() {
    const { fetchStudents } = this.props;
    fetchStudents();
  }

  render() {
    const { students, loadingFetchStudent } = this.props;

    return (
      <>
        <div style={{ width: 100 }}>Student: </div>
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

        <Row style={{ width: '100%', marginTop: 40 }}>
          <Col span={11} style={{ marginRight: 50 }}>
            <div style={{ marginBottom: 30 }}>
              <PtChart />
            </div>
            <div style={{ marginBottom: 30 }}>
              <SchedulingAnalysis />
            </div>
            <div>
              <ReferralSource />
            </div>
          </Col>
          <Col span={11}>
            <div style={{ width: '100%' }}>
              <div style={{ marginBottom: 30 }}>
                <MoneyAnalysis />
              </div>
              <div style={{ marginBottom: 30 }}>
                <MarketingAnalysis />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

ChartAuditReport.propTypes = {
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
})(ChartAuditReport);
