/* eslint-disable react/prop-types */
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';

const SchedulingAnalysis = ({ data = [] } = {}) => {
  const [dataSource, setDataSource] = useState([
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
  ]);
  useEffect(() => {
    setDataSource([
      {
        key: '1',
        value: Math.round(data.patients_treatment_diagnosed * 100) / 100,
        field: 'Patients w/Treatment Diagnosed',
      },
      {
        key: '2',
        value: Math.round(data.patients_treatment_proposed * 100) / 100,
        field: 'Patients w/Treatment Proposed',
      },
      {
        key: '3',
        value: Math.round(data.patients_completed_some_treatment * 100) / 100,
        field: 'Patients Completed Some Treatment',
      },
      {
        key: '4',
        value: Math.round(data.patients_completed_treatment * 100) / 100,
        field: 'Patients $ Completed Treatment',
      },
      {
        key: '5',
        value: Math.round(data.patients_scheduled_appointment * 100) / 100,
        field: 'Patients w/Scheduled Appointment',
      },
      {
        key: '6',
        value: Math.round(data.patients_doctor_appointment * 100) / 100,
        field: "Patients w/Doctor's Appointment",
      },
      {
        key: '7',
        value: Math.round(data.patients_hygiene_appointment * 100) / 100,
        field: 'Patients w/Hygiene Appointment',
      },
      {
        key: '8',
        value: Math.round(data.patients_no_appointment * 100) / 100,
        field: 'Patient with no Appointment scheduled',
      },
    ]);
  }, [data]);
  const columns = [
    {
      dataIndex: 'value',
    },
    {
      dataIndex: 'field',
    },
  ];

  return (
    <Table
      className="scheduling-analysis"
      columns={columns}
      size="small"
      dataSource={dataSource}
      bordered
      pagination={false}
      title={() => 'Scheduling Analysis'}
    />
  );
};

SchedulingAnalysis.propTypes = {};

export default SchedulingAnalysis;
