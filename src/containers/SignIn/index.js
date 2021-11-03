import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AppConfig from '@/constants/AppConfig';
import './index.scss';

class SignIn extends Component {
  onSignIn = () => {
    const { history } = this.props;
    history.push(AppConfig.ROUTES.MAIN);
  };

  render() {
    return (
      <div className="container">
        <Form
          className="form-wrapper"
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={this.onSignIn}
        >
          <Form.Item
            className="input-item"
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            className="input-item"
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="submit-btn-wrapper">
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object,
};

export default SignIn;
