/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Button, DatePicker } from 'antd';
import student from '@/store/student';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';

const { Option } = Select;

const Filter = (props) => {
  const {
    onSubmitCallback,
    fetchStudents,
    loadingFetchStudent,
    students = [],
    value,
  } = props;
  const [filterValue, setFilterValue] = useState({
    month: null,
    year: null,
    studentId: null,
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
                  type: value,
                });
              }}
            >
              <Option value="one">Report 1</Option>
              <Option value="two">Report 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="DatePicker">
            <DatePicker
              style={{ width: '100%' }}
              picker="month"
              onChange={(date, dateString) => {
                const temp = dateString.split('-');
                setFilterValue({
                  ...filterValue,
                  month: temp[1],
                  year: temp[0],
                });
              }}
            />
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
          <Button type="primary" onClick={onSubmit}>
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
