import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AppConfig from '@/constants/AppConfig';
import './index.scss';

class Login extends Component {
  onSignIn = () => {
    const { history } = this.props;
    history.push({
      pathname: AppConfig.ROUTES.MAIN,
      state: {
        user: {
          name: 'test',
        },
      },
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="login-header">Login</h1>
        <span className="introduction-header">
          Sign in and start managing your users!
        </span>
        <Form
          className="form-wrapper"
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={this.onSignIn}
        >
          <Form.Item
            className="input-item"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            className="input-item"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="submit-btn-wrapper">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
