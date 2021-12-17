import React, { Component } from 'react';
import { Descriptions, Table } from 'antd';
import PropTypes from 'prop-types';
import { fetchStudents } from '@/actions/studentActions';
import './index.scss';
import { connect } from 'react-redux';
import { formatCurrency } from '@/utils/helpers';
import moment from 'moment';

class Report extends Component {
  columns = [
    {
      title: '',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'PRACTICE',
      dataIndex: 'percentage_col',
      key: 'percentage_col',
      render: (value) => (value ? <span>{value}%</span> : '-'),
    },
    {
      title: 'CPD',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'PRACTICE',
      dataIndex: 'practice_amount',
      key: 'practice_amount',
      render: (value) => (Number(value) ? <span>${value}</span> : value),
    },
    {
      title: 'CPD',
      dataIndex: 'cpd_amount',
      key: 'cpd_amount',
    },
    {
      title: 'VARIANCE',
      dataIndex: 'variance_amount',
      key: 'variance_amount',
    },
    {
      title: 'ADJUSTED',
      dataIndex: 'variance',
      key: 'variance',
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const { fetchStudents, data } = this.props;
    fetchStudents();
    this.updateDataSource(data);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data !== prevProps.data) {
      this.updateDataSource(data);
    }
  }

  get collections() {
    const { data } = this.props;

    return (
      (data?.total?.staffCompensation +
        data?.total?.occupancy +
        data?.total?.staffCompensation) /
      0.31
    );
  }

