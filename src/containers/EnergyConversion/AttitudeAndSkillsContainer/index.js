/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Form,
  Divider,
  PageHeader,
} from 'antd';
import 'survey-react/survey.css';
import * as Survey from 'survey-react';
import {
  fetchQuestions
} from '@/actions/questionsSurveyActions';

import '../index.scss';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class AttitudeAndSkillsContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;

    fetchQuestions({ questionType: 'attitude_and_skills' });
  }

  onFinish = data => {
    console.log('🚀 ~ file: index.js ~ line 62 ~ AttitudeAndSkillsContainer ~ data', data);
  }

  sendDataToServer = (sender) => {
    const resultAsString = JSON.stringify(sender.data);
    console.log('🚀 ~ file: index.js ~ line 50 ~ AttitudeAndSkillsContainer ~ resultAsString', resultAsString);
  }

  questions = () => {
    const { items } = this.props;
    const pageElements = items.map((item) => ({
      'type': 'rating',
      'name': `questionScore${item.id}`,
      'title': item.attributes.content,
      'isRequired': true,
      'rateMin': 1,
      'rateMax': 10,
    }));

    return {
      'completedHtml': '<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>',
      'pages': [
        {
          'name': 'page1',
          'elements': pageElements
        }
      ],
    };
  }

  render() {
    return (
      <div className="attitude-and-skills-container">
        <PageHeader
          className="site-page-header"
          title="Attitude And Skills"
        />
        <Divider />
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Row gutter={[24, 24]}>
            <Survey.Survey
              json={this.questions()}
              onComplete={this.sendDataToServer}
            />
          </Row>
        </Form>
      </div>
    );
  }
}

AttitudeAndSkillsContainer.propTypes = {
  items: PropTypes.array,
  fetchQuestions: PropTypes.func,
};

const mapStateToProps = ({ questionsSurvey, error }) => ({
  items: questionsSurvey.items,
  loading: questionsSurvey.loading,
});

export default connect(
  mapStateToProps, {
  fetchQuestions,
})(AttitudeAndSkillsContainer);
