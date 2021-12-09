import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Button, Form, Select } from 'antd';
import { formatCurrency } from '@/utils/helpers';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import { tabsleft, tabsright } from './config';
import TabSummary from '../tab1/tabSummary';

const { Option } = Select;

class FormTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: {},
      totalTabLeft: 0,
      totalTabRight: 0,
    };
  }

  componentDidMount() {
    const { fetchStudents } = this.props;
    fetchStudents();
  }

  handleTotal = (_, value) => {
    const total = {};
    Object.keys(value).forEach((field) => {
      const fieldObject = value[field];
      total[field] = Object.keys(fieldObject).reduce(
        (previous, value) => previous + (Number(fieldObject[value]) || 0),
        0,
      );
    });

    this.setState({
      total,
      totalTabLeft: tabsleft.reduce(
        (previous, tab) => previous + (total[tab.key] || 0),
        0,
      ),
      totalTabRight: tabsright.reduce(
        (previous, tab) => previous + (total[tab.key] || 0),
        0,
      ),
    });
  };

  render() {
    const { total, totalTabLeft, totalTabRight } = this.state;
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

        <Form
          style={{ marginTop: 40 }}
          className="form-wrapper"
          name="data"
          onValuesChange={this.handleTotal}
          autoComplete="off"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '100%', marginRight: '50px' }}>
              <TabSummary
                total={total}
                tabData={tabsleft}
                totalData={[
                  { label: 'Total', value: formatCurrency(totalTabLeft) },
                ]}
              />
            </div>
            <div style={{ width: '100%' }}>
              <TabSummary
                total={total}
                tabData={tabsright}
                totalData={[
                  { label: 'IRA', value: formatCurrency(0) },
                  { label: 'Total', value: formatCurrency(totalTabRight) },
                ]}
              />
            </div>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20, marginTop: 50 }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

FormTab.propTypes = {
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
})(FormTab);
