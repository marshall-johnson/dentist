import React, { Component } from 'react';
import { Row, Col, Typography, Collapse } from 'antd';
import PropTypes from 'prop-types';
import { CaretRightOutlined } from '@ant-design/icons';
import { data } from '../CoachingPPP/mock';

const { Panel } = Collapse;
const { Text } = Typography;

class TabSummary extends Component {
  render() {
    const { tabData, totalData } = this.props;

    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {tabData.map((tab, index) => (
          <Panel
            header={tab.name}
            key={index.toString()}
            className="site-collapse-custom-panel"
          >
            {data[tab.key]?.map((row, index) => (
              <Row gutter={24} key={tab.name + index.toString()}>
                <Col span={24}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col span={12}>
                      <Text>{row.label}</Text>
                    </Col>
                    <Col span={12} className="border-bottom">
                      <Text>{row.value}</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </Panel>
        ))}

        {totalData.map((data, index) => (
          <div
            style={{ display: 'flex', flexDirection: 'row' }}
            key={`tab_summary_data_${index.toString()}`}
          >
            <Text style={{ marginRight: 20 }}>{data.label}</Text>
            <Text>{data.value}</Text>
          </div>
        ))}
      </Collapse>
    );
  }
}

TabSummary.propTypes = {
  tabData: PropTypes.array,
  totalData: PropTypes.array,
};

export default TabSummary;
