import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AppConfig from '@/constants/AppConfig';
import { Link } from 'react-router-dom';
import './index.scss';

const { Option } = Select;

class SignUp extends Component {
  onSignUp = () => {
    const { history } = this.props;
    history.push({
      pathname: AppConfig.ROUTES.MAIN,
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="sign-up-header">Sign Up</h1>
        <span className="introduction-header">
          Sign up and start managing your users!
        </span>
        <Form
          className="form-wrapper"
          name="user"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={this.onSignUp}
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
          <Form.Item
            className="input-item"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Form.Item className="input-item" name="">
            <Select className="selector" defaultValue="lucy">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item className="submit-btn-wrapper">
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object,
};

export default SignUp;
