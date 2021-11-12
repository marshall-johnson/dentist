import { login } from '@/actions/authActions';
import { Button, Form, Input, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppConfig from '@/constants/AppConfig';
import { Link } from 'react-router-dom';
import './index.scss';

class Login extends Component {
  componentDidMount() {
    const { currentUser, history } = this.props;
    if (currentUser) {
      history.push({
        pathname: AppConfig.ROUTES.MAIN,
      });
    }
  }

  componentDidUpdate() {
    const { errorMessage, currentUser, history } = this.props;
    if (errorMessage) {
      notification.error({
        message: errorMessage,
      });
    }

    if (currentUser) {
      notification.success({
        message: 'Login Success',
      });
      history.push({
        pathname: AppConfig.ROUTES.MAIN,
      });
    }
  }

  onLogin = async (data) => {
    const { login } = this.props;
    await login({
      email: data.email,
      password: data.password,
    });
  };

  render() {
    const { loading } = this.props;

    return (
      <div className="container">
        <h1 className="login-header">Login</h1>
        <Form
          className="form-wrapper"
          name="user"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={this.onLogin}
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
            <Button loading={loading} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <span>
          Don&apos;t have an account ? <Link to="/sign-up">Sign up now</Link>
        </span>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.error,
  loading: auth.loading,
  currentUser: auth.currentUser,
});
export default connect(mapStateToProps, {
  login,
})(Login);
