import React, { useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Row, Col, Table, Button, Divider, Typography, PageHeader } from 'antd';
import { formatCurrency } from '@/utils/helpers';
import Filter from '@/containers/Reports/Filter';
import './index.scss';
import { getReporting } from '@/services/report.service';
import moment from 'moment';

const { Text, Title } = Typography;

const DEFAULT_REPORT = {
  reportSix: {
    grand_total: {
      avail: 0,
      lost: 0,
      prod: 0,
      worked: 0,
      wrkd: 0,
      avg_avail: 0,
      avg_lost: 0,
      avg_prod: 0,
      avg_worked: 0,
      avg_wrkd: 0,
    },
    doctor_hours: [
      {
        name: '',
        avail: 0,
        lost: 0,
        prod: 0,
        worked: 0,
        wrkd: 0,
        avg_avail: 0,
        avg_lost: 0,
        avg_prod: 0,
        avg_worked: 0,
        avg_wrkd: 0,
      },
    ],
    hygiene_hours: [
      {
        name: '',
        avail: 0,
        lost: 0,
        prod: 0,
        worked: 0,
        wrkd: 0,
        avg_avail: 0,
        avg_lost: 0,
        avg_prod: 0,
        avg_worked: 0,
        avg_wrkd: 0,
      },
    ],
  },
  reportFive: {
    doctor_hours: [],
    doctor_percentage_of_available_hrs_scheduled: [],
    hygiene_hours: [],
    doctor_percent: {
      percentage_of_cancelled_hrs_recovered: {
        current_month: 0,
        ytd_avg_month: 0,
      },
      percentage_of_dr_capacity_used: { current_month: 0, ytd_avg_month: 0 },
      percentage_of_scheduled_hrs_cancelled: {
        current_month: 0,
        ytd_avg_month: 0,
      },
    },
    hygiene_percent: {
      percentage_of_available_hrs_scheduled: {
        current_month: 0,
        ytd_avg_month: 0,
      },
      percentage_of_cancelled_hrs_recovered: {
        current_month: 0,
        ytd_avg_month: 0,
      },
      percentage_of_dr_capacity_used: { current_month: 0, ytd_avg_month: 0 },
      percentage_of_scheduled_hrs_cancelled: {
        current_month: 0,
        ytd_avg_month: 0,
      },
    },
  },
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
  prod_hour: [
    {
      name: '',
      value: 0,
    },
  ],
  receivables: 0,
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
    pct_collections_per_month: 0,
    sales_per_month: 0,
    total_per_ytd: 0,
  },
  budget: {
    blue_line: 0,
    green_line: 0,
    red_line: 0,
    balance: 0,
  },
  total: {
    coll_ytd: 0,
    prod_ytd: 0,
    prod_per_ytd: 0,
    sales_per_ytd: 0,
  },
  profit: 0,
  avg_total_ytd: 0,
  avg_prod_ytd: 0,
  percentage_of_total: {
    month: 0,
    ytd: 0,
  },
};

