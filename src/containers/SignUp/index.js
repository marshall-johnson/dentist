import {
  Button,
  Form,
  Input,
  Select,
  notification,
  InputNumber,
  Radio,
} from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppConfig from '@/constants/AppConfig';
import { connect } from 'react-redux';
import { signUp } from '@/actions/authActions';
import './index.scss';
import { STUDENT_DEGREES, UserAccountType } from '@/constants';
import PhoneInput from 'react-phone-input-2';

const { Option } = Select;

class SignUp extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      currentAccountType: UserAccountType.STUDENT_ADMIN,
    };
  }

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

  renderStudentItem() {
    const { currentAccountType } = this.state;

    if (currentAccountType === UserAccountType.STUDENT_ADMIN) {
      return (
        <>
          <Form.Item
            name="firstName"
            className="input-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            className="input-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="pacticeName"
            className="input-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Pactice Name" />
          </Form.Item>
          <Form.Item
            name="degree"
            className="input-item"
            fieldKey="degree"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Degree">
              {STUDENT_DEGREES.map((data, index) => (
                <Option key={index.toString()} value={data.value}>
                  {data.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            className="input-item"
            fieldKey="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            name="city"
            className="input-item"
            fieldKey="city"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item
            name="zip"
            className="input-item"
            fieldKey="zip"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Zip" />
          </Form.Item>

          <Form.Item
            label="Business Phone"
            className="input-item"
            name="businessPhone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <PhoneInput country="us" inputStyle={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Home Number"
            className="input-item"
            name="phoneNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <PhoneInput country="us" inputStyle={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="spendingReportMonths"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              placeholder="Spending Report Months"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="newPractice"
            fieldKey="newPractice"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group>
              <Radio value>New Practice</Radio>
              <Radio value={false}>Existing Practice</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="state"
            fieldKey="state"
            className="input-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="State" />
          </Form.Item>

          <Form.Item
            name="specialty"
            className="input-item"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select className="selector" placeholder="Specialty">
              <Option value="general">General</Option>
              <Option value="prostho">Prostho</Option>
              <Option value="ortho">Ortho</Option>
              <Option value="pedo">Pedo</Option>
              <Option value="perio">Perio</Option>
              <Option value="endo">Endo</Option>
              <Option value="surg">Surg</Option>
            </Select>
          </Form.Item>
        </>
      );
    }

    return null;
  }

  render() {
    const { loading } = this.props;
    const { currentAccountType } = this.state;

    return (
      <div
        className="container"
        style={{
          height:
            currentAccountType === UserAccountType.STUDENT_ADMIN
              ? '100%'
              : '100vh',
          paddingTop:
            currentAccountType === UserAccountType.STUDENT_ADMIN && '50px',
          paddingBottom:
            currentAccountType === UserAccountType.STUDENT_ADMIN && '50px',
        }}
      >
        <h1 className="sign-up-header">Sign Up</h1>
        <Form
          ref={this.formRef}
          className="form-wrapper"
          name="user"
          initialValues={{ accountType: currentAccountType }}
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

          {this.renderStudentItem()}

          <Form.Item className="input-item" name="accountType">
            <Select
              className="selector"
              onSelect={(value) => {
                this.setState({
                  currentAccountType: value,
                });
              }}
            >
              {[
                {
                  value: UserAccountType.STUDENT_ADMIN,
                  label: 'Student Admin',
                },
                {
                  value: UserAccountType.COACH,
                  label: 'Coach',
                },
              ].map((value, index) => (
                <Option value={value.value} key={index.toString()}>
                  {value.label}
                </Option>
              ))}
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
