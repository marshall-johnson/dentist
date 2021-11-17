import { Button, Form, Input, Select, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppConfig from '@/constants/AppConfig';
import { connect } from 'react-redux';
import { signUp } from '@/actions/authActions';
import './index.scss';

const { Option } = Select;

class SignUp extends Component {
  componentDidMount() {
    const { currentUser, history } = this.props;
    if (currentUser) {
      history.push({
        pathname: AppConfig.ROUTES.MAIN,
      });
    }
  }

  componentDidUpdate() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      notification.error({
        message: errorMessage,
      });
    }
  }

  onSignUp = async (data) => {
    const { signUp, history } = this.props;
    const isSuccess = await signUp(data);

    if (isSuccess) {
      notification.success({
        message: 'Sign Up Successfully',
      });
      history.push({
        pathname: AppConfig.ROUTES.LOGIN,
      });
    }
  };

  render() {
    const { loading } = this.props;

    return (
      <div className="container">
        <h1 className="sign-up-header">Sign Up</h1>
        <Form
          className="form-wrapper"
          name="user"
          initialValues={{ accountType: 'client' }}
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
            name="passwordConfirmation"
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
          <Form.Item className="input-item" name="accountType">
            <Select className="selector">
              <Option value="client">Client</Option>
            </Select>
          </Form.Item>
          <Form.Item className="submit-btn-wrapper">
            <Button loading={loading} type="primary" htmlType="submit">
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
  signUp: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.error,
  loading: auth.loading,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, {
  signUp,
})(SignUp);
