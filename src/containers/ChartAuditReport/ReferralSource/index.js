/* eslint-disable react/prop-types */
import React, { Component, useEffect, useState } from 'react';
import { Table } from 'antd';
import './index.scss';
import { formatCurrency } from '@/utils/helpers';

const ReferralSource = ({ data = {} } = {}) => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      patient_count: 0,
      source: 'Patient',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '2',
      patient_count: 0,
      source: 'Dr.',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '3',
      patient_count: 0,
      source: 'Marketing',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '4',
      patient_count: 0,
      source: 'YP Ad',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '5',
      patient_count: 0,
      source: 'Insurance',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '6',
      patient_count: 0,
      source: 'Walk-In',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '7',
      patient_count: 0,
      source: 'Unknown',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '8',
      patient_count: 0,
      source: 'Other',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
    {
      key: '9',
      patient_count: 0,
      source: 'Totals:',
      presented: formatCurrency(0),
      completed: formatCurrency(0),
    },
  ]);
  useEffect(() => {
    if (data.patient_count) {
      setDataSource([
        {
          key: '1',
          patient_count: data.patient_count?.patient,
          source: 'Patient',
          presented: formatCurrency(data.presented?.patient),
          completed: formatCurrency(data.completed?.patient),
        },
        {
          key: '2',
          patient_count: data.patient_count?.outside_dr,
          source: 'Dr.',
          presented: formatCurrency(data.presented?.outside_dr),
          completed: formatCurrency(data.completed?.outside_dr),
        },
        {
          key: '3',
          patient_count: data.patient_count?.marketing,
          source: 'Marketing',
          presented: formatCurrency(data.presented?.marketing),
          completed: formatCurrency(data.completed?.marketing),
        },
        {
          key: '4',
          patient_count: data.patient_count?.yellow_pages,
          source: 'YP Ad',
          presented: formatCurrency(data.presented?.yellow_pages),
          completed: formatCurrency(data.completed?.yellow_pages),
        },
        {
          key: '5',
          patient_count: data.patient_count?.insurance,
          source: 'Insurance',
          presented: formatCurrency(data.presented?.insurance),
          completed: formatCurrency(data.completed?.insurance),
        },
        {
          key: '6',
          patient_count: data.patient_count?.walk_in,
          source: 'Walk-In',
          presented: formatCurrency(data.presented?.walk_in),
          completed: formatCurrency(data.completed?.walk_in),
        },
        {
          key: '7',
          patient_count: data.patient_count?.unknown,
          source: 'Unknown',
          presented: formatCurrency(data.presented?.unknown),
          completed: formatCurrency(data.completed?.unknown),
        },
        {
          key: '8',
          patient_count: data.patient_count?.other,
          source: 'Other',
          presented: formatCurrency(data.presented?.other),
          completed: formatCurrency(data.completed?.other),
        },
        {
          key: '9',
          patient_count: data.total?.patient_count,
          source: 'Totals:',
          presented: formatCurrency(data?.total?.presented),
          completed: formatCurrency(data?.total?.completed),
        },
      ]);
    }
  }, [data]);
  const columns = [
    {
      title: 'Patient Count',
      dataIndex: 'patient_count',
      key: 'patientCount',
      align: 'center',
      sorter: (a, b) => a.patient_count - b.patient_count,
      className: 'patient-header-col',
    },
    {
      title: 'Referral Source',
      align: 'center',
      className: 'referral-source-col',
      children: [
        {
          title: 'Source',
          dataIndex: 'source',
          sorter: (a, b) => a.source.length - b.source.length,
          key: 'source',
          width: 200,
          align: 'center',
        },
        {
          title: '$ Presented',
          dataIndex: 'presented',
          key: 'presented',
          sorter: (a, b) =>
            Number(a.presented.match(/\d/)) - Number(b.presented.match(/\d/)),
          align: 'center',
        },
        {
          title: '$ Completed',
          dataIndex: 'completed',
          key: 'completed',
          sorter: (a, b) =>
            Number(a.completed.match(/\d/)) - Number(b.completed.match(/\d/)),
          align: 'center',
        },
      ],
    },
  ];

  return (
    <Table
      className="referral-resource"
      columns={columns}
      size="small"
      dataSource={dataSource}
      bordered
      pagination={false}
    />
  );
};

export default ReferralSource;
