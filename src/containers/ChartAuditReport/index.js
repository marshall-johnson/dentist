/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import './index.scss';
import { Col, Row, Select } from 'antd';
import { getReportByUserId } from '@/services/coachAudit.service';
import MarketingAnalysis from './MarketingAnalysis';
import MoneyAnalysis from './MoneyAnalysis';
import ReferralSource from './ReferralSource';
import SchedulingAnalysis from './SchedulingAnalysis';
import PtChart from './PtChart';

const { Option } = Select;

export const ChartAuditReport = (props) => {
  const { fetchStudents, loadingFetchStudent, students } = props;
  const [student, setStudent] = useState(undefined);
  const [data, setData] = useState({});
  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchReport();
  }, [student]);

  const fetchReport = async () => {
    const res = await getReportByUserId({ id: student });
    if (res) {
      setData(res);
    }
  };

  const render = () => (
    <>
      <div style={{ width: 100 }}>Student: </div>
      <Select
        loading={loadingFetchStudent}
        style={{
          width: 200,
        }}
        onChange={(id) => {
          setStudent(id);
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
            <PtChart data={data.total_pt} />
          </div>
          <div style={{ marginBottom: 30 }}>
            <SchedulingAnalysis data={data.scheduling} />
          </div>
          <div>
            <ReferralSource data={data.referral_source} />
          </div>
        </Col>
        <Col span={11}>
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 30 }}>
              <MoneyAnalysis data={data.money_analysis} />
            </div>
            <div style={{ marginBottom: 30 }}>
              <MarketingAnalysis data={data.marketing_analysis} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
  return render();
};

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
