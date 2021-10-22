import React from 'react';
import {
  Table,
  Typography
} from 'antd';

const { Title } = Typography;

const columns = [
  { title: '#', dataIndex: 'questionNo', },
  { title: '', dataIndex: 'score' },
];

const dataSource = [
  { questionNo: 28, score: 8.0 },
  { questionNo: 29, score: 8.0 },
  { questionNo: 30, score: 8.0 },
  { questionNo: 1, score: 8.0 },
  { questionNo: 37, score: 8.0 },
  { questionNo: 41, score: 8.5 },
  { questionNo: 42, score: 8.5 },
  { questionNo: 49, score: 8.5 },
  { questionNo: 50, score: 8.5 },
  { questionNo: 21, score: 9.0 },
];

const HighestScores = () =>
  <div className="highest-scorese-table">
    <Title level={5}>Highest Scores</Title>

    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  </div>;

export default HighestScores;
