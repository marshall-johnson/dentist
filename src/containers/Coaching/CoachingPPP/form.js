import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Button, notification } from 'antd';
import { connect } from 'react-redux';
import { createCoachPppReport } from '@/actions/coachPppReportActions';
import EnterClientPage from './FormSteps/EnterClientPage';
import TotalInputPage from './FormSteps/TotalInputPage';
import SummaryPage from './FormSteps/SummaryPage';
import DetailDataPage from './FormSteps/DetailDataPage';
import { KEY } from './config';

class FormTab extends Component {
  clientRef = React.createRef();

  totalRef = React.createRef();

  detailRef = React.createRef();

  summaryRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      data: {},
      total: {},
    };
  }

  setTotal = (total) => {
    this.setState({
      total,
    });
  };

  goNext = () => {
    const { currentStep, data } = this.state;
    const nextTrigger = () => {
      this.setState({
        currentStep: currentStep + 1,
      });
    };

    if (currentStep === 0) {
      this.clientRef.current
        .validateFields()
        .then(() => {
          this.setState({
            data: {
              student: this.clientRef.current.getFieldValue().student,
            },
          });
          nextTrigger();
        })
        .catch((err) => console.log(err));
    }

    if (currentStep === 1) {
      this.totalRef.current
        .validateFields()
        .then(() => {
          this.setState({
            data: {
              ...data,
              report: {
                ...(data?.report || {}),
                ...this.totalRef.current.getFieldValue(),
              },
            },
          });
          nextTrigger();
        })
        .catch((err) => console.log(err));
    }

    if (currentStep === 2) {
      this.detailRef.current
        .validateFields()
        .then(() => {
          const formData = this.detailRef.current.getFieldValue();
          const detailData = {};

          Object.keys(KEY).forEach((key) => {
            if (formData[key]) {
              Object.keys(formData[key]).forEach((nestedKey) => {
                detailData[nestedKey] = formData[key][nestedKey];
              });
            }
          });

          this.setState({
            data: {
              ...data,
              report: {
                ...data?.report,
                ...detailData,
              },
            },
          });
          nextTrigger();
        })
        .catch((err) => console.log(err));
    }
  };

  onSubmit = () => {
    const { createCoachPppReport } = this.props;
    const { data } = this.state;

    createCoachPppReport(
      {
        ...data,
        report: {
          ...data.report,
          ...this.summaryRef.current.getFieldValue(),
        },
      },
      (success, message) => {
        if (success) {
          notification.success({
            message,
          });
        } else {
          notification.error({
            message,
          });
        }
      },
    );
  };

  goBack = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  render() {
    const { currentStep, data, total } = this.state;

    return (
      <>
        <div style={{ marginTop: 50, marginBottom: 30 }}>
          <div style={{ display: currentStep !== 0 && 'none' }}>
            <EnterClientPage formRef={this.clientRef} />
          </div>
          <div style={{ display: currentStep !== 1 && 'none' }}>
            <TotalInputPage formRef={this.totalRef} />
          </div>
          <div style={{ display: currentStep !== 2 && 'none' }}>
            <DetailDataPage formRef={this.detailRef} setTotal={this.setTotal} />
          </div>
          <div style={{ display: currentStep !== 3 && 'none' }}>
            <SummaryPage
              formRef={this.summaryRef}
              report={data?.report}
              total={total}
            />
          </div>
        </div>

        {currentStep !== 0 && (
          <Button
            type="secondary"
            onClick={this.goBack}
            style={{ marginRight: 20 }}
          >
            Back
          </Button>
        )}
        {currentStep !== 3 && (
          <Button
            type="primary"
            onClick={this.goNext}
            htmlType="submit"
            style={{ marginRight: 20 }}
          >
            Next
          </Button>
        )}
        {currentStep === 3 && (
          <Button
            type="primary"
            style={{ marginRight: 20, marginTop: 50 }}
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        )}
      </>
    );
  }
}

FormTab.propTypes = {
  createCoachPppReport: PropTypes.func,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  createCoachPppReport,
})(FormTab);
