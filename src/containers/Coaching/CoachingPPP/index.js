import React, { Component } from 'react';
import './index.scss';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import FormTab from './form';
import Report from './report';

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
          <TabPane tab="Form" key="1">
            <FormTab />
          </TabPane>
          <TabPane tab="Report" key="2">
            <Report />
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

CoachingPPP.propTypes = {};

export default CoachingPPP;
