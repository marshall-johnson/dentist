import React, { Component } from 'react';
import { Table } from 'antd';
import './index.scss';
import { formatCurrency, generateRandomNumber } from '@/utils/helpers';

class PtChart extends Component {
  columns = [
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

  data = [
    {
      key: '1',
      ptChart: 'Total $ Amount',
      diagnosed: formatCurrency(generateRandomNumber()),
      proposed: formatCurrency(generateRandomNumber()),
      treatmentCompleted: formatCurrency(generateRandomNumber()),
      caseCompleted: formatCurrency(generateRandomNumber()),
    },
    {
      key: '2',
      ptChart: 'Total # Patients',
      diagnosed: generateRandomNumber(),
      proposed: generateRandomNumber(),
      treatmentCompleted: generateRandomNumber(),
      caseCompleted: generateRandomNumber(),
    },
  ];

  render() {
    return (
      <Table
        className="pt-chart"
        columns={this.columns}
        size="small"
        dataSource={this.data}
        bordered
        pagination={false}
      />
    );
  }
}

PtChart.propTypes = {};

export default PtChart;
