import React, { Component } from 'react';
import { Descriptions, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { fetchStudents } from '@/actions/studentActions';
import './index.scss';
import { connect } from 'react-redux';

const { Option } = Select;

class Report extends Component {
  dataSource = [
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
      key: 'fixed',
      field: 'FIXED',
      percentage_col: '',
      target: '',
      practice_amount: '',
      cpd_amount: '',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'staff',
      field: 'Staff',
      percentage_col: '',
      target: '20%',
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'occupancy',
      field: 'Occupancy',
      percentage_col: '',
      target: '6%',
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'resource',
      field: 'H&P Resources',
      percentage_col: '',
      target: '5%',
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'variable',
      field: 'VARIABLE',
      percentage_col: '',
      target: '',
      practice_amount: '',
      cpd_amount: '',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'laboratory',
      field: 'Laboratory',
      percentage_col: '',
      target: '10%',
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'supplies',
      field: 'Supplies',
      percentage_col: '',
      target: '4%',
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'admin',
      field: 'Admin',
      percentage_col: '',
      target: '6%',
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
      variance: '',
    },
    {
      key: 'marketing',
      field: 'Marketing',
      percentage_col: '0.00%',
      target: '1%',
      practice_amount: '0',
      cpd_amount: '0',
      variance_amount: '0',
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
      practice_amount: '',
      cpd_amount: '0',
      variance_amount: '',
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
      field: 'Dr.REDLINE',
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
      variance: '',
    },
  ];

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

  componentDidMount() {
    const { fetchStudents } = this.props;
    fetchStudents();
  }

  render() {
    const { students, loadingFetchStudent } = this.props;

    return (
      <>
        <div style={{ width: 100 }}>Student: </div>
        <Select
          loading={loadingFetchStudent}
          style={{
            width: 200,
            marginBottom: 40,
          }}
          onChange={(id) => {
            console.log(id);
          }}
        >
          {students.map((student, index) => (
            <Option value={student.id} key={index.toString()}>
              {`${student.first_name} ${student.last_name}`}
            </Option>
          ))}
        </Select>

        <Descriptions>
          <Descriptions.Item label="Doctor Name">0.00</Descriptions.Item>
          <Descriptions.Item label="Date">08/06/21</Descriptions.Item>
          <Descriptions.Item label="Model Collections" />
          <Descriptions.Item label="Model ExpenseReduction" />
          <Descriptions.Item label="Collections">0</Descriptions.Item>
          <Descriptions.Item label="Production">0</Descriptions.Item>
          <Descriptions.Item label="Yr 1 Collections" />
          <Descriptions.Item label="Yr 1 Expense Reduction">
            0
          </Descriptions.Item>
          <Descriptions.Item label="Collections/Hr" />
          <Descriptions.Item label="Prod/Pt" />
        </Descriptions>
        <Table
          style={{ marginTop: 40 }}
          dataSource={this.dataSource}
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
  students: PropTypes.array,
  loadingFetchStudent: PropTypes.bool,
  fetchStudents: PropTypes.func,
};

const mapStateToProps = ({ student }) => ({
  students: student.items,
  loadingFetchStudent: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
})(Report);
