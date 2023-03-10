/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Divider,
  PageHeader,
  DatePicker,
  Select,
  InputNumber,
  notification,
} from 'antd';
import { fetchStudents } from '@/actions/studentActions';
import { connect } from 'react-redux';
import { postBudget } from '@/services/budget.service';

const { Option } = Select;

const Budget = (props) => {
  const { students, fetchStudents, loadingFetchStudent } = props;
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const onDateSelect = (value) => {
    if (value) {
      setForm({
        ...form,
        dateMonth: {
          month: value.month() + 1,
          year: value.year(),
        },
      });
    } else {
      setForm({
        ...form,
        dateMonth: {
          month: null,
          year: null,
        },
        date: value,
      });
    }
  };

  const onSubmit = async () => {
    const res = await postBudget({
      id: form.studentId,
      payload: {
        month: form.dateMonth.month,
        year: form.dateMonth.year,
        red_line_budget: form.red_line_budget,
        blue_line_budget: form.blue_line_budget,
        green_line_budget: form.green_line_budget,
      },
    });
    if (res.success) {
      notification.success({
        message: res.message,
      });
    } else {
      notification.error({
        message: res.message,
      });
    }
    setForm({
      studentId: null,
      dateMonth: {
        month: null,
        year: null,
      },
      red_line_budget: '',
      blue_line_budget: '',
      green_line_budget: '',
      date: null,
    });
  };

  return (
    <div className="submit-data-container">
      <PageHeader className="site-page-header" title="Budget" />

      <Divider />

      <Row align="bottom">
        <Col span={12}>
          <Form>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 100 }}>Month/Year:</div>
              <DatePicker
                size="middle"
                picker="month"
                onChange={onDateSelect}
                value={form.date}
              />
            </Row>
            <Row
              style={{
                marginBottom: 30,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 100 }}>Student:</div>
              <Select
                loading={loadingFetchStudent}
                style={{
                  width: 200,
                }}
                value={form.studentId}
                onChange={(id) => {
                  setForm({
                    ...form,
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
            </Row>
            <Row
              style={{
                marginBottom: 30,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 100 }}>Red Line Budget:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                value={form.red_line_budget}
                onChange={(e) => {
                  setForm({
                    ...form,
                    red_line_budget: e,
                  });
                }}
              />
            </Row>
            <Row
              style={{
                marginBottom: 30,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 100 }}>Blue Line Budget:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                value={form.blue_line_budget}
                onChange={(e) => {
                  setForm({
                    ...form,
                    blue_line_budget: e,
                  });
                }}
              />
            </Row>
            <Row
              style={{
                marginBottom: 30,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 100 }}>Green Line Budget:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                value={form.green_line_budget}
                onChange={(e) => {
                  setForm({
                    ...form,
                    green_line_budget: e,
                  });
                }}
              />
            </Row>
            <Row>
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ student, error }) => ({
  students: student.items,
  loading: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
})(Budget);
