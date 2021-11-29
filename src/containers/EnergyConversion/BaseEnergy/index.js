/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Form, Divider, PageHeader, Select, Spin } from 'antd';
import 'survey-react/survey.css';
import * as Survey from 'survey-react';
import { fetchQuestions } from '@/actions/questionsSurveyActions';
import { fetchStudents } from '@/actions/studentActions';
import {
  fetchStudentSurveys,
  submitStudentSurvey,
} from '@/actions/studentSurveyAction';

import '../index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { TYPE_ENERGY_SURVEYS } from '@/constants';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

const { Option } = Select;

class BaseContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      fetchedResult: false,
      selectedStudentId: null,
      selectedType: null,
      successSendData: true,
      loading: false,
    };
  }

  componentDidMount() {
    const { fetchQuestions, fetchStudents, questionType } = this.props;

    fetchStudents();
    fetchQuestions({ questionType });
  }

  async onFetchSurvey(selectedStudentId, selectedType) {
    const { fetchStudentSurveys, questionType } = this.props;

    this.setState({
      loading: true,
    });

    if (!!selectedStudentId && !!selectedType) {
      try {
        await fetchStudentSurveys(selectedStudentId, { questionType });
      } finally {
        setTimeout(() => {
          this.setState({
            fetchedResult: true,
            loading: false,
          });
        }, 1000);
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  onFinish = (data) => {
    console.log('🚀 ~ file: index.js ~ line 62 ~ data', data);
  };

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

  formatSenderData = (data) =>
    Object.keys(data).map((key) => {
      const id = key.split('_')[1];
      return {
        questions_survey_id: id,
        result: data[key],
      };
    });

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

  render() {
    const { students, studentSurveyItems, title } = this.props;
    const {
      fetchedResult,
      successSendData,
      loading,
      selectedType,
      selectedStudentId,
    } = this.state;

    return (
      <div className="base-energy-container">
        <PageHeader
          className="site-page-header"
          title={title}
          style={{ marginBottom: 10 }}
        />
        <Row style={{ alignItems: 'center', flexDirection: 'row' }}>
          <div style={{ marginRight: 30 }}>
            <span>Students:</span>
            <Select
              style={{ width: 200, marginLeft: 10 }}
              onChange={async (id) => {
                this.setState({
                  selectedStudentId: id,
                });

                await this.onFetchSurvey(id, selectedType);
              }}
            >
              {students.map((student, index) => (
                <Option value={student.id} key={index.toString()}>
                  {`${student.first_name} ${student.last_name}`}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <span>Type:</span>
            <Select
              style={{ width: 200, marginLeft: 10 }}
              onChange={async (type) => {
                this.setState({
                  selectedType: type,
                });

                await this.onFetchSurvey(selectedStudentId, type);
              }}
            >
              {TYPE_ENERGY_SURVEYS.map((data, index) => (
                <Option value={data.value} key={index.toString()}>
                  {data.label}
                </Option>
              ))}
            </Select>
          </div>
        </Row>

        <Divider />
        {loading && (
          <Spin
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 50,
            }}
            indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          />
        )}
        {!successSendData &&
          !loading(
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
            </div>,
          )}
        {successSendData &&
          !loading &&
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

BaseContainer.propTypes = {
  items: PropTypes.array,
  students: PropTypes.array,
  questionType: PropTypes.string,
  title: PropTypes.string,
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
  loading: student.loading,
});

export default connect(mapStateToProps, {
  fetchQuestions,
  fetchStudents,
  fetchStudentSurveys,
  submitStudentSurvey,
})(BaseContainer);
