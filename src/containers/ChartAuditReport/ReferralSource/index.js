import React, { Component } from 'react';
import { Table } from 'antd';
import './index.scss';
import { formatCurrency, generateRandomNumber } from '@/utils/helpers';

class ReferralSource extends Component {
  columns = [
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

  data = [
    {
      key: '1',
      patient_count: generateRandomNumber(),
      source: 'Patient',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '2',
      patient_count: generateRandomNumber(),
      source: 'Dr.',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '3',
      patient_count: generateRandomNumber(),
      source: 'Marketing',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '4',
      patient_count: generateRandomNumber(),
      source: 'YP Ad',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '5',
      patient_count: generateRandomNumber(),
      source: 'Insurance',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '6',
      patient_count: generateRandomNumber(),
      source: 'Walk-In',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '7',
      patient_count: generateRandomNumber(),
      source: 'Unknown',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '8',
      patient_count: generateRandomNumber(),
      source: 'Other',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
    {
      key: '9',
      patient_count: generateRandomNumber(),
      source: 'Totals:',
      presented: formatCurrency(generateRandomNumber()),
      completed: formatCurrency(generateRandomNumber()),
    },
  ];

  render() {
    return (
      <Table
        className="referral-resource"
        columns={this.columns}
        size="small"
        dataSource={this.data}
        bordered
        pagination={false}
      />
    );
  }
}

ReferralSource.propTypes = {};

export default ReferralSource;
