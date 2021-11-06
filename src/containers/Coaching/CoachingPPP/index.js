import React, { Component } from 'react';
import './index.scss';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import Tab1 from './tab1';
import Tab2 from './tab2';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

class CoachingPPP extends Component {
  render() {
    return (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Tab 1" key="1">
            <Tab1 />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <Tab2 />
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

CoachingPPP.propTypes = {};

export default CoachingPPP;
