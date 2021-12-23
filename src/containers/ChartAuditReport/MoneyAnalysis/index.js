/* eslint-disable react/prop-types */
import { Table } from 'antd';
import './index.scss';
import React, { Component, useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

const MoneyAnalysis = ({ data = {} } = {}) => {
  const columns = [
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
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      field: 'Ave. $ Treatment Diagnosed',
      value: formatCurrency(0),
    },
    {
      key: '2',
      field: 'Ave. $ Treatment Proposed',
      value: formatCurrency(0),
    },
    {
      key: '3',
      field: 'Ave. $ Treatment Completed',
      value: formatCurrency(0),
    },
    {
      key: '4',
      field: 'Ave. $  Case Completed',
      value: formatCurrency(0),
    },
    {
      key: '5',
      field: 'Ave. $ Scheduled w/Doctor',
      value: formatCurrency(0),
    },
    {
      key: '6',
      field: 'Amount $ Scheduled w/Doctor',
      value: formatCurrency(0),
    },
    {
      key: '7',
      field: '% Unscheduled Diagnosed Tx',
      value: formatCurrency(0),
    },
    {
      key: '8',
      field: '% Unscheduled Proposed Tx',
      value: formatCurrency(0),
    },
    {
      key: '9',
      field: 'Amount $ Unscheduled',
      value: formatCurrency(0),
    },
    {
      key: '10',
      field: 'Average Diff Proposed vs. Completed',
      value: formatCurrency(0),
      fieldBold: true,
    },
    {
      key: '11',
      field: 'Average Number of New Patients a Month',
      value: formatCurrency(0),
      fieldBold: true,
    },
    {
      key: '12',
      field: 'Average $ Loss Per New Patients Monthly',
      value: formatCurrency(),
      fieldBold: true,
    },
    {
      key: '13',
      field: 'Average $ Loss Per New Patients Yearly',
      value: formatCurrency(),
      fieldBold: true,
    },
  ]);
  useEffect(() => {
    setDataSource([
      {
        key: '1',
        field: 'Ave. $ Treatment Diagnosed',
        value: formatCurrency(data.ave_treatment_diagnosed),
      },
      {
        key: '2',
        field: 'Ave. $ Treatment Proposed',
        value: formatCurrency(data.ave_treatment_proposed),
      },
      {
        key: '3',
        field: 'Ave. $ Treatment Completed',
        value: formatCurrency(data.ave_treatment_completed),
      },
      {
        key: '4',
        field: 'Ave. $  Case Completed',
        value: formatCurrency(data.ave_case_completed),
      },
      {
        key: '5',
        field: 'Ave. $ Scheduled w/Doctor',
        value: formatCurrency(data.amount_scheduled_doctor),
      },
      {
        key: '6',
        field: 'Amount $ Scheduled w/Doctor',
        value: formatCurrency(data.amount_scheduled_doctor),
      },
      {
        key: '7',
        field: '% Unscheduled Diagnosed Tx',
        value: formatCurrency(data.percentage_unscheduled_diagnosed),
      },
      {
        key: '8',
        field: '% Unscheduled Proposed Tx',
        value: formatCurrency(data.percentage_unscheduled_proposed),
      },
      {
        key: '9',
        field: 'Amount $ Unscheduled',
        value: formatCurrency(data.amount_unscheduled),
      },
      {
        key: '10.',
        field: 'Average Diff Proposed vs. Completed',
        value: formatCurrency(data.average_diff_proposed_vs_completed),
        fieldBold: true,
      },
      {
        key: '11',
        field: 'Average Number of New Patients a Month',
        value: formatCurrency(data.average_number_of_new_patients_a_month),
        fieldBold: true,
      },
      {
        key: '12',
        field: 'Average $ Loss Per New Patients Monthly',
        value: formatCurrency(data.average_loss_per_new_patients_monthly),
        fieldBold: true,
      },
      {
        key: '13',
        field: 'Average $ Loss Per New Patients Yearly',
        value: formatCurrency(data.average_loss_per_new_patients_yearly),
        fieldBold: true,
      },
    ]);
  }, [data]);

  return (
    <Table
      className="money-analysis"
      columns={columns}
      size="small"
      dataSource={dataSource}
      bordered
      pagination={false}
      title={() => 'Money Analysis'}
    />
  );
};

MoneyAnalysis.propTypes = {};

export default MoneyAnalysis;
