import React, { useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Row, Col, Table, Button, Divider, Typography, PageHeader } from 'antd';

import FilterForm from '@/containers/Reports/Filter';
import './index.scss';
import { getReporting } from '@/services/report.service';
import report from '../Coaching/CoachingPPP/report';

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
    console.log(data.type);
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
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '2',
          category: 'Occupancy',
          current_expenses: temp.current_expenses.occupancy,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '3',
          category: 'H&P Resources',
          current_expenses: temp.current_expenses.hp_resource,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '4',
          category: 'Supplies',
          current_expenses: temp.current_expenses.supplies,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '5',
          category: 'Products',
          current_expenses: temp.current_expenses.products,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '6',
          category: 'Services',
          current_expenses: temp.current_expenses.services,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '7',
          category: 'Mktng/Sales',
          current_expenses: temp.current_expenses.marketing_sales,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '8',
          category: 'Overhead Total',
          current_expenses: temp.current_expenses.overhead_total,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '9',
          category: 'HYG Salaries',
          current_expenses: temp.current_expenses.hyg_salaries,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
        },
        {
          key: '10',
          category: 'All Expenses',
          current_expenses: temp.current_expenses.all_expenses,
          pct_of_production: 0,
          hygiene_target: 0,
          variance: 0,
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

  console.log('oform', reportData);
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
            <Row className="mb-15">
              <Col span={8}>
                <Text>UNPAID BILLS</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.unpaid_bills}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Production</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.production}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Collections</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.collections}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col offset={8} span={2} className="border-bottom">
                <Text>{reportData.percentage_of_production}</Text>
              </Col>
              <Text>% of Production</Text>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Actual R/L</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.actual.rl}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Actual B/L</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.actual.bl}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Debt Payments</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.debt_payments}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Net Solv</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>{reportData.net_solv}%</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Actual G/L</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.actual.gl}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Net ROI Funds</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>{reportData.net_roi_funds}%</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Actual Bal</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.actual.bal}</Text>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row className="mb-15">
              <Col span={8}>
                <Text>TOTAL SHORT TERM DEBT:</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.total_short_term_debt}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Avg. Prod/Mo:</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.average.prod_per_month}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Avg Coll/Mo</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.average.collections_per_month}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Budgeted B/L</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.budgeted_bl}</Text>
              </Col>
            </Row>

            <Row className="mb-15" style={{ marginTop: '80px' }}>
              <Col span={8}>
                <Text>Budgeted Balance</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.budgeted_balance}</Text>
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
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => <span>{text}%</span>,
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
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => <span>{text}%</span>,
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
          <Text>FOR &nbsp;</Text>
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
            <Row className="mb-15">
              <Col span={8}>
                <Text>Hyg. Prod/Mo:</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.hyg_prod_mo}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Hyg Sales/Mo:</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.hyg_sales_mo}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Hyg Total/Mo:</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.hyg_total_mo}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>% of Total</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>{reportData.pct_of_total}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Profit</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.profit}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Patient</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>{reportData.patient}%</Text>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row className="mb-15">
              <Col span={8}>
                <Text>Avg. Prod/Ytd:</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.avt_prod_ytd}</Text>
              </Col>
            </Row>

            <Row className="mb-15" style={{ marginTop: '80px' }}>
              <Col span={8}>
                <Text>Avg. Total/Ytd</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>${reportData.avg_total_ytd}</Text>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <Text>% of Total</Text>
              </Col>
              <Col span={12} className="border-bottom">
                <Text>{reportData.pct_of_avg_ytd}</Text>
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
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => <span>{text}%</span>,
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
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',
                  ellipsis: true,
                  render: (text) => <span>{text}%</span>,
                },
              ]}
              dataSource={reportData.prod_patient_visits}
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
