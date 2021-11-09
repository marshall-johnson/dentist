import { Table } from 'antd';
import './index.scss';
import React, { Component } from 'react';
import { formatCurrency, generateRandomNumber } from '@/utils/helpers';

class MarketingAnalysis extends Component {
  columns = [
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

  data = [
    {
      key: '1',
      lead_source: '20%',
      source: 'Patient',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '30%',
    },
    {
      key: '2',
      lead_source: '30%',
      source: 'Dr.',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '40%',
    },
    {
      key: '3',
      lead_source: '25%',
      source: 'Marketing',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '55%',
    },
    {
      key: '4',
      lead_source: '55%',
      source: 'YP Ad',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '80%',
    },
    {
      key: '5',
      lead_source: '70%',
      source: 'Insurance',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '90%',
    },
    {
      key: '6',
      lead_source: '100%',
      source: 'Walk-In',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '20%',
    },
    {
      key: '7',
      lead_source: '22%',
      source: 'Walk-In',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '5%',
    },
    {
      key: '8',
      lead_source: '10%',
      source: 'Unknown',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '35%',
    },
    {
      key: '9',
      lead_source: '70%',
      source: 'Other',
      average_presented: formatCurrency(generateRandomNumber()),
      ave: formatCurrency(generateRandomNumber()),
      percentage_completed: '95%',
    },
  ];

  render() {
    return (
      <Table
        className="marketing-analysis"
        columns={this.columns}
        size="small"
        dataSource={this.data}
        bordered
        pagination={false}
        title={() => 'Marketing Analysis'}
      />
    );
  }
}

MarketingAnalysis.propTypes = {};

export default MarketingAnalysis;
