/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Form,
  Divider,
  PageHeader,
  Select,
  Spin,
  notification,
} from 'antd';
import 'survey-react/survey.css';
import * as Survey from 'survey-react';
import { fetchQuestions } from '@/actions/questionsSurveyActions';
import { fetchStudents } from '@/actions/studentActions';
import { submitStudentSurvey } from '@/actions/studentSurveyAction';

import '../index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { TYPE_ENERGY_SURVEYS, UserAccountType } from '@/constants';

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
      selectedStudentId: null,
      selectedType: null,
      completed: false,
      loading: false,
    };
  }

  componentDidMount() {
    const {
      fetchQuestions,
      fetchStudents,
      questionType,
      currentUser,
    } = this.props;

    if (
      [UserAccountType.ADMIN, UserAccountType.STUDENT_ADMIN].includes(
        currentUser?.account_type,
      )
    ) {
      fetchStudents();
    }
    fetchQuestions({ questionType });
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
      completedHtml: '<h3>Thank you for your feedback.</h3>',
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

  sendDataToServer = async (sender, options) => {
    if (
      !this.formRef.current.getFieldValue('student') ||
      !this.formRef.current.getFieldValue('type')
    ) {
      this.formRef.current.submit();
      options.allowComplete = false;
      return;
    }

    const { submitStudentSurvey } = this.props;
    const { selectedStudentId, selectedType } = this.state;
    const result = await submitStudentSurvey(
      selectedStudentId,
      selectedType,
      this.formatSenderData(sender.data),
    );

    if (!result) {
      options.allowComplete = false;
      notification.error({
        message: 'Something went wrong. Please try again!',
      });
    } else {
      this.setState({
        completed: true,
      });
    }
  };

  render() {
    const { students, title } = this.props;
    const { loading, completed } = this.state;

    return (
      <div className="base-energy-container">
        <PageHeader
          className="site-page-header"
          title={title}
          style={{ marginBottom: 10 }}
        />
        <Form ref={this.formRef} validateMessages={validateMessages}>
          <Row style={{ alignItems: 'center', flexDirection: 'row' }}>
            <div style={{ marginRight: 30 }}>
              <Form.Item
                label="Student"
                name="student"
                rules={[
                  {
                    required: true,
                    message: 'Please pick a Student!',
                  },
                ]}
              >
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  onSelect={async (id) => {
                    this.setState({
                      selectedStudentId: id,
                    });

                    if (completed) {
                      this.setState({
                        loading: true,
                      });

                      setTimeout(() => {
                        this.setState({
                          loading: false,
                          completed: false,
                        });
                      }, 500);
                    }
                  }}
                >
                  {students.map((student, index) => (
                    <Option value={student.id} key={index.toString()}>
                      {`${student.first_name} ${student.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Please pick a Type!',
                  },
                ]}
              >
                <Select
                  style={{ width: 200, marginLeft: 10 }}
                  onSelect={async (type) => {
                    this.setState({
                      selectedType: type,
                    });

                    if (completed) {
                      this.setState({
                        loading: true,
                      });

                      setTimeout(() => {
                        this.setState({
                          loading: false,
                          completed: false,
                        });
                      }, 500);
                    }
                  }}
                >
                  {TYPE_ENERGY_SURVEYS.map((data, index) => (
                    <Option value={data.value} key={index.toString()}>
                      {data.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Row>

          <Divider />
          {loading ? (
            <Spin
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 50,
              }}
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          ) : (
            <Row gutter={[24, 24]}>
              <Survey.Survey
                json={this.questions()}
                onCompleting={this.sendDataToServer}
              />
            </Row>
          )}
        </Form>
      </div>
    );
  }
}

BaseContainer.propTypes = {
  items: PropTypes.array,
  students: PropTypes.array,
  questionType: PropTypes.string,
  title: PropTypes.string,
  fetchQuestions: PropTypes.func,
  fetchStudents: PropTypes.func,
  submitStudentSurvey: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = ({
  questionsSurvey,
  student,
  studentSurvey,
  auth,
}) => ({
  items: questionsSurvey.items,
  studentSurveyItems: studentSurvey.items,
  students: student.items,
  loading: student.loading,
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, {
  fetchQuestions,
  fetchStudents,
  submitStudentSurvey,
})(BaseContainer);
