/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Radio,
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
import { postInterimBudget } from '@/services/interim.service';

const { Option } = Select;

const category = [
  {
    name: 'Staff',
    value: 'staff',
  },
  {
    name: 'Occupancy',
    value: 'occupancy',
  },
  {
    name: 'H&P Resources',
    value: 'hp_resource',
  },
  {
    name: 'Supplies',
    value: 'supplies',
  },
  {
    name: 'Laboratory',
    value: 'laboratory',
  },
  {
    name: 'Services',
    value: 'services',
  },
  {
    name: 'Mktng/Sales',
    value: 'marketing_sales',
  },
  {
    name: 'DRS Salaries',
    value: 'dr_salaries',
  },
];

const InterimBudget = (props) => {
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
        dateMonth: null,
      });
    }
  };

  const onSubmit = async () => {
    const res = await postInterimBudget({
      id: form.studentId,
      payload: {
        month: form.dateMonth.month,
        year: form.dateMonth.year,
        value: form.interimBudget,
        category: form.category,
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
    // setForm({
    //   studentId: null,
    //   dateMonth: {},
    //   category: null,
    //   interimBudget: null,
    // });
  };

  return (
    <div className="submit-data-container">
      <PageHeader className="site-page-header" title="Interim Budget" />

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
              <div style={{ width: 100 }}>Interim Budget:</div>
              <Select
                style={{
                  width: 200,
                }}
                onChange={(id) => {
                  setForm({
                    ...form,
                    category: id,
                  });
                }}
              >
                {category.map((cate, index) => (
                  <Option value={cate.value} key={index.toString()}>
                    {`${cate.name}`}
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
              <div style={{ width: 100 }}>Interim Budget:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                value={form.interimBudget}
                onChange={(e) => {
                  setForm({
                    ...form,
                    interimBudget: e,
                  });
                }}
              />
            </Row>
            <Row>
              <Button onClick={onSubmit}>Submit</Button>
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
})(InterimBudget);
