import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Select,
  Divider,
  Calendar,
  PageHeader,
} from 'antd';

import AppConfig from '@/constants/AppConfig';

import './index.scss';

const { Option } = Select;

const classScheduledColumns = [
  {
    title: 'Class Name',
    dataIndex: 'className',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
  },
  {
    title: 'Material',
    dataIndex: 'material',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: text => <a href='#'>{text}</a>,
  },
];

const classScheduledData = [
  {
    key: '1',
    className: 'Class C',
    date: '7/14/2021',
    startTime: '8:00 AM PST',
    endTime: '9:00 AM PST',
    material: 'Link',
  },
  {
    key: '2',
    className: 'Class D',
    date: '8/15/2021',
    startTime: '12:00 PM PST',
    endTime: '3:00 PM PST',
    material: 'Link',
  },
  {
    key: '3',
    className: 'Class F',
    date: '8/16/2021',
    startTime: '8:00 AM PST',
    endTime: '11:00 AM PST',
    material: 'Link',
  },
];

const classCompletedColumns = [
  {
    title: 'Class Name',
    dataIndex: 'className',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Materials',
    dataIndex: 'material',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    render: text => <a href='#'>{text}</a>,
  },
];

const classCompletedData = [
  {
    key: '1',
    className: 'Class A',
    date: '4/1/2021',
    material: 'Link',
  },
  {
    key: '2',
    className: 'Class B',
    date: '4/15/2021',
    material: 'Link',
  },
  {
    key: '3',
    className: 'Class E',
    date: '6/1/2021',
    material: 'Link',
  },
];

class RegisterClassStep extends Component {

  render() {
    return (
      <div className="schedule-class-register-container">
        <PageHeader
          className="site-page-header"
          title="Schedule Classes / Sessions"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row gutter={48}>
            <Col span={8}>
              <Form.Item label="Select Class">
                <Select
                  showSearch
                  placeholder="Select class"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="classA">Class A</Option>
                  <Option value="classB">Class B</Option>
                  <Option value="classC">Class C</Option>
                  <Option value="classD">Class D</Option>
                  <Option value="classE">Class E</Option>
                  <Option value="classF">Class F</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <div className="calendar">
                <Calendar fullscreen={false} />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                type="primary"
                href={`${AppConfig.ROUTES.STUDENTS_SCHEDULE}/${AppConfig.SCHEDULE_CLASS_STEPS.CONFIRM}`}
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>

        <Divider />

        <div className="class-scheduled-container">
          <h1>Classes Scheduled</h1>
          <Table columns={classScheduledColumns} dataSource={classScheduledData} />
        </div>

        <Divider />

        <div className="class-scheduled-container">
          <h1>Classes Completed</h1>
          <Table columns={classCompletedColumns} dataSource={classCompletedData} />
        </div>
      </div>
    );
  }
}

export default RegisterClassStep;
