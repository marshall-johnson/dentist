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
        percentage_col: '',
        target: '20%',
        practice_amount: formatCurrency(total?.staffCompensation || 0),
        cpd_amount: formatCurrency((this.collections * 20) / 100),
        variance_amount: formatCurrency(
          (total?.staffCompensation || 0) - (this.collections * 20) / 100,
        ),
        variance: '',
      },
      {
        key: 'occupancy',
        field: 'Occupancy',
        percentage_col: '',
        target: '6%',
        practice_amount: formatCurrency(total?.occupancy || 0),
        cpd_amount: formatCurrency((this.collections * 6) / 100),
        variance_amount: formatCurrency(
          (total?.occupancy || 0) - (this.collections * 6) / 100,
        ),
        variance: '',
      },
      {
        key: 'resource',
        field: 'H&P Resources',
        percentage_col: '',
        target: '5%',
        practice_amount: formatCurrency(total?.resourceDev || 0),
        cpd_amount: formatCurrency((this.collections * 5) / 100),
        variance_amount: formatCurrency(
          (total?.resourceDev || 0) - (this.collections * 5) / 100,
        ),
        variance: '',
      },
      {
        key: 'laboratory',
        field: 'Laboratory',
        percentage_col: '',
        target: '10%',
        practice_amount: formatCurrency(total?.laboratory || 0),
        cpd_amount: formatCurrency((this.collections * 10) / 100),
        variance_amount: formatCurrency(
          (total?.laboratory || 0) - (this.collections * 10) / 100,
        ),
        variance: '',
      },
      {
        key: 'supplies',
        field: 'Supplies',
        percentage_col: '',
        target: '4%',
        practice_amount: formatCurrency(total?.supplies || 0),
        cpd_amount: formatCurrency((this.collections * 4) / 100),
        variance_amount: formatCurrency(
          (total?.supplies || 0) - (this.collections * 4) / 100,
        ),
        variance: '',
      },
      {
        key: 'admin',
        field: 'Admin',
        percentage_col: '',
        target: '6%',
        practice_amount: formatCurrency(total?.adminServices || 0),
        cpd_amount: formatCurrency((this.collections * 6) / 100),
        variance_amount: formatCurrency(
          (total?.adminServices || 0) - (this.collections * 6) / 100,
        ),
        variance: '',
      },
      {
        key: 'marketing',
        field: 'Marketing',
        percentage_col: '0.00%',
        target: '1%',
        practice_amount: formatCurrency(total?.marketing || 0),
        cpd_amount: formatCurrency((this.collections * 1) / 100),
        variance_amount: formatCurrency(
          (total?.marketing || 0) - (this.collections * 1) / 100,
        ),
        variance: '0',
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
        percentage_col: '',
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
        variance: '',
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
        percentage_col: '',
        target: '24%',
        practice_amount: '',
        cpd_amount: '0',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'redline',
        field: 'REDLINE',
        percentage_col: '',
        target: '76%',
        practice_amount: '',
        cpd_amount: '0',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'solvency',
        field: 'Solvency',
        percentage_col: '',
        target: '10%',
        practice_amount: '',
        cpd_amount: '0',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'roi',
        field: 'ROI',
        percentage_col: '',
        target: '10%',
        practice_amount: '',
        cpd_amount: '0',
        variance_amount: '',
        variance: '',
      },
      {
        key: 'add_profit',
        field: 'Add.Profit',
        percentage_col: '',
        target: '4%',
        practice_amount: '',
        cpd_amount: '0',
        variance_amount: '',
        variance: '',
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
        percentage_col: '',
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
