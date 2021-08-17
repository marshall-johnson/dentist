import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Alert,
} from 'antd';


class FlashMessage extends Component {
  render() {
    const { message, type } = this.props;

    if (!message) {
      return null;
    }

    return (
      <Alert
        showIcon
        closable
        type={type}
        message={message}
      />
    );
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
