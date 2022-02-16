/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Button, DatePicker, notification } from 'antd';
import { fetchStudents } from '@/actions/studentActions';
import { fetchDoctors } from '@/actions/doctorActions';
import { connect } from 'react-redux';
import api from '@/api';
import camelcaseKeys from 'camelcase-keys';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Filter = (props) => {
  const { onSubmitCallback, fetchStudents, students = [] } = props;
  const [filterValue, setFilterValue] = useState({
    month: null,
    year: null,
    studentId: null,
    dateValue: null,
    type: 'pmcr_current_month',
  });
  const [doctors, setDoctor] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchDoctorList();
  }, []);

  const onSubmit = () => {
    onSubmitCallback(filterValue);
  };
  const fetchDoctorList = (keyword) =>
    api
      .get('/api/v1/doctors', { params: { search: keyword } })
      .then(({ data: response }) => camelcaseKeys(response, { deep: true }))
      .then(({ result }) => {
        const temp = result.data.map((item) => ({
          label: item.attributes.fullname,
          value: item.id,
        }));
        setDoctor(temp);
        return result.data.map((item) => ({
          label: item.attributes.fullname,
          value: item.id,
        }));
      })
      .catch((error) => {
        throw error;
      });

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
              <Option value="pmcr_current_month">PMCR - Curent Mo.</Option>
              <Option value="pmcr_hygiene_current_month">
                PMCR - Hygiene Curent Mo.
              </Option>
              <Option value="pmcr_ytd_avg_month">PMCR - YTD Avg Month</Option>
              <Option value="pmcr_hygiene_ytd_avg_month">
                PMCR - Hygiene YTD Avg Month
              </Option>
              <Option value="prod_analysis_time_stats">
                PROD. ANALYSIS-TIME.STATS
              </Option>
              <Option value="prod_analysis_time_dollars">
                PROD. ANALYSIS-TIME.DOLLARS
              </Option>
              <Option value="prod_analysis_pt_activity">
                PROD. ANALYSIS-PT.ACTIVITY
              </Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="DatePicker">
            {filterValue.type === 'pmcr_ytd_avg_month' ||
            filterValue.type === 'pmcr_hygiene_ytd_avg_month' ||
            filterValue.type === 'prod_analysis_time_stats' ||
            filterValue.type === 'prod_analysis_pt_activity' ||
            filterValue.type === 'prod_analysis_time_dollars' ? (
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
            label="Dr/Practice"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <DebounceSelect
              showSearch
              optionInit={doctors}
              placeholder="Select Doctor"
              fetchOptions={fetchDoctorList}
              style={{ width: '100%' }}
            /> */}
            <Select
              style={{
                width: 200,
              }}
              showSearch
              optionFilterProp="children"
              onChange={(id) => {
                setFilterValue({
                  ...filterValue,
                  studentId: id,
                });
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {doctors.map((doctor, index) => (
                <Option value={doctor.value} key={index.toString()}>
                  {`${doctor?.label}`}
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
  fetchDoctors,
})(Filter);
