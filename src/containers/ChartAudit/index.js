import { Descriptions, Table } from 'antd';
import React, { Component } from 'react';
import { generateRandomNumber, formatCurrency } from '@/utils/helpers';
import './index.scss';

class ChartAudit extends Component {
  dataSource = [];

  columns = [
    {
      title: 'New Patient Initials',
      dataIndex: 'patient',
      sorter: (a, b) => a.patient.length - b.patient.length,
    },
    {
      title: 'Total $ Amount Diagnosed',
      dataIndex: 'amount_diagnosed',
      sorter: (a, b) =>
        Number(a.amount_diagnosed.match(/\d/)) -
        Number(b.amount_diagnosed.match(/\d/)),
    },
    {
      title: 'Total $ Treatment Completed',
      dataIndex: 'amount_treatment',
      sorter: (a, b) =>
        Number(a.amount_treatment.match(/\d/)) -
        Number(b.amount_treatment.match(/\d/)),
    },
    {
      title: 'If Case Completed, Total $ Amount',
      dataIndex: 'amount',
      sorter: (a, b) =>
        Number(a.amount.match(/\d/)) - Number(b.amount.match(/\d/)),
    },
    {
      title: 'Has Hygiene Appt?',
      dataIndex: 'hygiene_appt',
      sorter: (a, b) => a.hygiene_appt.length - b.hygiene_appt.length,
    },
    {
      title: 'Has Doctor Appt?',
      dataIndex: 'doctor_appt',
      sorter: (a, b) => a.doctor_appt.length - b.doctor_appt.length,
    },
    {
      title: 'If Dr.Appt, $ Scheduled',
      dataIndex: 'scheduled',
      sorter: (a, b) =>
        Number(a.scheduled.match(/\d/)) - Number(b.scheduled.match(/\d/)),
    },
    {
      title: 'Identify Referral Source',
      dataIndex: 'referral_source',
      sorter: (a, b) => a.referral_source - b.referral_source,
      filters: [
        { text: 'Source A', value: 'a' },
        { text: 'Source B', value: 'b' },
      ],
    },
    {
      title: 'Remaining Unscheduled $ Treatment',
      dataIndex: 'unscheduled_remaining',
      sorter: (a, b) =>
        Number(a.unscheduled_remaining.match(/\d/)) -
        Number(b.unscheduled_remaining.match(/\d/)),
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    for (let i = 0; i < 100; i += 1) {
      this.dataSource.push({
        patient: 'Test',
        amount_diagnosed: formatCurrency(generateRandomNumber()),
        amount_treatment: formatCurrency(generateRandomNumber()),
        amount: formatCurrency(generateRandomNumber()),
        hygiene_appt: 'Yes',
        doctor_appt: 'No',
        scheduled: formatCurrency(generateRandomNumber()),
        referral_source: generateRandomNumber(),
        unscheduled_remaining: formatCurrency(generateRandomNumber()),
        key: `chart_audit_${i.toString()}`,
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
      <>
        <div
          style={{
            marginBottom: 20,
            width: 'auto',
          }}
        >
          <Descriptions title="Doctor's Personal Information" column={12}>
            <Descriptions.Item span={12} label="First Name" />
            <Descriptions.Item span={12} label="Last Name" />
            <Descriptions.Item span={12} label="Degree">
              DDS
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Table
          dataSource={this.dataSource}
          columns={this.columns}
          loading={loading}
        />
      </>
    );
  }
}

ChartAudit.propTypes = {};

export default ChartAudit;
