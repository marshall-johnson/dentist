/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Divider,
  PageHeader,
  Select,
  InputNumber,
  notification,
} from 'antd';
import { forEach } from 'lodash';
import { fetchStudents } from '@/actions/studentActions';
import { fetchDoctors } from '@/actions/doctorActions';
import { connect } from 'react-redux';
import { postInterimBudget } from '@/services/interim.service';

const { Option } = Select;

const Occupancy = (props) => {
  const { items, fetchDoctors, loadingFetchStudent } = props;
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onSubmit = async () => {
    console.log({
      occupancy_conversion: {
        user_id: form.user_id,
        percent_clinical_space: form.percent_clinical_space,
        percent_non_clinical_space: form.percent_non_clinical_space,
        total_treatment_room: form.total_treatment_room,
        total_used_hygiene_department: form.total_used_hygiene_department,
      },
    });
    // const res = await postInterimBudget({
    //   id: form.studentId,
    //   payload: {
    //     occupancy_conversion: {
    //       user_id: form.user_id,
    //       percent_clinical_space: form.percent_clinical_space,
    //       percent_non_clinical_space: form.percent_non_clinical_space,
    //       total_treatment_room: form.total_treatment_room,
    //       total_used_hygiene_department: form.total_used_hygiene_department,
    //     },
    //   },
    // });
    // if (res.success) {
    //   notification.success({
    //     message: res.message,
    //   });
    // } else {
    //   notification.error({
    //     message: res.message,
    //   });
    // }
    setForm({
      user_id: null,
      percent_clinical_space: null,
      percent_non_clinical_space: null,
      total_treatment_room: null,
      total_used_hygiene_department: null,
    });
  };

  const optionInit = () => {
    // eslint-disable-next-line react/prop-types
    const data = [];

    forEach(items, (item) => {
      const { fullname } = item.attributes;

      data.push({
        label: fullname,
        value: item.id,
      });
    });

    return data;
  };

  return (
    <div className="submit-data-container">
      <PageHeader className="site-page-header" title="Occupancy" />

      <Divider />

      <Row align="bottom">
        <Col span={12}>
          <Form>
            <Row
              style={{
                marginBottom: 30,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: 250 }}>Office/ Dr:</div>
              <Select
                style={{
                  width: 200,
                }}
                showSearch
                optionFilterProp="children"
                onChange={(id) => {
                  setForm({
                    ...form,
                    user_id: id,
                  });
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {optionInit().map((doctor, index) => (
                  <Option value={doctor.value} key={index.toString()}>
                    {`${doctor?.label}`}
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
              <div style={{ width: 250 }}>% of Clinical Space:</div>
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
                    percent_clinical_space: e,
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
              <div style={{ width: 250 }}>% if Non - Clinical Space:</div>
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
                    percent_non_clinical_space: e,
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
              <div style={{ width: 250 }}>Total number of Treatment Room:</div>
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
                    total_treatment_room: e,
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
              <div style={{ width: 250 }}>Total used by Hygiene Department</div>
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
                    total_used_hygiene_department: e,
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

const mapStateToProps = ({ student, doctor, error }) => ({
  students: student.items,
  items: doctor.items,
  loading: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
  fetchDoctors,
})(Occupancy);
