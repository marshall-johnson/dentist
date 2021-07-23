import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';

import { logout } from '@/actions/authActions';
import { getCurrentUser } from '@/selectors/authSelectors';
import logoImage from '@/assets/images/logo.svg';
import './index.scss';

const { Title, Paragraph } = Typography;

class HomeContainer extends Component {
  handleLogout = () => {
    const { dispatchLogout } = this.props;
    dispatchLogout();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="home-container">
        <img src={logoImage} alt="logo" className="home-container__logo" />
        <Title level={1} className="home-container__title">
          Antd React Starter
        </Title>
        <Paragraph className="home-container__description">
          A simple react boilerplate with: create-react-app, react-redux,
          reduxjs/toolkit, axios, antd, eslint, prettier, lint-staged, husky and
          more...
        </Paragraph>
        <div className="home-container__links">
          {currentUser && (
            <>
              <Button type="primary">
                <Link to="/me">Profile</Link>
              </Button>
              <Button onClick={this.handleLogout}>Logout</Button>
            </>
          )}
          {!currentUser && (
            <Button type="primary">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  currentUser: PropTypes.object,
  dispatchLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps, {
  dispatchLogout: logout,
})(HomeContainer);
