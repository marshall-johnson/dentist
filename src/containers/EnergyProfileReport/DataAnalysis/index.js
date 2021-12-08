import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchStudentSurveys } from '@/actions/studentSurveyAction';
import { connect } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';
import { Row, Col, Tag, Table, Divider, PageHeader } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ScoreTable from './ScoreTable';
import LowestScores from './LowestScores';
import HighestScores from './HighestScores';

const columns = [
  { title: '', dataIndex: 'name' },
  { title: 'Energy', dataIndex: 'energyScore' },
  { title: 'Direction', dataIndex: 'directionScore' },
  { title: 'Structure and Systems', dataIndex: 'sasScore' },
  { title: 'Communication and Coordination', dataIndex: 'cacScore' },
  { title: 'Attitude and Skills', dataIndex: 'aasScore' },
];

const dataAvg = [
  {
    key: '1',
    name: 'Practice',
    energyScore: 6.8,
    directionScore: 4.4,
    sasScore: 6.9,
    cacScore: 6.7,
    aasScore: 7.6,
  },
  {
    key: '2',
    name: 'Doctor',
    energyScore: 7.2,
    directionScore: 4.6,
    sasScore: 7.4,
    cacScore: 6.5,
    aasScore: 7.8,
  },
  {
    key: '3',
    name: 'Two',
    energyScore: 6.3,
    directionScore: 4.1,
    sasScore: 6.4,
    cacScore: 6.9,
    aasScore: 7.3,
  },
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
  constructor(props) {
    super(props);

    this.state = {
      formatResult: {},
    };
  }

  componentDidMount() {
    const { location, fetchStudentSurveys } = this.props;

    const params = queryString.parse(location.search);

    fetchStudentSurveys(params.studentId);
  }

  componentDidUpdate(prevPros) {
    const { result } = this.props;

    if (result.length === 0) return;

    if (prevPros.result !== result) {
      this.formatResult(result);
    }
  }

  formatResult(result) {
    const data = {};
    result.forEach((value) => {
      if (!data[value?.type]) {
        data[value?.type] = [];
      }

      const questionNo = data[value?.type].length + 1;
      data[value?.type].push({
        key: questionNo,
        questionNo,
        score: value?.result || 0,
      });
    });

    this.setState({
      formatResult: data,
    });
  }

  render() {
    const { formatResult } = this.state;
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
            <ScoreTable title="Energy" dataSource={formatResult?.energy} />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Direction"
              dataSource={formatResult?.direction}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Structure and Systems"
              dataSource={formatResult?.structure_and_systems}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Communication and Coordination"
              dataSource={formatResult?.communication_and_coordination}
            />
          </Col>

          <Col span={8}>
            <ScoreTable
              title="Attitude and Skills"
              dataSource={formatResult?.attitude_and_skills}
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
            <ResponsiveContainer width="80%" height="100%">
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

DataAnalysis.propTypes = {
  location: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired,
      studentId: PropTypes.string,
    }),
  }),
  fetchStudentSurveys: PropTypes.func,
  result: PropTypes.array,
};

const mapStateToProps = ({ studentSurvey }) => ({
  result: studentSurvey.items,
});

export default connect(mapStateToProps, {
  fetchStudentSurveys,
})(DataAnalysis);
