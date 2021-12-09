import React, { Component } from 'react';
import { Select, Table } from 'antd';
import PropTypes from 'prop-types';
import { fetchStudents } from '@/actions/studentActions';
import './index.scss';
import { connect } from 'react-redux';

const { Option } = Select;

const columns = [
  {
    dataIndex: 'col1',
  },
  {
    dataIndex: 'col2',
  },
  {
    dataIndex: 'col3',
  },
  {
    dataIndex: 'col4',
  },
  {
    dataIndex: 'col5',
  },
];

const data = [
  {
    key: '1',
    col1: 'TOTAL PRODUCTION FOR SPENDING REPORT',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '2',
    col1: 'PRODUCTION LAST CALENDAR YEAR',
    col2: null,
    col3: null,
    col4: null,
    col5: 0,
  },
  {
    key: '3',
    col1: 'PRODUCTION 2 YEARS AGO',
    col2: null,
    col3: null,
    col4: null,
    col5: 0,
  },
  {
    key: '4',
    col1: 'TOTAL COLLECTIONS FOR SPENDING REPORT',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '5',
    col1: 'TOTAL COLLECTIONS FOR SPENDING REPORT',
    col2: null,
    col3: null,
    col4: null,
    col5: 0,
  },
  {
    key: '6',
    col1: 'COLLECTIONS 2 YEARS AGO',
    col2: null,
    col3: null,
    col4: null,
    col5: 0,
  },
  {
    key: '7',
    col1: null,
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '8',
    col1: 'AVG # NEW PATIENTS LAST 3 "TYPICAL" MONTHS',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '9',
    col1: 'AVG # OF DOCTOR PATIENT VISITS/MONTH',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '10',
    col1: 'AVG # OF CLINICAL HOURS WORKED/MONTH',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '11',
    col1: null,
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '12',
    col1: 'TOTAL PRACTICE DEBT PAYMENT/MONTH',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '13',
    col1: 'TOTAL PERSONAL DEBT PAYMENT/MONTH',
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '14',
    col1: null,
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '15',
    col1: null,
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '16',
    col1: 'STAFF SALARIES',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '17',
    col1: 'OCCUPANCY',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '18',
    col1: 'OCCUPANCY',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '19',
    col1: 'H&P RESOURCES',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '20',
    col1: 'LABORATORY',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '21',
    col1: 'SUPPLIES',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '22',
    col1: 'SERVICES',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '23',
    col1: 'MARKETING',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: '0%',
    col5: 0,
  },
  {
    key: '24',
    col1: 'TOTAL OVERHEAD',
    col2: 1,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '25',
    col1: 'DR SALARY',
    col2: 0,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '26',
    col1: 'TOTAL EXPENSES',
    col2: 1,
    col3: 'CURRENT YEAR',
    col4: null,
    col5: 0,
  },
  {
    key: '27',
    col1: null,
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '28',
    col1: 'ACTUAL SOLVENCY DEPOSITS',
    col2: null,
    col3: null,
    col4: null,
    col5: 0,
  },
  {
    key: '29',
    col1: 'ACTUAL ROI EXPENSES',
    col2: null,
    col3: null,
    col4: null,
    col5: 0,
  },
  {
    key: '30',
    col1: null,
    col2: null,
    col3: null,
    col4: null,
    col5: null,
  },
  {
    key: '31',
    col1: 'PROJECTED GROWTH RATE',
    col2: null,
    col3: null,
    col4: null,
    col5: '10.00%',
  },
  {
    key: '32',
    col1: 'ASSUMED FINAL OVERHEAD IN PERCENTAGE',
    col2: null,
    col3: null,
    col4: null,
    col5: '52.00%',
  },
  {
    key: '33',
    col1: 'ESTIMATED FIRST IRR',
    col2: null,
    col3: null,
    col4: null,
    col5: '10.00%',
  },
  {
    key: '34',
    col1: 'ESTIMATED SECOND IRR',
    col2: null,
    col3: null,
    col4: null,
    col5: '7.00%',
  },
];

class Report extends Component {
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
        <Table
          style={{ marginTop: 40 }}
          bordered
          pagination={false}
          columns={columns}
          dataSource={data}
        />
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