const ReportingContainer = () => {
  const [filter, setFilter] = useState({
    month: null,
    year: null,
    studentId: null,
    dateValue: [{}],
    type: 'one',
  });
  const [compRef, setCompRef] = useState({});
  const [formStyle, setFormStyle] = useState('one');
  const [reportData, setReportData] = useState(DEFAULT_REPORT);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };
  const report6Cols = [
    {
      title: 'DOCTOR HOURS',
      dataIndex: 'name',
      keu: 'name',
      ellipsis: true,
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'WORKED',
          dataIndex: 'worked',
          keu: 'worked',
          ellipsis: true,
        },
        {
          title: 'PROD$',
          dataIndex: 'prod',
          keu: 'prod',
          ellipsis: true,
        },
        {
          title: 'WRKD',
          dataIndex: 'wrkd',
          keu: 'wrkd',
          ellipsis: true,
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avail',
          keu: 'avail',
          ellipsis: true,
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'lost',
          keu: 'lost',
          ellipsis: true,
        },
      ],
    },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          keu: 'avg_worked',
          ellipsis: true,
        },
        {
          title: 'PROD$',
          dataIndex: 'avg_prod',
          keu: 'avg_prod',
          ellipsis: true,
        },
        {
          title: 'WRKD',
          dataIndex: 'avg_wrkd',
          keu: 'avg_wrkd',
          ellipsis: true,
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avg_avail',
          keu: 'avg_avail',
          ellipsis: true,
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'avg_lost',
          keu: 'avg_lost',
          ellipsis: true,
        },
      ],
    },
  ];
  const report6HygCols = [
    {
      title: 'HYG HOURS',
      dataIndex: 'name',
      keu: 'name',
      ellipsis: true,
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'WORKED',
          dataIndex: 'worked',
          keu: 'worked',
          ellipsis: true,
        },
        {
          title: 'PROD$',
          dataIndex: 'prod',
          keu: 'prod',
          ellipsis: true,
        },
        {
          title: 'WRKD',
          dataIndex: 'wrkd',
          keu: 'wrkd',
          ellipsis: true,
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avail',
          keu: 'avail',
          ellipsis: true,
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'lost',
          keu: 'lost',
          ellipsis: true,
        },
      ],
    },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          keu: 'avg_worked',
          ellipsis: true,
        },
        {
          title: 'PROD$',
          dataIndex: 'avg_prod',
          keu: 'avg_prod',
          ellipsis: true,
        },
        {
          title: 'WRKD',
          dataIndex: 'avg_wrkd',
          keu: 'avg_wrkd',
          ellipsis: true,
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avg_avail',
          keu: 'avg_avail',
          ellipsis: true,
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'avg_lost',
          keu: 'avg_lost',
          ellipsis: true,
        },
      ],
    },
  ];
  const report5Cols = [
    {
      title: 'DOCTOR HOURS',
      dataIndex: 'name',
      keu: 'name',
      ellipsis: true,
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avail',
          keu: 'avail',
          ellipsis: true,
        },
        {
          title: 'SCHED',
          dataIndex: 'sched',
          keu: 'sched',
          ellipsis: true,
        },
        {
          title: 'CANC',
          dataIndex: 'canc',
          keu: 'canc',
          ellipsis: true,
        },
        {
          title: 'RECOV',
          dataIndex: 'recov',
          keu: 'recov',
          ellipsis: true,
        },
        {
          title: 'WORKED',
          dataIndex: 'worked',
          keu: 'worked',
          ellipsis: true,
        },
      ],
    },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avg_avail',
          keu: 'avg_avail',
          ellipsis: true,
        },
        {
          title: 'SCHED',
          dataIndex: 'avg_sched',
          keu: 'avg_sched',
          ellipsis: true,
        },
        {
          title: 'CANC',
          dataIndex: 'avg_canc',
          keu: 'avg_canc',
          ellipsis: true,
        },
        {
          title: 'RECOV',
          dataIndex: 'avg_recov',
          keu: 'avg_recov',
          ellipsis: true,
        },
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          keu: 'avg_worked',
          ellipsis: true,
        },
      ],
    },
  ];
  const report5HygCols = [
    {
      title: 'HYGIENE HOURS',
      dataIndex: 'name',
      keu: 'name',
      ellipsis: true,
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avail',
          keu: 'avail',
          ellipsis: true,
        },
        {
          title: 'SCHED',
          dataIndex: 'sched',
          keu: 'sched',
          ellipsis: true,
        },
        {
          title: 'CANC',
          dataIndex: 'canc',
          keu: 'canc',
          ellipsis: true,
        },
        {
          title: 'RECOV',
          dataIndex: 'recov',
          keu: 'recov',
          ellipsis: true,
        },
        {
          title: 'WORKED',
          dataIndex: 'worked',
          keu: 'worked',
          ellipsis: true,
        },
      ],
    },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avg_avail',
          keu: 'avg_avail',
          ellipsis: true,
        },
        {
          title: 'SCHED',
          dataIndex: 'avg_sched',
          keu: 'avg_sched',
          ellipsis: true,
        },
        {
          title: 'CANC',
          dataIndex: 'avg_canc',
          keu: 'avg_canc',
          ellipsis: true,
        },
        {
          title: 'RECOV',
          dataIndex: 'avg_recov',
          keu: 'avg_recov',
          ellipsis: true,
        },
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          keu: 'avg_worked',
          ellipsis: true,
        },
      ],
    },
  ];

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
      dataIndex: 'pct_of_productions',
      key: 'pct_of_productions',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
    {
      title: 'HYGIENE TARGET',
      dataIndex: 'hygiene_target',
      key: 'hygiene_target',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
    {
      title: 'VARIANCE',
      dataIndex: 'variance',
      key: 'variance',
      ellipsis: true,
      render: (text) => <span>{text}%</span>,
    },
  ];
  const onFilterChange = async (data) => {
    setFilter(data);
    setFormStyle(data.type);
    const temp = await fetchReport(data);
    let mapped = [];
    if (data.type === 'one' || data.type === 'three') {
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
      setReportData({
        ...DEFAULT_REPORT,
        ...temp,
        table: mapped,
      });
    }
    let mappedHygiene = [];
    if (data.type === 'two' || data.type === 'four') {
      mappedHygiene = [
        {
          key: '1',
          category: 'Staff',
          current_expenses: temp.current_expenses.staff,
          pct_of_productions: temp.percentage_of_productions.staff,
          hygiene_target: temp.hygiene_target.staff,
          variance: temp.variance.staff,
        },
        {
          key: '2',
          category: 'Occupancy',
          current_expenses: temp.current_expenses.occupancy,
          pct_of_productions: temp.percentage_of_productions.occupancy,
          hygiene_target: temp.hygiene_target.occupancy,
          variance: temp.variance.occupancy,
        },
        {
          key: '3',
          category: 'H&P Resources',
          current_expenses: temp.current_expenses.hp_resource,
          pct_of_productions: temp.percentage_of_productions.hp_resource,
          hygiene_target: temp.hygiene_target.hp_resource,
          variance: temp.variance.hp_resource,
        },
        {
          key: '4',
          category: 'Supplies',
          current_expenses: temp.current_expenses.supplies,
          pct_of_productions: temp.percentage_of_productions.supplies,
          hygiene_target: temp.hygiene_target.supplies,
          variance: temp.variance.supplies,
        },
        {
          key: '5',
          category: 'Products',
          current_expenses: temp.current_expenses.products,
          pct_of_productions: temp.percentage_of_productions.products,
          hygiene_target: temp.hygiene_target.products,
          variance: temp.variance.products,
        },
        {
          key: '6',
          category: 'Services',
          current_expenses: temp.current_expenses.services,
          pct_of_productions: temp.percentage_of_productions.services,
          hygiene_target: temp.hygiene_target.services,
          variance: temp.variance.services,
        },
        {
          key: '7',
          category: 'Mktng/Sales',
          current_expenses: temp.current_expenses.marketing_sales,
          pct_of_productions: temp.percentage_of_productions.marketing_sales,
          hygiene_target: temp.hygiene_target.marketing_sales,
          variance: temp.variance.marketing_sales,
        },
        {
          key: '8',
          category: 'Overhead Total',
          current_expenses: temp.current_expenses.overhead_total,
          pct_of_productions: temp.percentage_of_productions.overhead_total,
          hygiene_target: temp.hygiene_target.overhead_total,
          variance: temp.variance.overhead_total,
        },
        {
          key: '9',
          category: 'HYG Salaries',
          current_expenses: temp.current_expenses.hyg_salaries,
          pct_of_productions: temp.percentage_of_productions.hyg_salaries,
          hygiene_target: temp.hygiene_target.hyg_salaries,
          variance: temp.variance.hyg_salaries,
        },
        {
          key: '10',
          category: 'All Expenses',
          current_expenses: temp.current_expenses.all_expenses,
          pct_of_productions: temp.percentage_of_productions.all_expenses,
          hygiene_target: temp.hygiene_target.all_expenses,
          variance: temp.variance.all_expenses,
        },
      ];
      setReportData({
        ...DEFAULT_REPORT,
        ...temp,
        table: mappedHygiene,
      });
    }
    if (data.type === 'five') {
      setReportData({
        ...DEFAULT_REPORT,
        reportFive: temp,
      });
    }
    if (data.type === 'six') {
      setReportData({
        ...DEFAULT_REPORT,
        reportSix: temp,
      });
    }
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
    if (record.name == 'Total') {
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
          {filter.type === 'one' ? (
            <Title style={{ color: 'blue' }} level={3}>
              PROFITABILITY MANAGEMENT CONTROLLER REPORT
            </Title>
          ) : (
            <>
              <Title style={{ color: 'blue' }} level={3}>
                PROFITABILITY MANAGEMENT CONTROLLER REPORT
              </Title>
              <Title level={3}>YEAR TO DATE/Average Month</Title>
            </>
          )}
        </div>
        <br />
        <div>
          <Text strong>
            FOR: &nbsp; {reportData?.prod_hour_scheduled[0].name}
          </Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'one' ? (
          <>
            <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue).format('MMMM')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue).format('YYYY')}
              </Col>
            </Row>
            <Row>
              <Col span={12}>Case Ratio: &nbsp; 0% </Col>
              <Col span={12}>Recare Ratio: &nbsp; 0% </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue[0]).format('MM/YYYY')}
                {' -> '}
                {moment(filter.dateValue[1]).format('MM/YYYY')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue[0]).format('YYYY')}
              </Col>
            </Row>
            <Row>
              <Col span={12}>Case Ratio: &nbsp; 0% </Col>
              <Col span={12}>Recare Ratio: &nbsp; 0% </Col>
            </Row>
          </>
        )}
      </div>

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
                <p>{formatCurrency(reportData.unpaid_bills)}</p>
              </Col>
            </Row>
            {filter.type !== 'three' && (
              <Row className="mb-15" style={{ color: 'blue' }}>
                <Col span={8}>
                  <p>Production</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.production)}</p>
                </Col>
              </Row>
            )}
            {filter.type === 'one' ? (
              <>
                <Row className="mb-15">
                  <Col span={8}>
                    <p>Collections</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>{formatCurrency(reportData.collections)}</p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col offset={8} span={2} className="border-bottom">
                    <p>{reportData?.percentage_of_production}</p>
                  </Col>
                  <p>% of Production</p>
                </Row>
              </>
            ) : (
              <>
                <Row className="mb-15" style={{ color: 'blue' }}>
                  <Col span={8}>
                    <p>Avg. Prod/Mo:</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>{formatCurrency(reportData.average.prod_per_month)}</p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <p>Avg Coll/Mo</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>
                      {formatCurrency(reportData.average.collections_per_month)}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col offset={8} span={4} className="border-bottom">
                    <p>{reportData.percentage_of_production}</p>
                  </Col>
                  <Col span={8}>
                    <p>% of Production</p>
                  </Col>
                </Row>
              </>
            )}
            <Row className="mb-15" style={{ color: 'orange' }}>
              <Col span={8}>
                <p>Actual R/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.actual.rl)}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Actual B/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.actual.bl)}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col offset="1" span={7}>
                <p>Debt Payments</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.debt_payments)}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col offset="1" span={7}>
                <p>Net Solv</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData?.net_solv}%</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Actual G/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.actual.gl)}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Net ROI Funds</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData?.net_roi_funds}%</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Actual Bal</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.actual.bal)}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Receivables</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.receivables)}</p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row className="mb-15" style={{ color: 'purple' }}>
              <Col span={8}>
                <p>TOTAL SHORT TERM DEBT:</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.total_short_term_debt)}</p>
              </Col>
            </Row>
            {filter.type === 'one' ? (
              <>
                <Row className="mb-15" style={{ color: 'blue' }}>
                  <Col span={8}>
                    <p>Avg. Prod/Mo:</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>{formatCurrency(reportData.average.prod_per_month)}</p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <p>Avg Coll/Mo</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>{reportData.average.collections_per_month}</p>
                    <p>% of Production</p>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="mb-15" style={{ color: 'blue' }}>
                  <Col span={8}>
                    <p>Total Prod. YTD:</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>{formatCurrency(reportData.total.prod_ytd)}</p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col span={8}>
                    <p>Total Coll YTD</p>
                  </Col>
                  <Col span={12} className="border-bottom">
                    <p>{formatCurrency(reportData.total.coll_ytd)}</p>
                  </Col>
                </Row>
              </>
            )}
            <Row
              className="mb-15"
              style={{ color: 'orange', marginTop: '35px' }}
            >
              <Col span={8}>
                <p>Budgeted R/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.budget.red_line)}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col span={8}>
                <p>Budgeted B/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.budget.blue_line)}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Budgeted G/L</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.budget.green_line)}</p>
              </Col>
            </Row>

            <Row className="mb-15" style={{ marginTop: '80px' }}>
              <Col span={8}>
                <p>Budgeted Balance</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.budget.balance)}</p>
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
                    <span style={{ color: 'blue' }}>
                      {formatCurrency(text)}
                    </span>
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
                    <span style={{ color: 'blue' }}>
                      {formatCurrency(text)}
                    </span>
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
        {filter.type === 'two' ? (
          <div className="mb-10">
            <Title style={{ color: 'blue' }} level={3}>
              PROFITABILITY MANAGEMENT CONTROLLER REPORT
            </Title>
            <Title level={3}>HYGIENE AS A PROFIT CENTER</Title>
          </div>
        ) : (
          <div className="mb-10">
            <Title style={{ color: 'blue' }} level={3}>
              PROFITABILITY MANAGEMENT CONTROLLER REPORT
            </Title>
            <Title level={3}>HYGIENE AS A PROFIT CENTER</Title>
            <Title level={3}>YEAR TO DATE/Average Month</Title>
          </div>
        )}
        <div>
          <Text className="border-bottom">
            {filter.month && filter.year && `${filter.month}/${filter.year}`}
          </Text>
        </div>
        <br />
        <div>
          <Text strong>FOR: &nbsp; {reportData?.prod_hour[0].name}</Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'two' ? (
          <>
            <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue).format('MMMM')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue).format('YYYY')}
              </Col>
            </Row>
            <Row>
              <Col span={12}>Case Ratio: &nbsp; 0% </Col>
              <Col span={12}>Recare Ratio: &nbsp; 0% </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue[0]).format('MM/YYYY')}
                {' -> '}
                {moment(filter.dateValue[1]).format('MM/YYYY')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue[0]).format('YYYY')}
              </Col>
            </Row>
            <Row>
              <Col offset={12} span={12}>
                Recare Ratio: &nbsp; 0%{' '}
              </Col>
            </Row>
          </>
        )}
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
            {filter.type === 'two' ? (
              <Row className="mb-15" style={{ color: 'blue ' }}>
                <Col span={8}>
                  <p>Hyg. Prod/Mo:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.average.prod_per_month)}</p>
                </Col>
              </Row>
            ) : (
              <Row className="mb-15" style={{ color: 'blue ' }}>
                <Col span={8}>
                  <p>Avg. Prod/Mo:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.hyg_prod_mo)}</p>
                </Col>
              </Row>
            )}
            {filter.type === 'two' ? (
              <Row className="mb-15">
                <Col span={8}>
                  <p>Hyg Sales/Mo:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.hyg_sales_mo)}</p>
                </Col>
              </Row>
            ) : (
              <Row className="mb-15">
                <Col span={8}>
                  <p>Avg Sales/Mo:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>
                    {formatCurrency(
                      reportData.average.sales_per_month
                        ? reportData.average.sales_per_month
                        : 0,
                    )}
                  </p>
                </Col>
              </Row>
            )}
            {filter.type === 'two' ? (
              <Row className="mb-15">
                <Col span={8}>
                  <p>Hyg Total/Mo:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.hyg_total_mo)}</p>
                </Col>
              </Row>
            ) : (
              <Row className="mb-15">
                <Col span={8}>
                  <p>Avg Total/Mo:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>
                    {formatCurrency(
                      reportData.average.total_per_month
                        ? reportData.average.total_per_month
                        : 0,
                    )}
                  </p>
                </Col>
              </Row>
            )}
            <Row className="mb-15">
              <Col span={8}>
                <p>% of Total</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.percentage_of_total.month}%</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col span={8}>
                <p>Profit</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.profit)}</p>
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
            {filter.type === 'two' ? (
              <Row className="mb-15" style={{ color: 'blue' }}>
                <Col span={8}>
                  <p>Avg. Prod/Ytd:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>
                    {formatCurrency(
                      reportData.average.prod_per_ytd
                        ? reportData.average.prod_per_ytd
                        : 0,
                    )}
                  </p>
                </Col>
              </Row>
            ) : (
              <Row className="mb-15" style={{ color: 'blue' }}>
                <Col span={8}>
                  <p>Tot. Prod/Ytd:</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>
                    {formatCurrency(
                      reportData.total.prod_per_ytd
                        ? reportData.total.prod_per_ytd
                        : 0,
                    )}
                  </p>
                </Col>
              </Row>
            )}

            {filter.type === 'two' ? (
              <Row className="mb-15" style={{ marginTop: '55px' }}>
                <Col span={8}>
                  <p>Avg. Total/Ytd</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.avg_total_ytd)}</p>
                </Col>
              </Row>
            ) : (
              <Row className="mb-15" style={{ marginTop: '55px' }}>
                <Col span={8}>
                  <p>Hyg. Total/Ytd</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.avg_total_ytd)}</p>
                </Col>
              </Row>
            )}
            <Row className="mb-15">
              <Col span={8}>
                <p>% of Total</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{reportData.percentage_of_total.ytd}%</p>
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
                    <span style={{ color: 'blue' }}>
                      {formatCurrency(text)}
                    </span>
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
                    <span style={{ color: 'blue' }}>
                      {formatCurrency(text)}
                    </span>
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
  const renderFormFive = () => (
    <div
      className="search-result-list"
      // eslint-disable-next-line no-return-assign
      ref={(el) => setCompRef(el)}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="mb-10">
          {filter.type === 'five' ? (
            <Title style={{ color: 'blue' }} level={3}>
              PRODUCTIVITY ANALYSIS - TIME MANAGEMENT - STATISTICS
            </Title>
          ) : (
            <></>
          )}
        </div>
        <br />
        <div>
          <Text strong>
            FOR: &nbsp; {reportData?.reportFive?.doctor_hours[0]?.name}
          </Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'five' ? (
          <>
            <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue[0]).format('MMMM')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue[0]).format('YYYY')}
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
        <br />
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={report5Cols}
          dataSource={reportData.reportFive.doctor_hours}
          onChange={handleChange}
        />
        <Row style={{ marginTop: '24px', textAlign: 'left' }}>
          <Col span={8}>Percent of Available Hrs Scheduled:</Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percentage_of_available_hrs_scheduled
                .current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percentage_of_available_hrs_scheduled
                .ytd_avg_month
            }
            %
          </Col>
        </Row>
        <Row style={{ textAlign: 'left' }}>
          <Col span={8}>Percent of Scheduled Hrs Cancelled:</Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percent
                .percentage_of_scheduled_hrs_cancelled.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percent
                .percentage_of_scheduled_hrs_cancelled.ytd_avg_month
            }
            %
          </Col>
        </Row>
        <Row style={{ textAlign: 'left' }}>
          <Col span={8}>Percent of Cancelled Hrs Recovered:</Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percent
                .percentage_of_cancelled_hrs_recovered.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percent
                .percentage_of_cancelled_hrs_recovered.current_month
            }
            %
          </Col>
        </Row>
        <Row style={{ marginBottom: '24px', textAlign: 'left' }}>
          <Col span={8}>Percent of Dr. Capacity Used:</Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percent
                .percentage_of_dr_capacity_used.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.doctor_percent
                .percentage_of_dr_capacity_used.current_month
            }
            %
          </Col>
        </Row>
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={report5HygCols}
          dataSource={reportData.reportFive.hygiene_hours}
          onChange={handleChange}
        />
        <Row style={{ marginTop: '24px', textAlign: 'left' }}>
          <Col span={8}>Percent of Available Hrs Scheduled:</Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_available_hrs_scheduled.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_available_hrs_scheduled.ytd_avg_month
            }
            %
          </Col>
        </Row>
        <Row style={{ textAlign: 'left' }}>
          <Col span={8}>Percent of Scheduled Hrs Cancelled:</Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_scheduled_hrs_cancelled.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_scheduled_hrs_cancelled.ytd_avg_month
            }
            %
          </Col>
        </Row>
        <Row style={{ textAlign: 'left' }}>
          <Col span={8}>Percent of Cancelled Hrs Recovered:</Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_cancelled_hrs_recovered.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_cancelled_hrs_recovered.current_month
            }
            %
          </Col>
        </Row>
        <Row style={{ marginBottom: '24px', textAlign: 'left' }}>
          <Col span={8}>Percent of Dr. Capacity Used:</Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_dr_capacity_used.current_month
            }
            %
          </Col>
          <Col span={8}>
            {
              reportData.reportFive.hygiene_percent
                .percentage_of_dr_capacity_used.current_month
            }
            %
          </Col>
        </Row>
      </div>
    </div>
  );
  const renderFormSix = () => (
    <div
      className="search-result-list"
      // eslint-disable-next-line no-return-assign
      ref={(el) => setCompRef(el)}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="mb-10">
          {filter.type === 'six' ? (
            <Title style={{ color: 'blue' }} level={3}>
              PRODUCTIVITY ANALYSIS - TIME MANAGEMENT - DOLLARS
            </Title>
          ) : (
            <>
              {/* <Title style={{ color: 'blue' }} level={3}>
                PROFITABILITY MANAGEMENT CONTROLLER REPORT
              </Title>
              <Title level={3}>YEAR TO DATE/Average Month</Title> */}
            </>
          )}
        </div>
        <br />
        <div>
          <Text strong>
            FOR: &nbsp; {reportData?.reportSix?.doctor_hours[0]?.name}
          </Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'six' ? (
          <>
            <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue[0]).format('MMMM')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue[0]).format('YYYY')}
              </Col>
            </Row>
          </>
        ) : (
          <>
            {/* <Row>
              <Col span={12} style={{ color: 'orange' }}>
                Period: &nbsp; {moment(filter.dateValue[0]).format('MM/YYYY')}
                {' -> '}
                {moment(filter.dateValue[1]).format('MM/YYYY')}
              </Col>
              <Col span={12} style={{ color: 'orange' }}>
                Date: &nbsp; {moment(filter.dateValue[0]).format('YYYY')}
              </Col>
            </Row>
            <Row>
              <Col span={12}>Case Ratio: &nbsp; 0% </Col>
              <Col span={12}>Recare Ratio: &nbsp; 0% </Col>
            </Row> */}
          </>
        )}
        <br />
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={report6Cols}
          dataSource={reportData.reportSix.doctor_hours}
          onChange={handleChange}
        />
        <div style={{ marginTop: '24px', textAlign: 'left' }} />
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={report6HygCols}
          dataSource={reportData.reportSix.hygiene_hours}
          onChange={handleChange}
        />
        <div
          style={{
            height: '10px',
            marginTop: '24px',
            textAlign: 'left',
            borderTop: '2px dashed black',
            borderBottom: '2px dashed black',
          }}
        />
        <Table
          size="small"
          pagination={false}
          columns={[
            {
              title: 'GRAND TOTAL',
              dataIndex: 'name',
              keu: 'name',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'worked',
              keu: 'worked',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'prod',
              keu: 'prod',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'wrkd',
              keu: 'wrkd',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'avail',
              keu: 'avail',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'lost',
              keu: 'lost',
              ellipsis: true,
            },

            {
              title: '',
              dataIndex: 'avg_worked',
              keu: 'avg_worked',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'avg_prod',
              keu: 'avg_prod',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'avg_wrkd',
              keu: 'avg_wrkd',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'avg_avail',
              keu: 'avg_avail',
              ellipsis: true,
            },
            {
              title: '',
              dataIndex: 'avg_lost',
              keu: 'avg_lost',
              ellipsis: true,
            },
          ]}
          dataSource={[
            {
              name: 'GRAND TOTAL',
              ...reportData.reportSix.grand_total,
            },
          ]}
          onChange={handleChange}
          showHeader={false}
        />
      </div>
    </div>
  );
  const renderForm = () => {
    switch (formStyle) {
      case 'one':
      case 'three':
        return renderFormType1();
      case 'two':
      case 'four':
        return renderFormHygiene();
      case 'five':
        return renderFormFive();
      case 'six':
        return renderFormSix();
      default:
        return null;
    }
  };

  return (
    <div className="reporting-container">
      <PageHeader className="site-page-header" title="Reporting" />
      <Divider />

      <Filter value={filter} onSubmitCallback={onFilterChange} />
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
