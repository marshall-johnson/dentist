import React, { Component } from 'react';
import './index.scss';
import { tabsleft, tabsright } from './config';
import TabSummary from '../tab1/tabSummary';

class Tab1 extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ width: '100%', marginRight: '50px' }}>
          <TabSummary
            tabData={tabsleft}
            totalData={[{ label: 'Total', value: 0 }]}
          />
        </div>
        <div style={{ width: '100%' }}>
          <TabSummary
            tabData={tabsright}
            totalData={[
              { label: 'IRA', value: 0 },
              { label: 'Total', value: 0 },
            ]}
          />
        </div>
      </div>
    );
  }
}

Tab1.propTypes = {};

export default Tab1;
