import React, { Component } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Tag,
  Form,
  Input,
  Button,
  Divider,
  PageHeader,
} from 'antd';

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'is required!',
};

class ProfitScan extends Component {
  render() {
    return (
      <div className="profit-scan-container">
        <PageHeader
          className="site-page-header"
          title="CPD Profit Scan"
          tags={<Tag color="blue">{moment().format('MM/DD/YYYY')}</Tag>}
        />
        <Divider />

        <Row />

        <Row>
          <Col span={8}>
            <Form
              layout="vertical"
              validateMessages={validateMessages}
            >
              <Form.Item
                label="Office Collection Per Hour"
                name="officeCollectionPerHour"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('is not a valid number'))
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item
                label="Operational Cost Per Hour"
                name="operationalCostPerHour"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('is not a valid number'))
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Profit Per Hour [after Redline]"
                name="profitPerHour"
                rules={[
                  {
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      !isNaN(value) ?
                        Promise.resolve() :
                        Promise.reject(new Error('is not a valid number'))
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Revenue Growth Rate Last Year"
                name="revenueGrowthRateLastYear"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Revenue Growth Rate To Date This Year"
                name="revenueGrowthRateToDateThisYear"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Average Number Of New Patients"
                name="averageNumberOfNewPatients"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Current Annual Production"
                name="currentAnnualProduction"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item
                label="% Practice Debt Service"
                name="percentPracticeDebtService"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="% Personal Debt Service"
                name="percentPersonalDebtService"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Projected Growth Rate"
                name="projectedGrowthRate"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Production Potential"
                name="productionPotential"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item
                label="Profit Potential"
                name="profitPotential"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item
                label="Potential Salary"
                name="potentialSalary"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item
                label="Accumulation Potential 120 Months @ 10%"
                name="accumulationPotentialMonthsTenPercent"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item
                label="Accumulation Potential 120 Months @ 7%"
                name="accumulationPotentialMonthsTenPercent"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix='$'
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfitScan;
