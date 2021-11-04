import { Table } from 'antd';
import React, { Component } from 'react';
import { generateName, generateRandomNumber } from '@/utils/helpers';
import './index.scss';

class ChartAudit extends Component {
  dataSource = [];

  columns = [
    {
      title: 'New Patient Initials',
      dataIndex: 'patient',
      sorter: true,
      key: '1',
    },
    {
      title: 'Total $ Amount Diagnosed',
      dataIndex: 'amount_diagnosed',
      sorter: true,
      key: '2',
    },
    {
      title: 'Total $ Treatment Completed',
      dataIndex: 'amount_treatment',
      sorter: true,
      key: '3',
    },
    {
      title: 'If Case Completed, Total $ Amount',
      dataIndex: 'amount',
      sorter: true,
      key: '4',
    },
    {
      title: 'Has Hygiene Appt?',
      dataIndex: 'hygiene_appt',
      sorter: true,
      key: '5',
    },
    {
      title: 'Has Doctor Appt?',
      dataIndex: 'doctor_appt',
      sorter: true,
      key: '6',
    },
    {
      title: 'If Dr.Appt, $ Scheduled',
      dataIndex: 'scheduled',
      sorter: true,
      key: '7',
    },
    {
      title: 'Identify Referral Source',
      dataIndex: 'referral_source',
      filters: [
        { text: 'Source A', value: 'a' },
        { text: 'Source B', value: 'b' },
      ],
      sorter: true,
      key: '8',
    },
    {
      title: 'Remaining Unscheduled $ Treatment',
      dataIndex: 'unscheduled_remaining',
      sorter: true,
      key: '9',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    for (let i = 0; i < 100; i += 1) {
      this.dataSource.push({
        patient: generateName(),
        amount_diagnosed: `${generateRandomNumber()}$`,
        amount_treatment: `${generateRandomNumber()}$`,
        amount: `${generateRandomNumber()}$`,
        hygiene_appt: 'Yes',
        doctor_appt: 'No',
        scheduled: '150$',
        referral_source: generateRandomNumber(),
        unscheduled_remaining: '200$',
      });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  render() {
    const { loading } = this.state;

    return (
      <Table
        dataSource={this.dataSource}
        columns={this.columns}
        loading={loading}
      />
    );
  }
}

ChartAudit.propTypes = {};

export default ChartAudit;
