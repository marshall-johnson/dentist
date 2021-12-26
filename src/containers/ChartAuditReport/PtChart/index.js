/* eslint-disable react/prop-types */
import React, { Component, useEffect, useState } from 'react';
import { Table } from 'antd';
import './index.scss';
import { formatCurrency } from '@/utils/helpers';

const PtChart = (props) => {
  // eslint-disable-next-line react/prop-types
  const { data = {} } = props;
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      ptChart: 'Total $ Amount',
      diagnosed: 0,
      proposed: 0,
      treatmentCompleted: 0,
      caseCompleted: 0,
    },
    {
      key: '2',
      ptChart: 'Total # Patients',
      diagnosed: 0,
      proposed: 0,
      treatmentCompleted: 0,
      caseCompleted: 0,
    },
  ]);

  useEffect(() => {
    if (data.total_amount_case) {
      setDataSource([
        {
          key: '1',
          ptChart: 'Total $ Amount',
          diagnosed: data ? formatCurrency(data.total_amount_diagnosed) : null,
          proposed: data ? formatCurrency(data.total_amount_proposed) : null,
          treatmentCompleted: data
            ? formatCurrency(data.total_amount_completed)
            : null,
          caseCompleted: data ? formatCurrency(data.total_amount_case) : null,
        },
        {
          key: '2',
          ptChart: 'Total # Patients',
          diagnosed: data.total_patient_diagnosed,
          proposed: data.total_patient_proposed,
          treatmentCompleted: data.total_patient_completed,
          caseCompleted: data.total_patient_case,
        },
      ]);
    }
  }, [data]);

  const columns = [
    {
      title: 'Total Pt Charts',
      dataIndex: 'ptChart',
      key: 'ptChart',
      align: 'center',
      className: 'pt-chart-header-col',
    },
    {
      title: '',
      align: 'center',
      className: 'unit-source-group-col',
      children: [
        {
          title: 'Diagnosed',
          dataIndex: 'diagnosed',
          key: 'diagnosed',
          width: 200,
          className: 'unit-source-col',
          align: 'center',
        },
        {
          title: 'Proposed',
          dataIndex: 'proposed',
          key: 'proposed',
          className: 'unit-source-col',
          align: 'center',
        },
        {
          title: 'Treatment Completed',
          dataIndex: 'treatmentCompleted',
          key: 'treatmentCompleted',
          className: 'unit-source-col',
          align: 'center',
        },
        {
          title: 'Cases Completed',
          dataIndex: 'caseCompleted',
          key: 'caseCompleted',
          className: 'unit-source-col',
          align: 'center',
        },
      ],
    },
  ];

  return (
    <Table
      className="pt-chart"
      columns={columns}
      size="small"
      dataSource={dataSource}
      bordered
      pagination={false}
    />
  );
};

export default PtChart;
