import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { notification } from 'antd';

class FlashMessage extends Component {
  render() {
    const { message, type } = this.props;

    if (!message) {
      return null;
    }

    switch (type) {
      case 'success':
        notification.success({
          message,
          duration: 3,
        });
        break;
      case 'info':
        notification.info({
          message,
          duration: 3,
        });
        break;
      case 'warning':
        notification.warning({
          message,
          duration: 3,
        });
        break;

      case 'error':
        notification.error({
          message,
          duration: 3,
        });
        break;
      default:
        notification.open({
          message,
          duration: 3,
        });
        break;
    }

    return null;
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

const mapStateToProps = ({ flashMessage }) => ({
  type: flashMessage.type,
  message: flashMessage.message,
});

export default connect(mapStateToProps)(FlashMessage);
