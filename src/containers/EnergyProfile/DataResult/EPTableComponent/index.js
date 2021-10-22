import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Typography
} from 'antd';
import { roundNumber } from '@/utils/helpers';

import './index.scss';

const { Text, Title } = Typography;

const columns = [
  { title: '', dataIndex: 'name', },
  { title: 'Q1', dataIndex: 'q1', },
  { title: 'Q2', dataIndex: 'q2', },
  { title: 'Q3', dataIndex: 'q3', },
  { title: 'Q4', dataIndex: 'q4', },
  { title: 'Q5', dataIndex: 'q5', },
  { title: 'Q6', dataIndex: 'q6', },
  { title: 'Q7', dataIndex: 'q7', },
  { title: 'Q8', dataIndex: 'q8', },
  { title: 'Q9', dataIndex: 'q9', },
  { title: 'Q10', dataIndex: 'q10', },
];

const EPTableComponent = ({ title, dataSource }) =>
  <div className="energy-profile-result-table">
    <Title level={4}>{title}</Title>

    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      summary={pageData => {
        let totlaScoreQ1 = 0;
        let totlaScoreQ2 = 0;
        let totlaScoreQ3 = 0;
        let totlaScoreQ4 = 0;
        let totlaScoreQ5 = 0;
        let totlaScoreQ6 = 0;
        let totlaScoreQ7 = 0;
        let totlaScoreQ8 = 0;
        let totlaScoreQ9 = 0;
        let totlaScoreQ10 = 0;
        const numberOfRow = pageData.length;

        pageData.forEach(({ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 }) => {
          totlaScoreQ1 += q1 * 1;
          totlaScoreQ2 += q2 * 1;
          totlaScoreQ3 += q3 * 1;
          totlaScoreQ4 += q4 * 1;
          totlaScoreQ5 += q5 * 1;
          totlaScoreQ6 += q6 * 1;
          totlaScoreQ7 += q7 * 1;
          totlaScoreQ8 += q8 * 1;
          totlaScoreQ9 += q9 * 1;
          totlaScoreQ10 += q10 * 1;
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell>Avg.</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ1 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ2 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ3 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ4 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ5 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ6 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ7 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ8 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ9 / numberOfRow)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{roundNumber(totlaScoreQ10 / numberOfRow)}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  </div>;

EPTableComponent.propTypes = {
  title: PropTypes.string,
  dataSource: PropTypes.object,
};

export default EPTableComponent;
