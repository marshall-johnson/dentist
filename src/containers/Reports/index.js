import React, { useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Row, Col, Table, Button, Divider, Typography, PageHeader } from 'antd';

import FilterForm from '@/containers/Reports/Filter';
import './index.scss';
import { getReporting } from '@/services/report.service';

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
    period: 'January',
    date: 2022,
    caseRatio: 50,
    recareRatio: 0,
  },
];

const ReportingContainer = () => {
  const [filter, setFilter] = useState({ month: '', year: '', type: 'one' });
  const [compRef, setCompRef] = useState({});
  const [formStyle, setFormStyle] = useState('one');
  const [reportData, setReportData] = useState({
    table: [
      {
        key: '1',
        category: 'Staff',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '2',
        category: 'Occupancy',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '3',
        category: 'H&P Resources',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '4',
        category: 'Supplies',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '5',
        category: 'Laboratory',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '6',
        category: 'Services',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '7',
        category: 'Mktng/Sales',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },

      {
        key: '8',
        category: 'Overhead Total',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '9',
        category: 'DRS Salaries',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
      {
        key: '10',
        category: 'All Expenses',
        totalAmount: 0,
        collectionsPercent: 0,
        interimBudget: 0,
        interimVariance: 0,
        cpdTarget: 0,
        cpdVariance: 0,
      },
    ],
    unpaid_bills: 0,
    production: 0,
    collections: 0,
    percentage_of_production: 0,
    actual: {
      rl: 0,
      bl: 0,
      gl: 0,
      bal: 0,
    },
    total_short_term_debt: 0,
    net_roi_funds: 0,
    prod_hour_scheduled: [
      {
        name: '',
        value: 0,
      },
    ],
    prod_patient_visits: [
      {
        name: '',
        value: 0,
      },
    ],
    debt_payments: 0,
    net_solv: 0,
    avg_prod_mo: 0,
    avg_coll_mo: 0,
    budgeted_bl: 0,
    budgeted_gl: 0,
    budgeted_rl: 0,
    budgeted_balance: 0,
    average: {
      prod_per_month: 0,
      collections_per_month: 0,
    },
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };

  const columns = [
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
    },
    {
      title: 'TOTAL AMOUNT',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      ellipsis: true,
    },
    {
      title: '% OF COLLECTIONS',
      dataIndex: 'collectionsPercent',
      key: 'collectionsPercent',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
    {
      title: 'INTERIM BUDGET',
      dataIndex: 'interimBudget',
      key: 'interimBudget',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
    {
      title: 'INTERIM VARIANCE',
      dataIndex: 'interimVariance',
      key: 'interimVariance',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
    {
      title: 'CPD TARGET',
      dataIndex: 'cpdTarget',
      key: 'cpdTarget',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
    {
      title: 'CPD VARIANCE',
      dataIndex: 'cpdVariance',
      key: 'cpdVariance',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
  ];
  const columnsHygiene = [
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
    },
    {
      title: 'CURRENT EXPENSES',
      dataIndex: 'current_expenses',
      key: 'current_expenses',
      ellipsis: true,
    },
    {
      title: '% OF PRODUCTION',
      dataIndex: 'pct_of_production',
      key: 'pct_of_production',
      ellipsis: true,
    },
    {
      title: 'HYGIENE TARGET',
      dataIndex: 'hygiene_target',
      key: 'hygiene_target',
      ellipsis: true,
    },
    {
      title: 'VARIANCE',
      dataIndex: 'variance',
      key: 'variance',
      ellipsis: true,
    },
  ];
  const onFilterChange = async (data) => {
    setFilter(data);
    setFormStyle(data.type);
    const temp = await fetchReport(data);
    console.log('temo', temp);
    let mapped = [];
    if (data.type === 'one') {
      mapped = [
        {
          key: '1',
          category: 'Staff',
          totalAmount: temp.total_amount.staff,
          collectionsPercent: temp.percentage_of_collections.staff,
          interimBudget: temp.interim_budget.staff,
          interimVariance: temp.interim_budget_variance.staff,
          cpdTarget: temp.cpd_target.staff,
          cpdVariance: temp.cpd_variance.staff,
        },
        {
          key: '2',
          category: 'Occupancy',
          totalAmount: temp.total_amount.occupancy,
          collectionsPercent: temp.percentage_of_collections.occupancy,
          interimBudget: temp.interim_budget.occupancy,
          interimVariance: temp.interim_budget_variance.occupancy,
          cpdTarget: temp.cpd_target.occupancy,
          cpdVariance: temp.cpd_variance.occupancy,
        },
        {
          key: '3',
          category: 'H&P Resources',
          totalAmount: temp.total_amount.hp_resource,
          collectionsPercent: temp.percentage_of_collections.hp_resource,
          interimBudget: temp.interim_budget.hp_resource,
          interimVariance: temp.interim_budget_variance.hp_resource,
          cpdTarget: temp.cpd_target.hp_resource,
          cpdVariance: temp.cpd_variance.hp_resource,
        },
        {
          key: '4',
          category: 'Supplies',
          totalAmount: temp.total_amount.supplies,
          collectionsPercent: temp.percentage_of_collections.supplies,
          interimBudget: temp.interim_budget.supplies,
          interimVariance: temp.interim_budget_variance.supplies,
          cpdTarget: temp.cpd_target.supplies,
          cpdVariance: temp.cpd_variance.supplies,
        },
        {
          key: '5',
          category: 'Laboratory',
          totalAmount: temp.total_amount.laboratory,
          collectionsPercent: temp.percentage_of_collections.laboratory,
          interimBudget: temp.interim_budget.laboratory,
          interimVariance: temp.interim_budget_variance.laboratory,
          cpdTarget: temp.cpd_target.laboratory,
          cpdVariance: temp.cpd_variance.laboratory,
        },
        {
          key: '6',
          category: 'Services',
          totalAmount: temp.total_amount.services,
          collectionsPercent: temp.percentage_of_collections.services,
          interimBudget: temp.interim_budget.services,
          interimVariance: temp.interim_budget_variance.services,
          cpdTarget: temp.cpd_target.services,
          cpdVariance: temp.cpd_variance.services,
        },
        {
          key: '7',
          category: 'Mktng/Sales',
          totalAmount: temp.total_amount.marketing_sales,
          collectionsPercent: temp.percentage_of_collections.marketing_sales,
          interimBudget: temp.interim_budget.marketing_sales,
          interimVariance: temp.interim_budget_variance.marketing_sales,
          cpdTarget: temp.cpd_target.marketing_sales,
          cpdVariance: temp.cpd_variance.marketing_sales,
        },
        {
          key: '8',
          category: 'Overhead Total',
          totalAmount: temp.total_amount.overhead_total,
          collectionsPercent: temp.percentage_of_collections.overhead_total,
          interimBudget: temp.interim_budget.overhead_total,
          interimVariance: temp.interim_budget_variance.overhead_total,
          cpdTarget: temp.cpd_target.overhead_total,
          cpdVariance: temp.cpd_variance.overhead_total,
        },
        {
          key: '9',
          category: 'DRS Salaries',
          totalAmount: temp.total_amount.drs_salaries,
          collectionsPercent: temp.percentage_of_collections.drs_salaries,
          interimBudget: temp.interim_budget.drs_salaries,
          interimVariance: temp.interim_budget_variance.drs_salaries,
          cpdTarget: temp.cpd_target.drs_salaries,
          cpdVariance: temp.cpd_variance.drs_salaries,
        },
        {
          key: '10',
          category: 'All Expenses',
          totalAmount: temp.total_amount.all_expenses,
          collectionsPercent: temp.percentage_of_collections.all_expenses,
          interimBudget: temp.interim_budget.all_expenses,
          interimVariance: temp.interim_budget_variance.all_expenses,
          cpdTarget: temp.cpd_target.all_expenses,
          cpdVariance: temp.cpd_variance.all_expenses,
        },
      ];
    }
    let mappedHygiene = [];
    if (data.type === 'two') {
      mappedHygiene = [
        {
          key: '1',
          category: 'Staff',
          current_expenses: temp.current_expenses.staff,
          pct_of_production: temp.percentage_of_production.staff,
          hygiene_target: temp.hygiene_target.staff,
          variance: temp.variance.staff,
        },
        {
          key: '2',
          category: 'Occupancy',
          current_expenses: temp.current_expenses.occupancy,
          pct_of_production: temp.percentage_of_production.occupancy,
          hygiene_target: temp.hygiene_target.occupancy,
          variance: temp.variance.occupancy,
        },
        {
          key: '3',
          category: 'H&P Resources',
          current_expenses: temp.current_expenses.hp_resource,
          pct_of_production: temp.percentage_of_production.hp_resource,
          hygiene_target: temp.hygiene_target.hp_resource,
          variance: temp.variance.hp_resource,
        },
        {
          key: '4',
          category: 'Supplies',
          current_expenses: temp.current_expenses.supplies,
          pct_of_production: temp.percentage_of_production.supplies,
          hygiene_target: temp.hygiene_target.supplies,
          variance: temp.variance.supplies,
        },
        {
          key: '5',
          category: 'Products',
          current_expenses: temp.current_expenses.products,
          pct_of_production: temp.percentage_of_production.products,
          hygiene_target: temp.hygiene_target.products,
          variance: temp.variance.products,
        },
        {
          key: '6',
          category: 'Services',
          current_expenses: temp.current_expenses.services,
          pct_of_production: temp.percentage_of_production.services,
          hygiene_target: temp.hygiene_target.services,
          variance: temp.variance.services,
        },
        {
          key: '7',
          category: 'Mktng/Sales',
          current_expenses: temp.current_expenses.marketing_sales,
          pct_of_production: temp.percentage_of_production.marketing_sales,
          hygiene_target: temp.hygiene_target.marketing_sales,
          variance: temp.variance.marketing_sales,
        },
        {
          key: '8',
          category: 'Overhead Total',
          current_expenses: temp.current_expenses.overhead_total,
          pct_of_production: temp.percentage_of_production.overhead_total,
          hygiene_target: temp.hygiene_target.overhead_total,
          variance: temp.variance.overhead_total,
        },
        {
          key: '9',
          category: 'HYG Salaries',
          current_expenses: temp.current_expenses.hyg_salaries,
          pct_of_production: temp.percentage_of_production.hyg_salaries,
          hygiene_target: temp.hygiene_target.hyg_salaries,
          variance: temp.variance.hyg_salaries,
        },
        {
          key: '10',
          category: 'All Expenses',
          current_expenses: temp.current_expenses.all_expenses,
          pct_of_production: temp.percentage_of_production.all_expenses,
          hygiene_target: temp.hygiene_target.all_expenses,
          variance: temp.variance.all_expenses,
        },
      ];
    }

    setReportData({
      ...reportData,
      table: data.type === 'one' ? mapped : mappedHygiene,
      ...temp,
    });
  };

  const fetchReport = async (args) => {
    const res = await getReporting(args);
    return res;
  };

  const renderStyleRow = (record, index) => {
    if (index == 7) {
      return 'dashed_row';
    }
    if (index == 8) {
      return 'dashed_row';
    }
    if (index == 9) {
      return 'ae_style';
    }
    return '';
  };

  const renderFormType1 = () => (
    <div
      className="search-result-list"
      // eslint-disable-next-line no-return-assign
      ref={(el) => setCompRef(el)}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="mb-10">
          <Title level={3}>PROFITABILITY MANAGEMENT CONTROLLER REPORT</Title>
        </div>
        <div>
          <Text className="border-bottom">
            {filter.month && filter.year && `${filter.month}-${filter.year}`}
          </Text>
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
        rowClassName={renderStyleRow}
        size="small"
        pagination={false}
        columns={columns}
        dataSource={reportData.table}
        onChange={handleChange}
      />
      <br />

      <div style={{ padding: '0 8px' }}>
        <Row gutter={24}>
          <Col span={12}>
            <Row className="mb-15" style={{ color: 'purple' }}>
              <Col span={8}>
                <p>UNPAID BILLS</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.unpaid_bills}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Production</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.production}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Collections</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.collections}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col offset={8} span={2} className="border-bottom">
                <p>{reportData.percentage_of_production}</p>
              </Col>
              <p>% of Production</p>
            </Row>
            <Row className="mb-15" style={{ color: 'orange' }}>
              <Col span={8}>
                <p>Actual R/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.actual.rl}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Actual B/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.actual.bl}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col offset="1" span={7}>
                <p>Debt Payments</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.debt_payments}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col offset="1" span={7}>
                <p>Net Solv</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.net_solv}%</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Actual G/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.actual.gl}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Net ROI Funds</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.net_roi_funds}%</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Actual Bal</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.actual.bal}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Receivables</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.receivables}</p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row className="mb-15" style={{ color: 'purple' }}>
              <Col span={8}>
                <p>TOTAL SHORT TERM DEBT:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.total_short_term_debt}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Avg. Prod/Mo:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.average.prod_per_month}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Avg Coll/Mo</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.average.collections_per_month}</p>
              </Col>
            </Row>
            <Row
              className="mb-15"
              style={{ color: 'orange', marginTop: '35px' }}
            >
              <Col span={8}>
                <p>Budgeted R/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.budgeted_rl}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Budgeted B/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.budgeted_bl}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Budgeted G/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.budgeted_gl}</p>
              </Col>
            </Row>

            <Row className="mb-15" style={{ marginTop: '80px' }}>
              <Col span={8}>
                <p>Budgeted Balance</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.budgeted_balance}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Prod/Hour Scheduled
            </div>
            <Table
              size="small"
              showHeader={false}
              pagination={false}
              columns={[
                {
                  title: '',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>{text}</span>
                  ),
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>${text}</span>
                  ),
                },
              ]}
              dataSource={reportData.prod_hour_scheduled}
            />
          </Col>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Prod/Patient
            </div>
            <Table
              size="small"
              showHeader={false}
              pagination={false}
              columns={[
                {
                  title: '',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>{text}</span>
                  ),
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>${text}</span>
                  ),
                },
              ]}
              dataSource={reportData.prod_patient_visits}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
  const renderFormHygiene = () => (
    <div
      className="search-result-list"
      // eslint-disable-next-line no-return-assign
      ref={(el) => setCompRef(el)}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="mb-10">
          <Title level={3}>PROFITABILITY MANAGEMENT CONTROLLER REPORT</Title>
          <Title level={3}>HYGIENE AS A PROFIT CENTER</Title>
        </div>
        <div>
          <Text className="border-bottom">
            {filter.month && filter.year && `${filter.month}-${filter.year}`}
          </Text>
        </div>
        <br />
        <div>
          <p>FOR &nbsp;</p>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
      </div>
      <br />

      <br />

      <Table
        rowClassName={renderStyleRow}
        size="small"
        pagination={false}
        columns={columnsHygiene}
        dataSource={reportData.table}
        onChange={handleChange}
      />
      <br />

      <div style={{ padding: '0 8px' }}>
        <Row gutter={24}>
          <Col span={12}>
            <Row className="mb-15" style={{ color: 'blue ' }}>
              <Col span={8}>
                <p>Hyg. Prod/Mo:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.hyg_prod_mo}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Hyg Sales/Mo:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.hyg_sales_mo}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Hyg Total/Mo:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.hyg_total_mo}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>% of Total</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.pct_of_total}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Profit</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.profit}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Patient</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.patient}%</p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Avg. Prod/Ytd:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.avt_prod_ytd}</p>
              </Col>
            </Row>

            <Row className="mb-15" style={{ marginTop: '80px' }}>
              <Col span={8}>
                <p>Avg. Total/Ytd</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>${reportData.avg_total_ytd}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>% of Total</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.pct_of_avg_ytd}</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Prod/Hour
            </div>
            <Table
              size="small"
              showHeader={false}
              pagination={false}
              columns={[
                {
                  title: '',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>{text}</span>
                  ),
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>${text}</span>
                  ),
                },
              ]}
              dataSource={reportData.prod_hour}
            />
          </Col>
          <Col span={12}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Prod/Patient
            </div>
            <Table
              size="small"
              showHeader={false}
              pagination={false}
              columns={[
                {
                  title: '',
                  dataIndex: 'name',
                  key: 'name',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>{text}</span>
                  ),
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => (
                    <span style={{ color: 'blue' }}>${text}</span>
                  ),
                },
              ]}
              dataSource={reportData.prod_patient}
            />
          </Col>
        </Row>
      </div>
    </div>
  );

  const renderForm = () => {
    switch (formStyle) {
      case 'one':
        return renderFormType1();
      case 'two':
        return renderFormHygiene();
      default:
        return null;
    }
  };

  return (
    <div className="reporting-container">
      <PageHeader className="site-page-header" title="Reporting" />
      <Divider />

      <FilterForm value={filter} onSubmitCallback={onFilterChange} />
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
            content={() => compRef}
          />
        </Col>
      </Row>
      <div>{renderForm()}</div>
    </div>
  );
};

export default ReportingContainer;
