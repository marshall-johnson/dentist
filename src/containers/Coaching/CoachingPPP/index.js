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
    };
  }

  setData = (data) => {
    this.setState({
      data,
    });
  };

  render() {
    const { data } = this.state;

    return (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Form" key="1">
            <FormTab setData={this.setData} />
          </TabPane>
          <TabPane tab="Report" key="2" disabled={!data}>
            <Report data={data} />
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

CoachingPPP.propTypes = {};

export default CoachingPPP;
