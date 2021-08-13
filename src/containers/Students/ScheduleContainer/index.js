import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RegisterClassStep from '@/containers/ScheduleClasses/RegisterClassStep';
import ScheduleClassesConfirmStep from '@/containers/ScheduleClasses/ConfirmStep';
import Success from '@/components/Success';
import {
  createRegisterClass
} from '@/actions/classRoomActions';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 'registerClass',
      formData: {
        classRoomId: null,
        date: null,
      },
    };
  }

  nextPage = (values) => {
    this.setState({
      step: 'confirm',
      formData: {
        classRoomId: values.classSelected.value,
        date: moment(values.date).format('YYYY-MM-DD')
      }
    });
  }

  prevPage = () => {
    this.setState({ step: 'registerClass' });
  }

  onSubmit = () => {
    const { formData } = this.state;
    const { createRegisterClass } = this.props;
    createRegisterClass(formData);
    this.setState({ step: 'successPage' });
  }

  render() {
    const {
      step,
      formData: {
        date,
        classRoomId,
      },
    } = this.state;

    return (
      <div className="schedule-container">
        {step === 'registerClass' &&
          <RegisterClassStep
            onNextPage={this.nextPage}
          />
        }
        {step === 'confirm' &&
          <ScheduleClassesConfirmStep
            dateSelected={date}
            onBack={this.prevPage}
            onSubmit={this.onSubmit}
            classIdSelected={classRoomId}
          />
        }
        {step === 'successPage' &&
          <Success
            message="Register Class Successfully"
          />
        }
      </div>
    );
  }
}

ScheduleContainer.propTypes = {
  createRegisterClass: PropTypes.func,
};

export default connect(null, {
  createRegisterClass,
})(ScheduleContainer);
