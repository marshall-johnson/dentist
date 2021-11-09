import React, { Component } from 'react';
import './index.scss';
import { Col, Row } from 'antd';
import MarketingAnalysis from './MarketingAnalysis';
import MoneyAnalysis from './MoneyAnalysis';
import ReferralSource from './ReferralSource';
import SchedulingAnalysis from './SchedulingAnalysis';
import PtChart from './PtChart';

class ChartAuditReport extends Component {
  render() {
    return (
      <Row style={{ width: '100%' }}>
        <Col span={11} style={{ marginRight: 50 }}>
          <div style={{ marginBottom: 30 }}>
            <PtChart />
          </div>
          <div style={{ marginBottom: 30 }}>
            <SchedulingAnalysis />
          </div>
          <div>
            <ReferralSource />
          </div>
        </Col>
        <Col span={11}>
          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: 30 }}>
              <MoneyAnalysis />
            </div>
            <div style={{ marginBottom: 30 }}>
              <MarketingAnalysis />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

ChartAuditReport.propTypes = {};

export default ChartAuditReport;