  updateDataSource = (data) => {
    const total = data?.total || {};

    const dataSource = [
      {
        key: 'title',
        field: '',
        percentage_col: '%COL',
        target: 'TARGET',
        practice_amount: 'AMOUNT',
        cpd_amount: 'AMOUNT',
        variance_amount: 'AMOUNT',
        variance: 'VARIANCE',
      },
      {
        key: 'staff',
        field: 'Staff',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
          total?.staffCompensation
        ).toFixed(2),
        target: '20%',
        practice_amount: formatCurrency(total?.staffCompensation || 0),
        cpd_amount: formatCurrency((this.collections * 20) / 100),
        variance_amount: formatCurrency(
          (total?.staffCompensation || 0) - (this.collections * 20) / 100,
        ),
        variance: (() => {
          if ((this.collections * 20) / 100 > total?.staffCompensation || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.staffCompensation || 0) - (this.collections * 20) / 100,
          );
        })(),
      },
      {
        key: 'occupancy',
        field: 'Occupancy',
        percentage_col: (
          data?.report?.total_collections_for_spending_report / total?.occupancy
        ).toFixed(2),
        target: '6%',
        practice_amount: formatCurrency(total?.occupancy || 0),
        cpd_amount: formatCurrency((this.collections * 6) / 100),
        variance_amount: formatCurrency(
          (total?.occupancy || 0) - (this.collections * 6) / 100,
        ),
        variance: (() => {
          if ((this.occupancy * 6) / 100 > total?.occupancy || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.occupancy || 0) - (this.collections * 6) / 100,
          );
        })(),
      },
      {
        key: 'resource',
        field: 'H&P Resources',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
          total?.resourceDev
        ).toFixed(2),
        target: '5%',
        practice_amount: formatCurrency(total?.resourceDev || 0),
        cpd_amount: formatCurrency((this.collections * 5) / 100),
        variance_amount: formatCurrency(
          (total?.resourceDev || 0) - (this.collections * 5) / 100,
        ),
        variance: (() => {
          if ((this.collections * 5) / 100 > total?.resourceDev || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.resourceDev || 0) - (this.collections * 5) / 100,
          );
        })(),
      },
      {
        key: 'laboratory',
        field: 'Laboratory',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
          total?.laboratory
        ).toFixed(2),
        target: '10%',
        practice_amount: formatCurrency(total?.laboratory || 0),
        cpd_amount: formatCurrency((this.collections * 10) / 100),
        variance_amount: formatCurrency(
          (total?.laboratory || 0) - (this.collections * 10) / 100,
        ),
        variance: (() => {
          if ((this.collections * 10) / 100 > total?.laboratory || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.laboratory || 0) - (this.collections * 10) / 100,
          );
        })(),
      },
      {
        key: 'supplies',
        field: 'Supplies',
        percentage_col: (
          data?.report?.total_collections_for_spending_report / total?.supplies
        ).toFixed(2),
        target: '4%',
        practice_amount: formatCurrency(total?.supplies || 0),
        cpd_amount: formatCurrency((this.collections * 4) / 100),
        variance_amount: formatCurrency(
          (total?.supplies || 0) - (this.collections * 4) / 100,
        ),
        variance: (() => {
          if ((this.collections * 4) / 100 > total?.supplies || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.supplies || 0) - (this.collections * 4) / 100,
          );
        })(),
      },
      {
        key: 'admin',
        field: 'Admin',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
          total?.adminServices
        ).toFixed(2),
        target: '6%',
        practice_amount: formatCurrency(total?.adminServices || 0),
        cpd_amount: formatCurrency((this.collections * 6) / 100),
        variance_amount: formatCurrency(
          (total?.adminServices || 0) - (this.collections * 6) / 100,
        ),
        variance: (() => {
          if ((this.collections * 6) / 100 > total?.adminServices || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.adminServices || 0) - (this.collections * 6) / 100,
          );
        })(),
      },
      {
        key: 'marketing',
        field: 'Marketing',
        percentage_col: (
          data?.report?.total_collections_for_spending_report / total?.marketing
        ).toFixed(2),
        target: '1%',
        practice_amount: formatCurrency(total?.marketing || 0),
        cpd_amount: formatCurrency((this.collections * 1) / 100),
        variance_amount: formatCurrency(
          (total?.marketing || 0) - (this.collections * 1) / 100,
        ),
        variance: (() => {
          if ((this.collections * 1) / 100 > total?.marketing || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.marketing || 0) - (this.collections * 1) / 100,
          );
        })(),
      },
      {
        key: 'empty_1',
        field: '',
        percentage_col: '',
        target: '',
        practice_amount: '',
        cpd_amount: '',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'overhead',
        field: 'OVERHEAD',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
            total?.staffCompensation +
          data?.report?.total_collections_for_spending_report /
            total?.occupancy +
          data?.report?.total_collections_for_spending_report /
            total?.resourceDev +
          data?.report?.total_collections_for_spending_report /
            total?.laboratory +
          data?.report?.total_collections_for_spending_report /
            total?.supplies +
          data?.report?.total_collections_for_spending_report /
            total?.adminServices +
          data?.report?.total_collections_for_spending_report / total?.marketing
        ).toFixed(2),
        target: '52%',
        practice_amount: formatCurrency(
          total?.staffCompensation ||
            0 + total?.occupancy ||
            0 + total?.resourceDev ||
            0 + total?.laboratory ||
            0 + total?.supplies ||
            0 + total?.adminServices ||
            0 + total?.marketing ||
            0,
        ),
        cpd_amount: formatCurrency(
          (this.collections * 20) / 100 +
            (this.collections * 6) / 100 +
            (this.collections * 5) / 100 +
            (this.collections * 10) / 100 +
            (this.collections * 4) / 100 +
            (this.collections * 6) / 100 +
            (this.collections * 1) / 100,
        ),
        variance_amount: formatCurrency(
          (total?.staffCompensation ||
            0 + total?.occupancy ||
            0 + total?.resourceDev ||
            0 + total?.laboratory ||
            0 + total?.supplies ||
            0 + total?.adminServices ||
            0 + total?.marketing ||
            0) -
            ((this.collections * 20) / 100 +
              (this.collections * 6) / 100 +
              (this.collections * 5) / 100 +
              (this.collections * 10) / 100 +
              (this.collections * 4) / 100 +
              (this.collections * 6) / 100 +
              (this.collections * 1) / 100),
        ),
        variance: (() => {
          let a = 0;
          if ((this.collections * 20) / 100 > total?.staffCompensation || 0) {
            a = 0;
          } else {
            a = (total?.staffCompensation || 0) - (this.collections * 20) / 100;
          }

          let b = 0;
          if ((this.occupancy * 6) / 100 > total?.occupancy || 0) {
            b = 0;
          } else {
            b = (total?.occupancy || 0) - (this.collections * 6) / 100;
          }

          let c = 0;
          if ((this.collections * 5) / 100 > total?.resourceDev || 0) {
            c = 0;
          } else {
            c = (total?.resourceDev || 0) - (this.collections * 5) / 100;
          }

          let d = 0;
          if ((this.collections * 10) / 100 > total?.laboratory || 0) {
            d = 0;
          } else {
            d = (total?.laboratory || 0) - (this.collections * 10) / 100;
          }

          let e = 0;
          if ((this.collections * 4) / 100 > total?.supplies || 0) {
            e = 0;
          } else {
            e = (total?.supplies || 0) - (this.collections * 4) / 100;
          }

          let f = 0;
          if ((this.collections * 6) / 100 > total?.adminServices || 0) {
            f = 0;
          } else {
            f = (total?.adminServices || 0) - (this.collections * 6) / 100;
          }

          let g = 0;
          if ((this.collections * 1) / 100 > total?.marketing || 0) {
            g = 0;
          } else {
            g = (total?.marketing || 0) - (this.collections * 1) / 100;
          }

          return formatCurrency(a + b + c + d + e + f + g);
        })(),
      },
      {
        key: 'empty_2',
        field: '',
        percentage_col: '',
        target: '',
        practice_amount: '',
        cpd_amount: '',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'dr_salary',
        field: 'Dr.Salary',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
          total?.doctorComp
        ).toFixed(2),
        target: '24%',
        practice_amount: formatCurrency(total?.doctorComp || 0),
        cpd_amount: formatCurrency((this.collections * 24) / 100),
        variance_amount: formatCurrency(
          (total?.doctorComp || 0) - (this.collections * 24) / 100,
        ),
        variance: (() => {
          if ((this.collections * 24) / 100 > total?.doctorComp || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.doctorComp || 0) - (this.collections * 24) / 100,
          );
        })(),
      },
      {
        key: 'redline',
        field: 'REDLINE',
        percentage_col: (
          data?.report?.total_collections_for_spending_report /
            total?.staffCompensation +
          data?.report?.total_collections_for_spending_report /
            total?.occupancy +
          data?.report?.total_collections_for_spending_report /
            total?.resourceDev +
          data?.report?.total_collections_for_spending_report /
            total?.laboratory +
          data?.report?.total_collections_for_spending_report /
            total?.supplies +
          data?.report?.total_collections_for_spending_report /
            total?.adminServices +
          data?.report?.total_collections_for_spending_report /
            total?.marketing +
          data?.report?.total_collections_for_spending_report /
            total?.doctorComp
        ).toFixed(2),
        target: '76%',
        practice_amount: formatCurrency(
          total?.staffCompensation ||
            0 + total?.occupancy ||
            0 + total?.resourceDev ||
            0 + total?.laboratory ||
            0 + total?.supplies ||
            0 + total?.adminServices ||
            0 + total?.marketing ||
            0 + total?.doctorComp ||
            0,
        ),
        cpd_amount: formatCurrency(
          (this.collections * 20) / 100 +
            (this.collections * 6) / 100 +
            (this.collections * 5) / 100 +
            (this.collections * 10) / 100 +
            (this.collections * 4) / 100 +
            (this.collections * 6) / 100 +
            (this.collections * 1) / 100 +
            (this.collections * 24) / 100,
        ),
        variance_amount: formatCurrency(
          (total?.staffCompensation ||
            0 + total?.occupancy ||
            0 + total?.resourceDev ||
            0 + total?.laboratory ||
            0 + total?.supplies ||
            0 + total?.adminServices ||
            0 + total?.marketing ||
            0) -
            ((this.collections * 20) / 100 +
              (this.collections * 6) / 100 +
              (this.collections * 5) / 100 +
              (this.collections * 10) / 100 +
              (this.collections * 4) / 100 +
              (this.collections * 6) / 100 +
              (this.collections * 1) / 100) +
            ((total?.doctorComp || 0) - (this.collections * 24) / 100),
        ),
        variance: (() => {
          let a = 0;
          if ((this.collections * 20) / 100 > total?.staffCompensation || 0) {
            a = 0;
          } else {
            a = (total?.staffCompensation || 0) - (this.collections * 20) / 100;
          }

          let b = 0;
          if ((this.occupancy * 6) / 100 > total?.occupancy || 0) {
            b = 0;
          } else {
            b = (total?.occupancy || 0) - (this.collections * 6) / 100;
          }

          let c = 0;
          if ((this.collections * 5) / 100 > total?.resourceDev || 0) {
            c = 0;
          } else {
            c = (total?.resourceDev || 0) - (this.collections * 5) / 100;
          }

          let d = 0;
          if ((this.collections * 10) / 100 > total?.laboratory || 0) {
            d = 0;
          } else {
            d = (total?.laboratory || 0) - (this.collections * 10) / 100;
          }

          let e = 0;
          if ((this.collections * 4) / 100 > total?.supplies || 0) {
            e = 0;
          } else {
            e = (total?.supplies || 0) - (this.collections * 4) / 100;
          }

          let f = 0;
          if ((this.collections * 6) / 100 > total?.adminServices || 0) {
            f = 0;
          } else {
            f = (total?.adminServices || 0) - (this.collections * 6) / 100;
          }

          let g = 0;
          if ((this.collections * 1) / 100 > total?.marketing || 0) {
            g = 0;
          } else {
            g = (total?.marketing || 0) - (this.collections * 1) / 100;
          }

          let h = 0;
          if ((this.collections * 24) / 100 > total?.doctorComp || 0) {
            h = 0;
          } else {
            h = (total?.doctorComp || 0) - (this.collections * 24) / 100;
          }

          return formatCurrency(a + b + c + d + e + f + g + h);
        })(),
      },
      {
        key: 'solvency',
        field: 'Solvency',
        percentage_col: (
          data?.report?.total_collections_for_spending_report / total?.solvency
        ).toFixed(2),
        target: '24%',
        practice_amount: formatCurrency(total?.solvency || 0),
        cpd_amount: formatCurrency((this.collections * 24) / 100),
        variance_amount: formatCurrency(
          (total?.solvency || 0) - (this.collections * 24) / 100,
        ),
        variance: (() => {
          if ((this.collections * 24) / 100 > total?.solvency || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.solvency || 0) - (this.collections * 24) / 100,
          );
        })(),
      },
      {
        key: 'roi',
        field: 'ROI',
        percentage_col: (
          data?.report?.total_collections_for_spending_report / total?.roi
        ).toFixed(2),
        target: '24%',
        practice_amount: formatCurrency(total?.roi || 0),
        cpd_amount: formatCurrency((this.collections * 10) / 100),
        variance_amount: formatCurrency(
          (total?.roi || 0) - (this.collections * 10) / 100,
        ),
        variance: (() => {
          if ((this.collections * 10) / 100 > total?.roi || 0) {
            return 0;
          }
          return formatCurrency(
            (total?.roi || 0) - (this.collections * 10) / 100,
          );
        })(),
      },
      {
        key: 'add_profit',
        field: 'Add.Profit',
        percentage_col: (
          1 -
          (data?.report?.total_collections_for_spending_report /
            total?.staffCompensation +
            data?.report?.total_collections_for_spending_report /
              total?.occupancy +
            data?.report?.total_collections_for_spending_report /
              total?.resourceDev +
            data?.report?.total_collections_for_spending_report /
              total?.laboratory +
            data?.report?.total_collections_for_spending_report /
              total?.supplies +
            data?.report?.total_collections_for_spending_report /
              total?.adminServices +
            data?.report?.total_collections_for_spending_report /
              total?.marketing +
            data?.report?.total_collections_for_spending_report /
              total?.doctorComp) -
          data?.report?.total_collections_for_spending_report /
            total?.solvency -
          data?.report?.total_collections_for_spending_report / total?.roi
        ).toFixed(2),
        target: '76%',
        practice_amount: formatCurrency(
          1 -
            (total?.staffCompensation ||
              0 + total?.occupancy ||
              0 + total?.resourceDev ||
              0 + total?.laboratory ||
              0 + total?.supplies ||
              0 + total?.adminServices ||
              0 + total?.marketing ||
              0 + total?.doctorComp ||
              0) -
            (total?.solvency || 0) -
            (total?.roi || 0),
        ),
        cpd_amount: formatCurrency(
          1 -
            ((this.collections * 20) / 100 +
              (this.collections * 6) / 100 +
              (this.collections * 5) / 100 +
              (this.collections * 10) / 100 +
              (this.collections * 4) / 100 +
              (this.collections * 6) / 100 +
              (this.collections * 1) / 100 +
              (this.collections * 24) / 100) -
            (this.collections * 10) / 100 -
            (this.collections * 10) / 100,
        ),
        variance_amount: formatCurrency(
          1 -
            ((total?.staffCompensation ||
              0 + total?.occupancy ||
              0 + total?.resourceDev ||
              0 + total?.laboratory ||
              0 + total?.supplies ||
              0 + total?.adminServices ||
              0 + total?.marketing ||
              0) -
              ((this.collections * 20) / 100 +
                (this.collections * 6) / 100 +
                (this.collections * 5) / 100 +
                (this.collections * 10) / 100 +
                (this.collections * 4) / 100 +
                (this.collections * 6) / 100 +
                (this.collections * 1) / 100) +
              ((total?.doctorComp || 0) - (this.collections * 24) / 100) -
              ((total?.solvency || 0) - (this.collections * 24) / 100)) -
            ((total?.roi || 0) - (this.collections * 10) / 100),
        ),
        variance: (() => {
          let a = 0;
          if ((this.collections * 20) / 100 > total?.staffCompensation || 0) {
            a = 0;
          } else {
            a = (total?.staffCompensation || 0) - (this.collections * 20) / 100;
          }

          let b = 0;
          if ((this.occupancy * 6) / 100 > total?.occupancy || 0) {
            b = 0;
          } else {
            b = (total?.occupancy || 0) - (this.collections * 6) / 100;
          }

          let c = 0;
          if ((this.collections * 5) / 100 > total?.resourceDev || 0) {
            c = 0;
          } else {
            c = (total?.resourceDev || 0) - (this.collections * 5) / 100;
          }

          let d = 0;
          if ((this.collections * 10) / 100 > total?.laboratory || 0) {
            d = 0;
          } else {
            d = (total?.laboratory || 0) - (this.collections * 10) / 100;
          }

          let e = 0;
          if ((this.collections * 4) / 100 > total?.supplies || 0) {
            e = 0;
          } else {
            e = (total?.supplies || 0) - (this.collections * 4) / 100;
          }

          let f = 0;
          if ((this.collections * 6) / 100 > total?.adminServices || 0) {
            f = 0;
          } else {
            f = (total?.adminServices || 0) - (this.collections * 6) / 100;
          }

          let g = 0;
          if ((this.collections * 1) / 100 > total?.marketing || 0) {
            g = 0;
          } else {
            g = (total?.marketing || 0) - (this.collections * 1) / 100;
          }

          let h = 0;
          if ((this.collections * 24) / 100 > total?.doctorComp || 0) {
            h = 0;
          } else {
            h = (total?.doctorComp || 0) - (this.collections * 24) / 100;
          }

          let y = 0;
          if ((this.collections * 10) / 100 > total?.roi || 0) {
            y = 0;
          } else {
            y = (total?.roi || 0) - (this.collections * 10) / 100;
          }

          let l = 0;
          if ((this.collections * 24) / 100 > total?.solvency || 0) {
            l = 0;
          } else {
            l = (total?.solvency || 0) - (this.collections * 24) / 100;
          }

          return formatCurrency(1 - (a + b + c + d + e + f + g + h) - y - l);
        })(),
      },
      {
        key: 'empty_3',
        field: '',
        percentage_col: '',
        target: '',
        practice_amount: '',
        cpd_amount: '',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'total',
        field: 'TOTAL',
        percentage_col: '100%',
        target: '100%',
        practice_amount: '',
        cpd_amount: '0',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'yr_one_roi',
        field: 'YR.1 ROI',
        percentage_col: '',
        target: '',
        practice_amount: '',
        cpd_amount: '',
        variance_amount: '',
        variance: '$116,910',
      },
    ];

    // eslint-disable-next-line
    this.setState({
      dataSource,
    });
  };

  render() {
    const { data } = this.props;
    const { dataSource } = this.state;

    return (
      <>
        <Descriptions>
          <Descriptions.Item label="Doctor Name">{`${data?.student?.last_name} ${data?.student?.first_name}`}</Descriptions.Item>
          <Descriptions.Item label="Doctor Degree">
            {data?.student?.degree?.toUpperCase()}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {moment().format('MM/DD/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Collections">
            {formatCurrency(
              (data?.report?.total_collections_for_spending_report /
                data?.student?.spending_report_months) *
                12,
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Production">0</Descriptions.Item>
          <Descriptions.Item label="" />
          <Descriptions.Item label="Model Collections">
            {formatCurrency(this.collections)}
          </Descriptions.Item>
          <Descriptions.Item label="Model ExpenseReduction" />
          <Descriptions.Item label="" />
          <Descriptions.Item label="Collections/Hr" />
          <Descriptions.Item label="Prod/Pt" />
          <Descriptions.Item label="" />
          <Descriptions.Item label="Yr 1 Collections" />
          <Descriptions.Item label="Yr 1 Expense Reduction">
            0
          </Descriptions.Item>
        </Descriptions>
        <Table
          style={{ marginTop: 40 }}
          dataSource={dataSource}
          columns={this.columns}
          pagination={false}
        />

        <Descriptions style={{ marginTop: 40 }} column={12}>
          <Descriptions.Item
            labelStyle={{
              fontWeight: 'bold',
            }}
            span={6}
            label="Average Monthly Expenses with MP"
          >
            1,600
          </Descriptions.Item>
          <Descriptions.Item
            span={6}
            labelStyle={{
              fontWeight: 'bold',
            }}
            label="Average Monthly Income with MP"
          />
          <Descriptions.Item
            span={6}
            labelStyle={{
              fontWeight: 'bold',
            }}
            label="Average Monthly Expenses Currently"
          >
            0
          </Descriptions.Item>
          <Descriptions.Item
            labelStyle={{
              fontWeight: 'bold',
            }}
            span={6}
            label="Average Monthly Income Currently"
          />
          <Descriptions.Item span={3} label="" />
          <Descriptions.Item
            span={3}
            style={{
              background: '#F68081',
            }}
            label="Increase"
            labelStyle={{
              fontWeight: 'bold',
            }}
          >
            1,600
          </Descriptions.Item>
          <Descriptions.Item span={3} label="" />
          <Descriptions.Item
            span={3}
            style={{
              background: '#FEFE03',
            }}
            label="Increase"
            labelStyle={{
              fontWeight: 'bold',
            }}
          />

          <Descriptions.Item span={3} label="" />
          <Descriptions.Item
            span={3}
            style={{
              background: '#F68081',
            }}
            label="% of Expenses"
            labelStyle={{
              fontWeight: 'bold',
            }}
          >
            100%
          </Descriptions.Item>
          <Descriptions.Item span={3} label="" />
          <Descriptions.Item
            span={3}
            style={{
              background: '#FEFE03',
            }}
            label="ROI Percentage"
            labelStyle={{
              fontWeight: 'bold',
            }}
          />
        </Descriptions>
      </>
    );
  }
}

Report.propTypes = {
  fetchStudents: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = ({ student }) => ({
  students: student.items,
  loadingFetchStudent: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
})(Report);
