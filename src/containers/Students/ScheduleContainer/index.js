import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppConfig from '@/constants/AppConfig';

import RegisterClassStep from '@/containers/ScheduleClasses/RegisterClassStep';
import ScheduleClassesConfirmStep from '@/containers/ScheduleClasses/ConfirmStep';

class ScheduleContainer extends Component {
  render() {
    const {
      match: {
        params: { step },
      },
    } = this.props;

    const {
      REGISTER_CLASS,
      CONFIRM,
    } = AppConfig.SCHEDULE_CLASS_STEPS;

    return (
      <div className="schedule-container">
        {step === REGISTER_CLASS && <RegisterClassStep />}
        {step === CONFIRM && <ScheduleClassesConfirmStep />}
      </div>
    );
  }
}

ScheduleContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      step: PropTypes.string.isRequired
    })
  }),
};

export default ScheduleContainer;
