/* eslint-disable react/prop-types */
import { Table } from 'antd';
import './index.scss';
import React, { Component, useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

const MarketingAnalysis = ({ data = {} } = {}) => {
  const columns = [
    {
      title: 'Lead Source %',
      dataIndex: 'lead_source',
      sorter: (a, b) =>
        Number(a.lead_source.match(/\d/)) - Number(b.lead_source.match(/\d/)),
      key: '1',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      sorter: (a, b) => a.source.length - b.source.length,
      key: '2',
    },
    {
      title: 'Average $ Presented',
      dataIndex: 'average_presented',
      sorter: (a, b) =>
        Number(a.average_presented.match(/\d/)) -
        Number(b.average_presented.match(/\d/)),
      key: '3',
    },
    {
      title: 'Ave. $',
      dataIndex: 'ave',
      sorter: (a, b) => Number(a.ave.match(/\d/)) - Number(b.ave.match(/\d/)),
      key: '4',
    },
    {
      title: '% completed',
      dataIndex: 'percentage_completed',
      sorter: (a, b) =>
        Number(a.percentage_completed.match(/\d/)) -
        Number(b.percentage_completed.match(/\d/)),
      key: '5',
    },
  ];
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      lead_source: '20%',
      source: 'Patient',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '30%',
    },
    {
      key: '2',
      lead_source: '30%',
      source: 'Dr.',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '40%',
    },
    {
      key: '3',
      lead_source: '25%',
      source: 'Marketing',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '55%',
    },
    {
      key: '4',
      lead_source: '55%',
      source: 'YP Ad',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '80%',
    },
    {
      key: '5',
      lead_source: '70%',
      source: 'Insurance',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '90%',
    },
    {
      key: '6',
      lead_source: '100%',
      source: 'Walk-In',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '20%',
    },
    {
      key: '7',
      lead_source: '22%',
      source: 'Walk-In',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '5%',
    },
    {
      key: '8',
      lead_source: '10%',
      source: 'Unknown',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '35%',
    },
    {
      key: '9',
      lead_source: '70%',
      source: 'Other',
      average_presented: formatCurrency(0),
      ave: formatCurrency(0),
      percentage_completed: '95%',
    },
  ]);

  useEffect(() => {
    setDataSource([
      {
        key: '1',
        lead_source: Math.round(data.lead_source?.patient * 100) / 100,
        source: 'Patient',
        average_presented: formatCurrency(data.ave_presented?.patient),
        ave: formatCurrency(data.ave?.patient),
        percentage_completed: data.percentage_completed?.patient,
      },
      {
        key: '2',
        lead_source: Math.round(data.lead_source?.outside_dr * 100) / 100,
        source: 'Dr.',
        average_presented: formatCurrency(data.ave_presented?.outside_dr),
        ave: formatCurrency(data.ave?.outside_dr),
        percentage_completed: data.percentage_completed?.outside_dr,
      },
      {
        key: '3',
        lead_source: Math.round(data.lead_source?.marketing * 100) / 100,
        source: 'Marketing',
        average_presented: formatCurrency(data.ave_presented?.marketing),
        ave: formatCurrency(data.ave?.marketing),
        percentage_completed: data.percentage_completed?.marketing,
      },
      {
        key: '4',
        lead_source: Math.round(data.lead_source?.yellow_pages * 100) / 100,
        source: 'YP Ad',
        average_presented: formatCurrency(data.ave_presented?.yellow_pages),
        ave: formatCurrency(data.ave?.yellow_pages),
        percentage_completed: data.percentage_completed?.yellow_pages,
      },
      {
        key: '5',
        lead_source: Math.round(data.lead_source?.insurance * 100) / 100,
        source: 'Insurance',
        average_presented: formatCurrency(data.ave_presented?.insurance),
        ave: formatCurrency(data.ave?.insurance),
        percentage_completed: data.percentage_completed?.insurance,
      },
      {
        key: '6',
        lead_source: Math.round(data.lead_source?.walk_in * 100) / 100,
        source: 'Walk-In',
        average_presented: formatCurrency(data.ave_presented?.walk_in),
        ave: formatCurrency(data.ave?.walk_in),
        percentage_completed: data.percentage_completed?.walk_in,
      },
      {
        key: '7',
        lead_source: Math.round(data.lead_source?.unknown * 100) / 100,
        source: 'Unknown',
        average_presented: formatCurrency(data.ave_presented?.unknown),
        ave: formatCurrency(data.ave?.unknown),
        percentage_completed: data.percentage_completed?.unknown,
      },
      {
        key: '8',
        lead_source: Math.round(data.lead_source?.other * 100) / 100,
        source: 'Other',
        average_presented: formatCurrency(data.ave_presented?.other),
        ave: formatCurrency(data.ave?.other),
        percentage_completed: data.percentage_completed?.other,
      },
    ]);
  }, [data]);

  return (
    <Table
      className="marketing-analysis"
      columns={columns}
      size="small"
      dataSource={dataSource}
      bordered
      pagination={false}
      title={() => 'Marketing Analysis'}
    />
  );
};

export default MarketingAnalysis;
