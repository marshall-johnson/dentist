import React, { Component } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Tag,
  Table,
  Divider,
  PageHeader,
} from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import ScoreTable from './ScoreTable';
import LowestScores from './LowestScores';
import HighestScores from './HighestScores';

const energyData = [
  { key: '1', questionNo: 1, score: 8.0 },
  { key: '2', questionNo: 2, score: 6.0 },
  { key: '3', questionNo: 3, score: 5.5 },
  { key: '4', questionNo: 4, score: 7.0 },
  { key: '5', questionNo: 5, score: 5.5 },
  { key: '6', questionNo: 6, score: 8.0 },
  { key: '7', questionNo: 7, score: 8.0 },
  { key: '8', questionNo: 8, score: 6.0 },
  { key: '9', questionNo: 9, score: 5.5 },
  { key: '10', questionNo: 10, score: 8.0 },
];

const directionData = [
  { key: '1', questionNo: 1, score: 5.5 },
  { key: '2', questionNo: 2, score: 4.5 },
  { key: '3', questionNo: 3, score: 3.5 },
  { key: '4', questionNo: 4, score: 2.5 },
  { key: '5', questionNo: 5, score: 3.5 },
  { key: '6', questionNo: 6, score: 5.5 },
  { key: '7', questionNo: 7, score: 5.5 },
  { key: '8', questionNo: 8, score: 3.5 },
  { key: '9', questionNo: 9, score: 4.5 },
  { key: '10', questionNo: 10, score: 5.0 },
];

const StructureAndSystemsData = [
  { key: '1', questionNo: 1, score: 9.0 },
  { key: '2', questionNo: 2, score: 8.0 },
  { key: '3', questionNo: 3, score: 7.0 },
  { key: '4', questionNo: 4, score: 5.0 },
  { key: '5', questionNo: 5, score: 4.0 },
  { key: '6', questionNo: 6, score: 5.0 },
  { key: '7', questionNo: 7, score: 7.0 },
  { key: '8', questionNo: 8, score: 8.0 },
  { key: '9', questionNo: 9, score: 8.0 },
  { key: '10', questionNo: 10, score: 8.0 },
];

const commAndCoordData = [
  { key: '1', questionNo: 1, score: 6.0 },
  { key: '2', questionNo: 2, score: 6.0 },
  { key: '3', questionNo: 3, score: 6.5 },
  { key: '4', questionNo: 4, score: 6.5 },
  { key: '5', questionNo: 5, score: 6.5 },
  { key: '6', questionNo: 6, score: 7.0 },
  { key: '7', questionNo: 7, score: 8.0 },
  { key: '8', questionNo: 8, score: 6.0 },
  { key: '9', questionNo: 9, score: 7.5 },
  { key: '10', questionNo: 10, score: 7.0 },
];

const AttitudeAndSkillsData = [
  { key: '1', questionNo: 1, score: 8.5 },
  { key: '2', questionNo: 2, score: 8.5 },
  { key: '3', questionNo: 3, score: 7.5 },
  { key: '4', questionNo: 4, score: 6.0 },
  { key: '5', questionNo: 5, score: 6.5 },
  { key: '6', questionNo: 6, score: 6.5 },
  { key: '7', questionNo: 7, score: 7.5 },
  { key: '8', questionNo: 8, score: 7.5 },
  { key: '9', questionNo: 9, score: 8.5 },
  { key: '10', questionNo: 10, score: 8.5 },
];

const columns = [
  { title: '', dataIndex: 'name' },
  { title: 'Energy', dataIndex: 'energyScore' },
  { title: 'Direction', dataIndex: 'directionScore' },
  { title: 'Structure and Systems', dataIndex: 'sasScore' },
  { title: 'Communication and Coordination', dataIndex: 'cacScore' },
  { title: 'Attitude and Skills', dataIndex: 'aasScore' },
];

const dataAvg = [
  { key: '1', name: 'Practice', energyScore: 6.8, directionScore: 4.4, sasScore: 6.9, cacScore: 6.7, aasScore: 7.6 },
  { key: '2', name: 'Doctor', energyScore: 7.2, directionScore: 4.6, sasScore: 7.4, cacScore: 6.5, aasScore: 7.8 },
  { key: '3', name: 'Two', energyScore: 6.3, directionScore: 4.1, sasScore: 6.4, cacScore: 6.9, aasScore: 7.3 },
];

const data = [
  {
    name: 'Energy',
    practice: 6.8,
    doctor: 7.2,
    two: 6.3,
  },
  {
    name: 'Direction',
    practice: 4.4,
    doctor: 4.6,
    two: 4.1,
  },
  {
    name: 'Structure and Systems',
    practice: 6.9,
    doctor: 7.4,
    two: 6.4,
  },
  {
    name: 'Comm. and Coord.',
    practice: 6.7,
    doctor: 6.5,
    two: 6.9,
  },
  {
    name: 'Attitude and Skills',
    practice: 7.6,
    doctor: 7.8,
    two: 7.3,
  },
];

class DataAnalysis extends Component {
  render() {
    return (
      <div className="energy-profile-container">
        <PageHeader
          className="site-page-header"
          title="Data Analysis"
          subTitle="Average Scores by Area"
          tags={<Tag color="blue">{moment().format('MM/DD/YYYY')}</Tag>}
        />
        <Divider />

        <Row gutter={[32, 16]}>
          <Col span={8}>
            <ScoreTable
              title="Energy"
              dataSource={energyData}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Direction"
              dataSource={directionData}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Structure and Systems"
              dataSource={StructureAndSystemsData}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Communication and Coordination"
              dataSource={commAndCoordData}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Attitude and Skills"
              dataSource={AttitudeAndSkillsData}
            />
          </Col>
        </Row>

        <Divider />
        <div>
          <Table
            bordered
            size="small"
            columns={columns}
            dataSource={dataAvg}
            pagination={false}
            style={{ marginBottom: '30px' }}
          />
          <div style={{ height: '400px' }}>
            <ResponsiveContainer
              width="80%"
              height="100%"
            >
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="practice" fill="#9999ff" />
                <Bar dataKey="doctor" fill="#ff6600" />
                <Bar dataKey="two" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Divider />

        <Row gutter={[32]}>
          <Col span={12}>
            <LowestScores />
          </Col>

          <Col span={12}>
            <HighestScores />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DataAnalysis;
