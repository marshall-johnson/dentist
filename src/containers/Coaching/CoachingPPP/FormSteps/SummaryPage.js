import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Table } from 'antd';
import moment from 'moment';
import { isNaN } from 'lodash';
import { KEY } from '../config';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class SummaryPage extends Component {
  columns = [
    {
      title: '',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: '',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (value) =>
        !isNaN(value) && value !== Infinity ? <span>{value} %</span> : '',
    },
    {
      title: '',
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => <span>$ {value}</span>,
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      initialValues: {},
      dataSource: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { total } = this.props;

    if (total !== prevProps.total) {
      const dataSource = [
        {
          field: 'STAFF SALARIES',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.staffCompensation]),
          amount: total[KEY.staffCompensation] || 0,
        },
        {
          field: 'OCCUPANCY',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.occupancy]),
          amount: total[KEY.occupancy] || 0,
        },
        {
          field: 'H&P RESOURCES',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.resourceDev]),
          amount: total[KEY.resourceDev] || 0,
        },
        {
          field: 'LABORATORY',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.laboratory]),
          amount: total[KEY.laboratory] || 0,
        },
        {
          field: 'SUPPLIES',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.supplies]),
          amount: total[KEY.supplies] || 0,
        },
        {
          field: 'SERVICES',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.adminServices]),
          amount: total[KEY.adminServices] || 0,
        },
        {
          field: 'MARKETING',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.marketing]),
          amount: total[KEY.marketing] || 0,
        },
        {
          field: 'TOTAL OVERHEAD',
          year: moment().year(),
          percentage: this.calculatePercentage(
            total[KEY.staffCompensation] ||
              0 + total[KEY.occupancy] ||
              0 + total[KEY.resourceDev] ||
              0 + total[KEY.laboratory] ||
              0 + total[KEY.supplies] ||
              0 + total[KEY.adminServices] ||
              0 + total[KEY.marketing] ||
              0,
          ),
          amount:
            total[KEY.staffCompensation] ||
            0 + total[KEY.occupancy] ||
            0 + total[KEY.resourceDev] ||
            0 + total[KEY.laboratory] ||
            0 + total[KEY.supplies] ||
            0 + total[KEY.adminServices] ||
            0 + total[KEY.marketing] ||
            0,
        },
        {
          field: 'DR SALARY',
          year: moment().year(),
          percentage: this.calculatePercentage(total[KEY.doctorComp]),
          amount: total[KEY.doctorComp] || 0,
        },
        {
          field: 'TOTAL EXPENSES',
          year: moment().year(),
          percentage: this.calculatePercentage(
            total[KEY.staffCompensation] ||
              0 + total[KEY.occupancy] ||
              0 + total[KEY.resourceDev] ||
              0 + total[KEY.laboratory] ||
              0 + total[KEY.supplies] ||
              0 + total[KEY.adminServices] ||
              0 + total[KEY.marketing] ||
              0 + total[KEY.doctorComp] ||
              0,
          ),
          amount:
            total[KEY.staffCompensation] ||
            0 + total[KEY.occupancy] ||
            0 + total[KEY.resourceDev] ||
            0 + total[KEY.laboratory] ||
            0 + total[KEY.supplies] ||
            0 + total[KEY.adminServices] ||
            0 + total[KEY.marketing] ||
            0 + total[KEY.doctorComp] ||
            0,
        },
        {
          field: 'ACTUAL SOLVENCY DEPOSITS',
          year: '',
          percentage: NaN,
          amount: total[KEY.solvency] || 0,
        },
        {
          field: 'ACTUAL ROI EXPENSES',
          year: '',
          percentage: NaN,
          amount: total[KEY.roi] || 0,
        },
      ];

      // eslint-disable-next-line
      this.setState({
        dataSource,
      });
    }
  }

  calculatePercentage(total) {
    const { report } = this.props;

    if (!total) return NaN;

    return (report.total_collections_for_spending_report / total).toFixed(2);
  }

  render() {
    const { initialValues, dataSource } = this.state;
    const { formRef } = this.props;

    return (
      <>
        <Table
          style={{ marginTop: 40, marginBottom: 50 }}
          dataSource={dataSource}
          columns={this.columns}
          pagination={false}
          showHeader={false}
        />
        <Form
          ref={formRef}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="PROJECTED GROWTH RATE"
            name="projected_growth_rate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>

          <Form.Item
            label="ASSUMED FINAL OVERHEAD IN PERCENTAGE"
            name="assumed_final_overhead_in_percentage"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>

          <Form.Item
            label="ESTIMATED FIRST IRR"
            name="estimated_first_irr"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>

          <Form.Item
            label="ESTIMATED SECOND IRR"
            name="estimated_second_irr"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input suffix="%" />
          </Form.Item>
        </Form>
      </>
    );
  }
}

SummaryPage.propTypes = {
  formRef: PropTypes.object,
  total: PropTypes.object,
  report: PropTypes.object,
};

const mapStateToProps = ({ student }) => ({
  loading: student.loading,
});

export default withRouter(connect(mapStateToProps, {})(SummaryPage));
