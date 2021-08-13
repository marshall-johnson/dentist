import React from 'react';
import PropTypes from 'prop-types';
import {
  Result,
  Button
} from 'antd';

const Suceess = ({ message }) => (
  <Result
    status="success"
    title={message}
    extra={[
      <Button
        key="home"
        href='/'
      >
        Home
      </Button>,
    ]}
  />
);

Suceess.propTypes = {
  message: PropTypes.string,
};

export default Suceess;
