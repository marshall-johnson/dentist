import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Row, Col, Table, Button, Divider, Typography, PageHeader } from 'antd';

import FilterForm from '@/containers/Reports/Filter';
import './index.scss';

const { Text, Title } = Typography;

const columnsFirst = [
  {
    title: 'Period',
    dataIndex: 'period',
    key: 'period',
    ellipsis: true,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    ellipsis: true,
  },
  {
    title: 'Case ratio',
    dataIndex: 'caseRatio',
    key: 'caseRatio',
    ellipsis: true,
  },
  {
    title: 'Recare Ratio',
    dataIndex: 'recareRatio',
    key: 'recareRatio',
    ellipsis: true,
  },
];

const dataFirst = [
  {
    key: '1',
    period: 'November',
    date: 2021,
    caseRatio: 50,
    recareRatio: 0,
  },
];

const data = [
  {
    key: '1',
    category: 'Staff',
    totalAmount: 22210.11,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 48.95,
    cpdTarget: 0,
    cpdVariance: 48.95,
  },
  {
    key: '2',
    category: 'Services',
    totalAmount: 5605.5,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 12.35,
    cpdTarget: 0,
    cpdVariance: 12.35,
  },

  {
    key: '3',
    category: 'Occupancy',
    totalAmount: 6083.55,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 13.41,
    cpdTarget: 0,
    cpdVariance: 13.41,
  },
  {
    key: '4',
    category: 'Mktng/Sales',
    totalAmount: 90.12,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 0.2,
    cpdTarget: 0,
    cpdVariance: 0.2,
  },
  {
    key: '5',
    category: 'Laboratory',
    totalAmount: 2157.62,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 4.76,
    cpdTarget: 0,
    cpdVariance: 4.76,
  },
  {
    key: '6',
    category: 'H&P Resources',
    totalAmount: 6294.97,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 13.87,
    cpdTarget: 0,
    cpdVariance: 13.87,
  },
  {
    key: '7',
    category: 'Overhead Total',
    totalAmount: 47225.52,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 104.08,
    cpdTarget: 0,
    cpdVariance: 104.08,
  },
  {
    key: '8',
    category: 'DRS Salaries',
    totalAmount: 0,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 0,
    cpdTarget: 0,
    cpdVariance: 0,
  },
  {
    key: '9',
    category: 'All Expenses',
    totalAmount: 47255.52,
    collectionsPercent: 0,
    interimBudget: 0,
    innterimVariance: 208.16,
    cpdTarget: 0,
    cpdVariance: 208.16,
  },
];

class ReportingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedInfo: null,
    };
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);

    this.setState({
      sortedInfo: sorter,
    });
  };

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: 'CATEGORY',
        dataIndex: 'category',
        key: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
        sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'TOTAL AMOUNT',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        sorter: (a, b) => a.totalAmount - b.totalAmount,
        sortOrder: sortedInfo.columnKey === 'totalAmount' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: '% OF COLLECTIONS',
        dataIndex: 'collectionsPercent',
        key: 'collectionsPercent',
        sorter: (a, b) => a.collectionsPercent - b.collectionsPercent,
        sortOrder:
          sortedInfo.columnKey === 'collectionsPercent' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'INTERIM BUDGET',
        dataIndex: 'interimBudget',
        key: 'interimBudget',
        sorter: (a, b) => a.interimBudget - b.interimBudget,
        sortOrder: sortedInfo.columnKey === 'interimBudget' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'INTERIM VARIANCE',
        dataIndex: 'innterimVariance',
        key: 'innterimVariance',
        sorter: (a, b) => a.innterimVariance - b.innterimVariance,
        sortOrder:
          sortedInfo.columnKey === 'innterimVariance' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'CPD TARGET',
        dataIndex: 'cpdTarget',
        key: 'cpdTarget',
        sorter: (a, b) => a.cpdTarget - b.cpdTarget,
        sortOrder: sortedInfo.columnKey === 'cpdTarget' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'CPD VARIANCE',
        dataIndex: 'cpdVariance',
        key: 'cpdVariance',
        sorter: (a, b) => a.cpdVariance - b.cpdVariance,
        sortOrder: sortedInfo.columnKey === 'cpdVariance' && sortedInfo.order,
        ellipsis: true,
      },
    ];

    const onFilterChange = (data) => {
      console.log(data);
    };

    return (
      <div className="reporting-container">
        <PageHeader className="site-page-header" title="Reporting" />
        <Divider />

        <FilterForm onSubmitCallback={onFilterChange} />
        <Divider />

        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <ReactToPrint
              trigger={() => <Button type="primary">Print</Button>}
              content={() => this.componentRef}
            />
          </Col>
        </Row>

        <div
          className="search-result-list"
          // eslint-disable-next-line no-return-assign
          ref={(el) => (this.componentRef = el)}
        >
          <div style={{ textAlign: 'center' }}>
            <div className="mb-10">
              <Title level={3}>
                PROFITABILITY MANAGEMENT CONTROLLER REPORT
              </Title>
            </div>
            <div>
              <Text className="border-bottom">Nov 1, 2020</Text>
            </div>
            <br />
            <div>
              <Text>FOR &nbsp;</Text>
              <Text className="border-bottom">&nbsp;</Text>
            </div>
          </div>
          <br />
          <Table
            size="small"
            pagination={false}
            columns={columnsFirst}
            dataSource={dataFirst}
          />

          <br />

          <Table
            size="small"
            pagination={false}
            columns={columns}
            dataSource={data}
            onChange={this.handleChange}
          />
          <br />

          <div style={{ padding: '0 8px' }}>
            <Row gutter={24}>
              <Col span={12}>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>UNPAID BILLS</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>34113.64</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Production</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>0</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Collections</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>45372.81</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col offset={10} span={1} className="border-bottom">
                    <Text>0</Text>
                  </Col>
                  <Text>% of Production</Text>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Actual R/L</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>47225.52</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Actual B/L</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>47225.52</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Debt Payments</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>1545</Text>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>TOTAL SHORT TERM DEBT:</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>75.19</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Avg. Prod/Mo:</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>0</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Avg Coll/Mo</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>45372.81</Text>
                  </Col>
                </Row>

                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Budgeted R/L</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>0</Text>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <Text>Budgeted B/L</Text>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <Text>0</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportingContainer;
