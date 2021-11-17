/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Form, Divider, PageHeader, Select } from 'antd';
import 'survey-react/survey.css';
import * as Survey from 'survey-react';
import { fetchQuestions } from '@/actions/questionsSurveyActions';
import { fetchStudents } from '@/actions/studentActions';
import {
  fetchStudentSurveys,
  submitStudentSurvey,
} from '@/actions/studentSurveyAction';

import '../index.scss';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const { Option } = Select;

class EnergyContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      fetchedResult: false,
      selectedStudentId: null,
      successSendData: true,
    };
  }

  componentDidMount() {
    const { fetchQuestions, fetchStudents } = this.props;

    fetchStudents();
    fetchQuestions({ questionType: 'energy' });
  }

  onFinish = (data) => {
    console.log('🚀 ~ file: index.js ~ line 62 ~ EnergyContainer ~ data', data);
  };

  sendDataToServer = async (sender) => {
    const { submitStudentSurvey } = this.props;
    const { selectedStudentId } = this.state;
    const success = await submitStudentSurvey(
      selectedStudentId,
      this.formatSenderData(sender.data),
    );

    this.setState({
      successSendData: success,
    });
  };

  formatSenderData = (data) =>
    Object.keys(data).map((key) => {
      const id = key.split('_')[1];
      return {
        questions_survey_id: id,
        result: data[key],
      };
    });

  questions = () => {
    const { items } = this.props;
    const pageElements = items.map((item) => ({
      type: 'rating',
      name: `result_${item.id}`,
      title: item.attributes.content,
      isRequired: true,
      rateMin: 1,
      rateMax: 10,
    }));

    return {
      completedHtml:
        '<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>',
      pages: [
        {
          name: 'page1',
          elements: pageElements,
        },
      ],
    };
  };

  render() {
    const { students, fetchStudentSurveys, studentSurveyItems } = this.props;
    const { fetchedResult, successSendData } = this.state;

    return (
      <div className="energy-container">
        <PageHeader
          className="site-page-header"
          title="Energy"
          style={{ marginBottom: 10 }}
        />
        <span>Students:</span>
        <Select
          style={{ width: 200, marginLeft: 10 }}
          onChange={async (id) => {
            this.setState({
              selectedStudentId: id,
            });
            await fetchStudentSurveys(id, 'energy');
            this.setState({
              fetchedResult: true,
            });
          }}
        >
          {students.map((student) => (
            <Option value={student.id}>
              {`${student.first_name} ${student.last_name}`}
            </Option>
          ))}
        </Select>
        <Divider />
        {!successSendData && (
          <div className="sv_main sv_default_css">
            <form>
              <div className="sv_custom_header" />
              <div className="sv_container">
                <div className="sv_body sv_completed_page">
                  <h3>Something went wrong at the moment !</h3>
                  <h5>Please select student and retry again</h5>
                </div>
              </div>
            </form>
          </div>
        )}
        {successSendData &&
          fetchedResult &&
          (studentSurveyItems.length > 0 ? (
            <div className="sv_main sv_default_css">
              <form>
                <div className="sv_custom_header" />
                <div className="sv_container">
                  <div className="sv_body sv_completed_page">
                    <h3>Thank you for your feedback.</h3>
                    <h5>
                      Your thoughts and ideas will help us to create a great
                      product!
                    </h5>
                  </div>
                </div>
              </form>
            </div>
          ) : (
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
          ))}
      </div>
    );
  }
}

EnergyContainer.propTypes = {
  items: PropTypes.array,
  students: PropTypes.array,
  studentSurveyItems: PropTypes.array,
  fetchQuestions: PropTypes.func,
  fetchStudents: PropTypes.func,
  fetchStudentSurveys: PropTypes.func,
  submitStudentSurvey: PropTypes.func,
};

const mapStateToProps = ({
  questionsSurvey,
  student,
  studentSurvey,
  error,
}) => ({
  items: questionsSurvey.items,
  studentSurveyItems: studentSurvey.items,
  students: student.items,
  loading: questionsSurvey.loading,
});

export default connect(mapStateToProps, {
  fetchQuestions,
  fetchStudents,
  fetchStudentSurveys,
  submitStudentSurvey,
})(EnergyContainer);
