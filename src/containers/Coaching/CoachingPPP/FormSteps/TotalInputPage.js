import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class TotalInputPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {},
    };
  }

  render() {
    const { initialValues } = this.state;
    const { formRef } = this.props;

    return (
      <Form
        ref={formRef}
        initialValues={initialValues}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="TOTAL PRODUCTION FOR SPENDING REPORT"
          name="total_production_for_spending_report"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PRODUCTION LAST CALENDAR YEAR"
          name="production_last_calendar_year"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="PRODUCTION 2 YEARS AGO"
          name="production_2_years_ago"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="TOTAL COLLECTIONS FOR SPENDING REPORT"
          name="total_collections_for_spending_report"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="COLLECTIONS LAST CALENDAR YEAR"
          name="collections_last_calendar_year"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label="COLLECTIONS 2 YEARS AGO"
          name="collections_2_years ago"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          label='AVG # NEW PATIENTS LAST 3 "TYPICAL" MONTHS'
          name="avg_new_patients_last_3_typical_months "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="AVG # OF DOCTOR PATIENT VISITS/MONTH"
          name="avg_of_doctor_patient_visits_month"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="AVG # OF CLINICAL HOURS WORKED/MONTH"
          name="avg_of_clinical_hours_worked_month"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="TOTAL PRACTICE DEBT PAYMENT/MONTH"
          name="total_practice_debt_payment_month"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="TOTAL PERSONAL DEBT PAYMENT/MONTH"
          name="total_personal_debt_payment_month"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }
}

TotalInputPage.propTypes = {
  formRef: PropTypes.object,
};

const mapStateToProps = ({ student }) => ({
  loading: student.loading,
});

export default withRouter(connect(mapStateToProps, {})(TotalInputPage));
