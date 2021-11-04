import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Typography
} from 'antd';
import { roundNumber } from '@/utils/helpers';

import './index.scss';

const { Text, Title } = Typography;

const renderScore = (value) => (
  {
    children: roundNumber(value),
    props: {},
  }
);

const columns = [
  { title: '#', dataIndex: 'questionNo', },
  { title: 'Answer', dataIndex: 'score', render: renderScore },
];

const ScoreTable = ({ title, dataSource }) =>
  <div className="energy-profile-score-table">
    <Title level={5}>{title}</Title>

    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      summary={pageData => {
        let avgScore = 0;
        const numberOfRow = pageData.length;

        pageData.forEach(({ score }) => {
          avgScore += score * 1;
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell>Practice</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(avgScore / numberOfRow)}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  </div>;

ScoreTable.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.object,
};

export default ScoreTable;
