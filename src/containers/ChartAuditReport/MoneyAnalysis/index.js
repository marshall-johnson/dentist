import { Table } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { formatCurrency, generateRandomNumber } from '@/utils/helpers';

class MoneyAnalysis extends Component {
  columns = [
    {
      dataIndex: 'field',
      render: (text, object) => (
        <span style={{ fontWeight: object?.fieldBold ? 'bold' : 'normal' }}>
          {text}
        </span>
      ),
    },
    {
      dataIndex: 'value',
      render: (text, object) => (
        <span style={{ fontWeight: object?.fieldBold ? 'bold' : 'normal' }}>
          {text}
        </span>
      ),
    },
  ];

  data = [
    {
      key: '1',
      field: 'Ave. $ Treatment Diagnosed',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '2',
      field: 'Ave. $ Treatment Proposed',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '3',
      field: 'Ave. $ Treatment Completed',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '4',
      field: 'Ave. $  Case Completed',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '5',
      field: 'Ave. $ Scheduled w/Doctor',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '6',
      field: 'Amount $ Scheduled w/Doctor',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '7',
      field: '% Unscheduled Diagnosed Tx',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '8',
      field: '% Unscheduled Proposed Tx',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '9',
      field: 'Amount $ Unscheduled',
      value: formatCurrency(generateRandomNumber()),
    },
    {
      key: '10',
      field: 'Average Diff Proposed vs. Completed',
      value: formatCurrency(generateRandomNumber()),
      fieldBold: true,
    },
    {
      key: '11',
      field: 'Average Number of New Patients a Month',
      value: formatCurrency(generateRandomNumber()),
      fieldBold: true,
    },
    {
      key: '12',
      field: 'Average $ Loss Per New Patients Monthly',
      value: formatCurrency(generateRandomNumber()),
      fieldBold: true,
    },
    {
      key: '13',
      field: 'Average $ Loss Per New Patients Yearly',
      value: formatCurrency(generateRandomNumber()),
      fieldBold: true,
    },
  ];

  render() {
    return (
      <Table
        className="money-analysis"
        columns={this.columns}
        size="small"
        dataSource={this.data}
        bordered
        pagination={false}
        title={() => 'Money Analysis'}
      />
    );
  }
}

MoneyAnalysis.propTypes = {};

export default MoneyAnalysis;
