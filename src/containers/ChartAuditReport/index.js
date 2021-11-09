import React, { Component } from 'react';
import './index.scss';
import MarketingAnalysis from './MarketingAnalysis';
import MoneyAnalysis from './MoneyAnalysis';

class ChartAuditReport extends Component {
  render() {
    return (
      <>
        <div style={{ marginBottom: 30 }}>
          <MoneyAnalysis />
        </div>
        <MarketingAnalysis />
      </>
    );
  }
}

ChartAuditReport.propTypes = {};

export default ChartAuditReport;
