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
import { postInterimBudget } from '@/services/interim.service';

const { Option } = Select;

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
        dateMonth: {
          month: null,
          year: null,
        },
        date: value,
      });
    }
  };

  const onSubmit = async () => {
    const res = await postInterimBudget({
      id: form.studentId,
      payload: {
        month: form.dateMonth.month,
        year: form.dateMonth.year,
        budgets: {
          staff: form.staff,
          occupancy: form.occupancy,
          hp_resource: form.hp_resources,
          supplies: form.supplies,
          laboratory: form.laboratory,
          services: form.services,
          meal_and_entertainment: form.meal_and_entertainment,
          marketing_sales: form.marketing_sales,
          drs_salaries: form.drs_salaries,
        },
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
      category: null,
      interimBudget: null,
      date: '',
    });
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
              <div style={{ width: 100 }}>Category:</div>
              <div style={{ width: 100 }}>Budget %:</div>
            </Row>
            <Row
              style={{
                marginBottom: 30,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 100 }}>Staff:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.staff}
                onChange={(e) => {
                  setForm({
                    ...form,
                    staff: e,
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
              <div style={{ width: 100 }}>Occupancy:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.occupancy}
                onChange={(e) => {
                  setForm({
                    ...form,
                    occupancy: e,
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
              <div style={{ width: 100 }}>HP Resources:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.hp_resources}
                onChange={(e) => {
                  setForm({
                    ...form,
                    hp_resources: e,
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
              <div style={{ width: 100 }}>Supplies:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.supplies}
                onChange={(e) => {
                  setForm({
                    ...form,
                    supplies: e,
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
              <div style={{ width: 100 }}>Meal and Entertainment:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.meal_and_entertainment}
                onChange={(e) => {
                  setForm({
                    ...form,
                    meal_and_entertainment: e,
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
              <div style={{ width: 100 }}>Laboratory:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.laboratory}
                onChange={(e) => {
                  setForm({
                    ...form,
                    laboratory: e,
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
              <div style={{ width: 100 }}>Services:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.services}
                onChange={(e) => {
                  setForm({
                    ...form,
                    services: e,
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
              <div style={{ width: 100 }}>Marketing Sales:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.marketing_sales}
                onChange={(e) => {
                  setForm({
                    ...form,
                    marketing_sales: e,
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
              <div style={{ width: 100 }}>DRS SALARIES:</div>
              <InputNumber
                style={{
                  width: 200,
                }}
                formatter={(value) =>
                  `% ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\%\s?|(,*)/g, '')}
                value={form.drs_salaries}
                onChange={(e) => {
                  setForm({
                    ...form,
                    drs_salaries: e,
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
})(InterimBudget);
