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
  { questionNo: 14, score: 2.5 },
  { questionNo: 18, score: 3.5 },
  { questionNo: 15, score: 3.5 },
  { questionNo: 13, score: 3.5 },
  { questionNo: 25, score: 4.0 },
  { questionNo: 19, score: 4.5 },
  { questionNo: 12, score: 4.5 },
  { questionNo: 24, score: 5.0 },
  { questionNo: 26, score: 5.0 },
  { questionNo: 20, score: 5.0 },
];

const LowestScores = () =>
  <div className="lowest-scorese-table">
    <Title level={5}>Lowest Scores</Title>

    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  </div>;

export default LowestScores;
