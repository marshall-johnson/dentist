import React, { Component } from 'react';
import { Row, Col, Typography, Collapse, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { CaretRightOutlined, PlusCircleFilled } from '@ant-design/icons';
import configColumn from '../CoachingPPP/configColumn';

const { Panel } = Collapse;
const { Text } = Typography;

class TabSummary extends Component {
  render() {
    const { tabData, totalData, total } = this.props;

    return (
      <>
        <Collapse
          bordered={false}
          collapsible={false}
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
              {configColumn[tab.key]?.map((row, index) => (
                <Row gutter={24} key={tab.name + index.toString()}>
                  <Col span={24}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col span={12}>
                        <Text>{row.label}</Text>
                      </Col>
                      <Col span={12} className="border-bottom">
                        <Form.Item
                          className="input-item"
                          name={[tab.key, row.key]}
                          rules={row?.rules}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
              <Row gutter={24}>
                <Col span={12}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      width: 80,
                      fontWeight: 'normal',
                      color: '#349DFF',
                    }}
                  >
                    <PlusCircleFilled
                      style={{ marginRight: 5, color: '#349DFF' }}
                    />
                    Total
                  </Text>
                </Col>
                <Col span={12}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 10,
                      color: '#349DFF',
                    }}
                  >
                    {total[tab.key] || 0}
                  </Text>
                </Col>
              </Row>
            </Panel>
          ))}
        </Collapse>

        {totalData.map((data, index) => (
          <div
            style={{ display: 'flex', flexDirection: 'row' }}
            key={`tab_summary_data_${index.toString()}`}
          >
            <Text
              style={{
                marginRight: 20,
                marginTop: 10,
                fontSize: 16,
                width: 80,
                fontWeight: 'normal',
                color: '#349DFF',
              }}
            >
              <PlusCircleFilled style={{ marginRight: 5, color: '#349DFF' }} />
              {data.label}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                color: '#349DFF',
              }}
            >
              {data.value}
            </Text>
          </div>
        ))}
      </>
    );
  }
}

TabSummary.propTypes = {
  total: PropTypes.object,
  tabData: PropTypes.array,
  totalData: PropTypes.array,
};

export default TabSummary;
