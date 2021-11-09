import { Table } from 'antd';
import React, { Component } from 'react';
import './index.scss';

class SchedulingAnalysis extends Component {
  columns = [
    {
      dataIndex: 'value',
    },
    {
      dataIndex: 'field',
    },
  ];

  data = [
    {
      key: '1',
      value: null,
      field: 'Patients w/Treatment Diagnosed',
    },
    {
      key: '2',
      value: null,
      field: 'Patients w/Treatment Proposed',
    },
    {
      key: '3',
      value: null,
      field: 'Patients Completed Some Treatment',
    },
    {
      key: '4',
      value: null,
      field: 'Patients $ Completed Treatment',
    },
    {
      key: '5',
      value: null,
      field: 'Patients w/Scheduled Appointment',
    },
    {
      key: '6',
      value: null,
      field: "Patients w/Doctor's Appointment",
    },
    {
      key: '7',
      value: null,
      field: 'Patients w/Hygiene Appointment',
    },
    {
      key: '8',
      value: null,
      field: 'Patient with no Appointment scheduled',
    },
  ];

  render() {
    return (
      <Table
        className="scheduling-analysis"
        columns={this.columns}
        size="small"
        dataSource={this.data}
        bordered
        pagination={false}
        title={() => 'Scheduling Analysis'}
      />
    );
  }
}

SchedulingAnalysis.propTypes = {};

export default SchedulingAnalysis;
