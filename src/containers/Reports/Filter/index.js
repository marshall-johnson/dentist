/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Button, DatePicker, notification } from 'antd';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import { filter } from 'lodash';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Filter = (props) => {
  const {
    onSubmitCallback,
    fetchStudents,
    loadingFetchStudent,
    students = [],
  } = props;
  const [filterValue, setFilterValue] = useState({
    month: null,
    year: null,
    studentId: null,
    dateValue: null,
    type: 'one',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const onSubmit = () => {
    onSubmitCallback(filterValue);
  };

  return (
    <Form name="advanced_search" className="ant-advanced-search-form">
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Select Report"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              value={filterValue.type}
              onChange={(value) => {
                setFilterValue({
                  ...filterValue,
                  month: null,
                  year: null,
                  type: value,
                  dateValue: null,
                });
              }}
            >
              <Option value="one">Report 1</Option>
              <Option value="two">Report 2</Option>
              <Option value="three">Report 3</Option>
              <Option value="four">Report 4</Option>
              <Option value="five">Report 5</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="DatePicker">
            {filterValue.type === 'three' ||
            filterValue.type === 'four' ||
            filterValue.type === 'five' ? (
              <RangePicker
                value={filterValue.dateValue}
                picker="month"
                onChange={(date, dateString) => {
                  const startDate = dateString[0].split('-');
                  const endDate = dateString[1].split('-');
                  if (endDate[0] !== startDate[0]) {
                    notification.error({
                      message: 'Start year and End year must be the same',
                    });
                  } else {
                    setFilterValue({
                      ...filterValue,
                      month: [startDate[1], endDate[1]],
                      year: startDate[0],
                      dateValue: date,
                    });
                  }
                }}
              />
            ) : (
              <DatePicker
                value={filterValue.dateValue}
                style={{ width: '100%' }}
                picker="month"
                onChange={(date, dateString) => {
                  const temp = dateString.split('-');
                  setFilterValue({
                    ...filterValue,
                    month: [temp[1]],
                    year: temp[0],
                    dateValue: date,
                  });
                }}
              />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Select Student"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              loading={loadingFetchStudent}
              style={{
                width: 200,
              }}
              onChange={(id) => {
                setFilterValue({
                  ...filterValue,
                  studentId: id,
                });
              }}
            >
              {students.map((student, index) => (
                <Option value={student.id} key={index.toString()}>
                  {`${student.first_name} ${student.last_name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            type="primary"
            disabled={!filterValue.month}
            onClick={onSubmit}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = ({ student }) => ({
  students: student.items,
  loadingFetchStudent: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
})(Filter);
