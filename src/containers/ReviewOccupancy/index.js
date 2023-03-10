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
  Select,
  InputNumber,
  notification,
} from 'antd';
import { forEach } from 'lodash';
import { fetchStudents } from '@/actions/studentActions';
import { fetchDoctors } from '@/actions/doctorActions';
import { connect } from 'react-redux';
import { getOccupancy, updateOccupancy } from '@/services/occupancy.service';
import { setLoading } from '@/store/student';

const { Option } = Select;

const ReviewOccupancy = (props) => {
  const { items, fetchDoctors } = props;
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onSubmit = async () => {
    const res = await updateOccupancy({
      id: form.user_id,
      payload: {
        occupancy_conversion: {
          percent_clinical_space: form.percent_clinical_space,
          percent_non_clinical_space: form.percent_non_clinical_space,
          total_treatment_room: form.total_treatment_room,
          total_used_hygiene_department: form.total_used_hygiene_department,
        },
      },
    });
    if (res.success) {
      notification.success({
        message: res.result.message,
      });
    } else {
      notification.error({
        message: res.result.message,
      });
    }
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

  const fetchOccupancyById = async (id) => {
    const res = await getOccupancy(id);
    setLoading(true);
    if (!res.message) {
      setForm({
        user_id: res.data.user_id,
        percent_clinical_space: res.data.percent_clinical_space,
        percent_non_clinical_space: res.data.percent_non_clinical_space,
        total_treatment_room: res.data.total_treatment_room,
        total_used_hygiene_department: res.data.total_used_hygiene_department,
      });
    } else {
      notification.error({
        message: res.message,
      });
      setForm({
        user_id: null,
        percent_clinical_space: null,
        percent_non_clinical_space: null,
        total_treatment_room: null,
        total_used_hygiene_department: null,
      });
    }
  };

  return (
    <div className="submit-data-container">
      <PageHeader className="site-page-header" title="Review Occupancy" />

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
                value={form.user_id}
                optionFilterProp="children"
                onChange={(id) => {
                  setForm({
                    ...form,
                    user_id: id,
                  });
                  fetchOccupancyById(id);
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
                value={form.percent_clinical_space}
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
                value={form.percent_non_clinical_space}
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
                value={form.total_treatment_room}
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
                value={form.total_used_hygiene_department}
                onChange={(e) => {
                  setForm({
                    ...form,
                    total_used_hygiene_department: e,
                  });
                }}
              />
            </Row>
            <Row>
              <Button
                type="primary"
                onClick={onSubmit}
                disabled={!form.user_id}
              >
                Update
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
})(ReviewOccupancy);
