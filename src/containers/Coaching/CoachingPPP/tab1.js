import React, { Component } from 'react';
import './index.scss';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { tabs } from './config';

const { Panel } = Collapse;

class Tab1 extends Component {
  render() {
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {tabs.map((tab, index) => (
          <Panel
            header={tab.name}
            key={index.toString()}
            className="site-collapse-custom-panel"
          >
            <tab.component />
          </Panel>
        ))}
      </Collapse>
    );
  }
}

Tab1.propTypes = {};

export default Tab1;
