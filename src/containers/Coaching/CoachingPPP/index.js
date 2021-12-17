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
  constructor() {
    super();

    this.state = {
      data: null,
      activeKey: 'form',
    };
  }

  setData = (data) => {
    this.setState({
      data,
      activeKey: 'report',
    });
  };

  render() {
    const { data, activeKey } = this.state;

    return (
      <StickyContainer>
        <Tabs
          defaultActiveKey="form"
          activeKey={activeKey}
          renderTabBar={renderTabBar}
          onChange={(activeKey) => {
            this.setState({
              activeKey,
            });
          }}
        >
          <TabPane tab="Form" key="form">
            <FormTab setData={this.setData} />
          </TabPane>
          <TabPane tab="Report" key="report" disabled={!data}>
            <Report data={data} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

CoachingPPP.propTypes = {};

export default CoachingPPP;
