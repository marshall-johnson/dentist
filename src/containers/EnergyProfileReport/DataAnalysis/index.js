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
import { SurveyType } from '@/constants';
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

class DataAnalysis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formatResult: {},
      dataAvg: [],
      data: [],
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
      this.formatData(result);
    }
  }

  formatData(result) {
    const doctorResult = this.formatAverageData(
      this.formatResult(
        result.filter((value) => value.survey_type === SurveyType.DOCTOR),
      ),
    );
    const practiceResult = this.formatAverageData(
      this.formatResult(
        result.filter((value) => value.survey_type === SurveyType.PRACTICE),
      ),
    );

    this.setState({
      formatResult: this.formatAverageData(this.formatResult(result)),
      data: [
        {
          name: 'Energy',
          practice: this.calculateAverge(practiceResult?.energy),
          doctor: this.calculateAverge(doctorResult?.energy),
          two: 6.3,
        },
        {
          name: 'Direction',
          practice: this.calculateAverge(practiceResult?.direction),
          doctor: this.calculateAverge(doctorResult?.direction),
          two: 4.1,
        },
        {
          name: 'Structure and Systems',
          practice: this.calculateAverge(practiceResult?.structure_and_systems),
          doctor: this.calculateAverge(doctorResult?.structure_and_systems),
          two: 6.4,
        },
        {
          name: 'Comm. and Coord.',
          practice: this.calculateAverge(
            practiceResult?.communication_and_coordination,
          ),
          doctor: this.calculateAverge(
            doctorResult?.communication_and_coordination,
          ),
          two: 6.9,
        },
        {
          name: 'Attitude and Skills',
          practice: this.calculateAverge(practiceResult?.attitude_and_skills),
          doctor: this.calculateAverge(doctorResult?.attitude_and_skills),
          two: 7.3,
        },
      ],
      dataAvg: [
        {
          key: '1',
          name: 'Practice',
          energyScore: this.calculateAverge(practiceResult?.energy),
          directionScore: this.calculateAverge(practiceResult?.direction),
          sasScore: this.calculateAverge(practiceResult?.structure_and_systems),
          cacScore: this.calculateAverge(
            practiceResult?.communication_and_coordination,
          ),
          aasScore: this.calculateAverge(practiceResult?.attitude_and_skills),
        },
        {
          key: '2',
          name: 'Doctor',
          energyScore: this.calculateAverge(doctorResult?.energy),
          directionScore: this.calculateAverge(doctorResult?.direction),
          sasScore: this.calculateAverge(doctorResult?.structure_and_systems),
          cacScore: this.calculateAverge(
            doctorResult?.communication_and_coordination,
          ),
          aasScore: this.calculateAverge(doctorResult?.attitude_and_skills),
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
      ],
    });
  }

  /* eslint-disable */
  formatResult(result) {
    const data = {};
    result.forEach((value) => {
      if (!data[value?.question_type]) {
        data[value?.question_type] = {};
      }

      if (!data[value?.question_type][value?.questions_survey_id]) {
        data[value?.question_type][value?.questions_survey_id] = {
          key: value?.questions_survey_id,
          questionNo: value?.questions_survey_id,
          score: [value?.result],
        };
      } else {
        data[value?.question_type][value?.questions_survey_id].score.push(
          value?.result,
        );
      }
    });

    return data;
  }

  /* eslint-disable */
  formatAverageData(data) {
    const averageData = {};
    Object.keys(data)?.forEach((type) => {
      const dataType = data[type];
      averageData[type] = Object.keys(dataType)?.map((key) => {
        const sum = dataType[key].score.reduce((a, b) => a + b, 0);
        const avg = sum / dataType[key].score.length || 0;

        return {
          ...dataType[key],
          score: avg,
        };
      });
    });

    return averageData;
  }

  /* eslint-disable */
  calculateAverge(data) {
    if (data) {
      const total = data.reduce((a, b) => a + b?.score, 0);
      return (total / data.length)?.toFixed(2) || 0;
    }

    return 0;
  }

  render() {
    const { formatResult, dataAvg, data } = this.state;
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
