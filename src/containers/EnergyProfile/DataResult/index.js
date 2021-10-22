import React, { Component } from 'react';
import {
  Divider,
  PageHeader,
} from 'antd';
import EPTableComponent from './EPTableComponent';

const energyData = [
  { key: '1', name: 'Doctor', q1: 9, q2: 8, q3: 4, q4: 8, q5: 5, q6: 5, q7: 2, q8: 7, q9: 8, q10: 9, },
  { key: '2', name: 'Two', q1: 9, q2: 5, q3: 7, q4: 6, q5: 5, q6: 5, q7: 10, q8: 7, q9: 8, q10: 4, },
  { key: '3', name: 'Three', q1: 9, q2: 7, q3: 9, q4: 6, q5: 5, q6: 5, q7: 3, q8: 5, q9: 8, q10: 9, },
];

const directionData = [
  { key: '1', name: 'Doctor', q1: 9, q2: 8, q3: 4, q4: 8, q5: 5, q6: 5, q7: 2, q8: 7, q9: 8, q10: 9, },
  { key: '2', name: 'Two', q1: 9, q2: 5, q3: 7, q4: 6, q5: 5, q6: 5, q7: 10, q8: 7, q9: 8, q10: 4, },
  { key: '3', name: 'Three', q1: 9, q2: 7, q3: 9, q4: 6, q5: 5, q6: 5, q7: 3, q8: 5, q9: 8, q10: 9, },
];

const StructureAndSystemsData = [
  { key: '1', name: 'Doctor', q1: 9, q2: 8, q3: 4, q4: 8, q5: 5, q6: 5, q7: 2, q8: 7, q9: 8, q10: 9, },
  { key: '2', name: 'Two', q1: 9, q2: 5, q3: 7, q4: 6, q5: 5, q6: 5, q7: 10, q8: 7, q9: 8, q10: 4, },
  { key: '3', name: 'Three', q1: 9, q2: 7, q3: 9, q4: 6, q5: 5, q6: 5, q7: 3, q8: 5, q9: 8, q10: 9, },
];

const commAndCoordData = [
  { key: '1', name: 'Doctor', q1: 9, q2: 8, q3: 4, q4: 8, q5: 5, q6: 5, q7: 2, q8: 7, q9: 8, q10: 9, },
  { key: '2', name: 'Two', q1: 9, q2: 5, q3: 7, q4: 6, q5: 5, q6: 5, q7: 10, q8: 7, q9: 8, q10: 4, },
  { key: '3', name: 'Three', q1: 9, q2: 7, q3: 9, q4: 6, q5: 5, q6: 5, q7: 3, q8: 5, q9: 8, q10: 9, },
];

const AttitudeAndSkillsData = [
  { key: '1', name: 'Doctor', q1: 9, q2: 8, q3: 4, q4: 8, q5: 5, q6: 5, q7: 2, q8: 7, q9: 8, q10: 9, },
  { key: '2', name: 'Two', q1: 9, q2: 5, q3: 7, q4: 6, q5: 5, q6: 5, q7: 10, q8: 7, q9: 8, q10: 4, },
  { key: '3', name: 'Three', q1: 9, q2: 7, q3: 9, q4: 6, q5: 5, q6: 5, q7: 3, q8: 5, q9: 8, q10: 9, },
];

class DataResult extends Component {
  render() {
    return (
      <div className="energy-profile-container">
        <PageHeader
          className="site-page-header"
          title="Data For Energy Profile"
        />
        <Divider />

        <EPTableComponent
          title="Energy"
          dataSource={energyData}
        />
        <Divider />

        <EPTableComponent
          title="Direction"
          dataSource={directionData}
        />
        <Divider />

        <EPTableComponent
          title="Structure and Systems"
          dataSource={StructureAndSystemsData}
        />
        <Divider />

        <EPTableComponent
          title="Communication and Coordination"
          dataSource={commAndCoordData}
        />
        <Divider />

        <EPTableComponent
          title="Attitude and Skills"
          dataSource={AttitudeAndSkillsData}
        />
      </div>
    );
  }
}

export default DataResult;
