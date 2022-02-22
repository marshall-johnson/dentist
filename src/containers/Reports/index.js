import React, { useState } from 'react';
import ReactToPrint from 'react-to-print';
import { Row, Col, Table, Button, Divider, Typography, PageHeader } from 'antd';
import { formatCurrency, decFormatterNumber } from '@/utils/helpers';
import Filter from '@/containers/Reports/Filter';
import './index.scss';
import { getReporting } from '@/services/report.service';
import moment from 'moment';

const { Text, Title } = Typography;

const DEFAULT_REPORT = {
  reportSeven: {
    new_patients: [
      {
        age: '6-20',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
        avg_per_month: 0,
      },
      {
        age: '21-40',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
        avg_per_month: 0,
      },
      {
        age: '45+',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
        avg_per_month: 0,
      },
      {
        age: 'Total New',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
        avg_per_month: 0,
      },
    ],
    patient_referrals: [
      {
        title: 'Referred by Pts.',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
      },
      {
        title: 'Referred by Drs.',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
      },
      {
        title: 'Total Referrals',
        current_mo: 0,
        percentage_of_current_mo: 0,
        ytd: 0,
        percentage_of_ytd: 0,
      },
    ],
    case_presentation: [
      {
        title: 'Case Ratio',
        current_percentage_cases: 0,
        current_percentage_dollars: 0,
        percentage_of_ytd_cases: 0,
        percentage_of_ytd_dollars: 0,
      },
      {
        title: 'Informal Ratio',
        current_percentage_cases: 0,
        current_percentage_dollars: 0,
        percentage_of_ytd_cases: 0,
        percentage_of_ytd_dollars: 0,
      },
      {
        title: 'Recare Ratio',
        current_percentage_cases: 0,
        current_percentage_dollars: 0,
        percentage_of_ytd_cases: 0,
        percentage_of_ytd_dollars: 0,
      },
    ],
    patient_visits: {
      doctor: [
        {
          name: 'Total Dr. Visits',
          current_mo: 0,
          percentage_of_current_mo: 0,
          ytd: 0,
          percentage_of_ytd: 0,
          avg_per_month: 0,
        },
      ],
      hygiene: [
        {
          name: 'Total Hyg Visits',
          current_mo: 0,
          percentage_of_current_mo: 0,
          ytd: 0,
          percentage_of_ytd: 0,
          avg_per_month: 0,
        },
      ],
    },
  },
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
    type: 'pmcr_current_month',
  });
  const [compRef, setCompRef] = useState({});
  const [formStyle, setFormStyle] = useState('pmcr_current_month');
  const [reportData, setReportData] = useState(DEFAULT_REPORT);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };

  const reportSevenColNewPatients = [
    {
      title: 'AGE',
      dataIndex: 'age',
      key: 'age',

      render: (value) => {
        switch (value) {
          case '6_to_20':
            return '6-20';
          case '21_to_40':
            return '21-40';
          case '41_to_more':
            return '45+';
          case 'total':
            return 'Total New';
          default:
            return '';
        }
      },
    },
    {
      title: 'Current Mo.',
      dataIndex: 'current_mo',
      key: 'current_mo',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_current_mo',
      key: 'percentage_of_current_mo',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'YTD',
      dataIndex: 'ytd',
      key: 'ytd',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_ytd',
      key: 'percentage_of_ytd',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'AVG/Mo',
      dataIndex: 'avg_per_month',
      key: 'avg_per_month',
      render: (value) => decFormatterNumber(value),
    },
  ];
  const reportSevenColPatientRef = [
    {
      name: '',
      dataIndex: 'name',
      key: 'name',

      render: (value) => {
        switch (value) {
          case 'referred_by_pts':
            return 'Referred by Pts.';
          case 'referred_by_drs':
            return 'Referred by Drs.';
          case 'total':
            return 'Total Referrals';
          default:
            return '';
        }
      },
    },
    {
      title: 'Current Mo.',
      dataIndex: 'current_mo',
      key: 'current_mo',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_current_mo',
      key: 'percentage_of_current_mo',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'YTD',
      dataIndex: 'ytd',
      key: 'ytd',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_ytd',
      key: 'percentage_of_ytd',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
  ];
  const reportSevenColCasePresent = [
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Current % Cases',
      dataIndex: 'current_percentage_cases',
      key: 'current_percentage_cases',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: 'Current % Dollars',
      dataIndex: 'current_percentage_dollars',
      key: 'current_percentage_dollars',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: 'YTD % Cases',
      dataIndex: 'percentage_of_ytd_cases',
      key: 'percentage_of_ytd_cases',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: 'YTD % Dollars',
      dataIndex: 'percentage_of_ytd_dollars',
      key: 'percentage_of_ytd_dollars',
      render: (value) => decFormatterNumber(value),
    },
  ];
  const reportSevenColPatientVisitDoc = [
    {
      title: 'Doctors',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current Mo.',
      dataIndex: 'current_mo',
      key: 'current_mo',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_current_mo',
      key: 'percentage_of_current_mo',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'YTD',
      dataIndex: 'ytd',
      key: 'ytd',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_ytd',
      key: 'percentage_of_ytd',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'AVG/Mo',
      dataIndex: 'avg_per_month',
      key: 'avg_per_month',
    },
  ];
  const reportSevenColPatientVisitHyg = [
    {
      title: 'Hygienist',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current Mo.',
      dataIndex: 'current_mo',
      key: 'current_mo',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_current_mo',
      key: 'percentage_of_current_mo',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'YTD',
      dataIndex: 'ytd',
      key: 'ytd',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '%',
      dataIndex: 'percentage_of_ytd',
      key: 'percentage_of_ytd',
      render: (value) => decFormatterNumber(value),

      width: '80px',
    },
    {
      title: 'AVG/Mo',
      dataIndex: 'avg_per_month',
      key: 'avg_per_month',
      render: (value) => decFormatterNumber(value),
    },
  ];

  const report6Cols = [
    {
      title: 'DOCTOR HOURS',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'WORKED',
          dataIndex: 'worked',
          key: 'worked',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'PROD$',
          dataIndex: 'prod',
          key: 'prod',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'WRKD',
          dataIndex: 'wrkd',
          key: 'wrkd',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avail',
          key: 'avail',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'lost',
          key: 'lost',
          render: (value) => decFormatterNumber(value),
        },
      ],
    },
    { title: '', dataIndex: '', key: '' },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          key: 'avg_worked',
        },
        {
          title: 'PROD$',
          dataIndex: 'avg_prod',
          key: 'avg_prod',
        },
        {
          title: 'WRKD',
          dataIndex: 'avg_wrkd',
          key: 'avg_wrkd',
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avg_avail',
          key: 'avg_avail',
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'avg_lost',
          key: 'avg_lost',
        },
      ],
    },
  ];
  const report6HygCols = [
    {
      title: 'HYG HOURS',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'WORKED',
          dataIndex: 'worked',
          key: 'worked',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'PROD$',
          dataIndex: 'prod',
          key: 'prod',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'WRKD',
          dataIndex: 'wrkd',
          key: 'wrkd',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avail',
          key: 'avail',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'lost',
          key: 'lost',
          render: (value) => decFormatterNumber(value),
        },
      ],
    },
    { title: '', dataIndex: '', key: '' },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          key: 'avg_worked',
        },
        {
          title: 'PROD$',
          dataIndex: 'avg_prod',
          key: 'avg_prod',
        },
        {
          title: 'WRKD',
          dataIndex: 'avg_wrkd',
          key: 'avg_wrkd',
        },
        {
          title: 'PROD/HR AVAIL',
          dataIndex: 'avg_avail',
          key: 'avg_avail',
        },
        {
          title: 'PROD$ LOST',
          dataIndex: 'avg_lost',
          key: 'avg_lost',
        },
      ],
    },
  ];
  const report5Cols = [
    {
      title: 'DOCTOR HOURS',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avail',
          key: 'avail',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'SCHED',
          dataIndex: 'sched',
          key: 'sched',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'CANC',
          dataIndex: 'canc',
          key: 'canc',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'RECOV',
          dataIndex: 'recov',
          key: 'recov',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'WORKED',
          dataIndex: 'worked',
          key: 'worked',
          render: (value) => decFormatterNumber(value),
        },
      ],
    },
    { title: '', dataIndex: '', key: '' },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avg_avail',
          key: 'avg_avail',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'SCHED',
          dataIndex: 'avg_sched',
          key: 'avg_sched',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'CANC',
          dataIndex: 'avg_canc',
          key: 'avg_canc',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'RECOV',
          dataIndex: 'avg_recov',
          key: 'avg_recov',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          key: 'avg_worked',
          render: (value) => decFormatterNumber(value),
        },
      ],
    },
  ];
  const report5HygCols = [
    {
      title: 'HYGIENE HOURS',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `CURRENT MONTH: ${moment(filter.dateValue[0]).format(
        'MM---YYYY',
      )}`,
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avail',
          key: 'avail',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'SCHED',
          dataIndex: 'sched',
          key: 'sched',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'CANC',
          dataIndex: 'canc',
          key: 'canc',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'RECOV',
          dataIndex: 'recov',
          key: 'recov',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'WORKED',
          dataIndex: 'worked',
          key: 'worked',
          render: (value) => decFormatterNumber(value),
        },
      ],
    },
    { title: '', dataIndex: '', key: '' },
    {
      title: 'YTD AVG/MO',
      children: [
        {
          title: 'AVAIL',
          dataIndex: 'avg_avail',
          key: 'avg_avail',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'SCHED',
          dataIndex: 'avg_sched',
          key: 'avg_sched',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'CANC',
          dataIndex: 'avg_canc',
          key: 'avg_canc',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'RECOV',
          dataIndex: 'avg_recov',
          key: 'avg_recov',
          render: (value) => decFormatterNumber(value),
        },
        {
          title: 'WORKED',
          dataIndex: 'avg_worked',
          key: 'avg_worked',
          render: (value) => decFormatterNumber(value),
        },
      ],
    },
  ];

  const columns = [
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'TOTAL AMOUNT',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => decFormatterNumber(value),
    },
    {
      title: '% OF COLLECTIONS',
      dataIndex: 'collectionsPercent',
      key: 'collectionsPercent',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
    {
      title: 'INTERIM BUDGET',
      dataIndex: 'interimBudget',
      key: 'interimBudget',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
    {
      title: 'INTERIM VARIANCE',
      dataIndex: 'interimVariance',
      key: 'interimVariance',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
    {
      title: 'CPD TARGET',
      dataIndex: 'cpdTarget',
      key: 'cpdTarget',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
    {
      title: 'CPD VARIANCE',
      dataIndex: 'cpdVariance',
      key: 'cpdVariance',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
  ];
  const columnsHygiene = [
    {
      title: 'CATEGORY',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'CURRENT EXPENSES',
      dataIndex: 'current_expenses',
      key: 'current_expenses',
      render: (text) => <span>{decFormatterNumber(text)}</span>,
    },
    {
      title: '% OF PRODUCTION',
      dataIndex: 'pct_of_productions',
      key: 'pct_of_productions',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
    {
      title: 'HYGIENE TARGET',
      dataIndex: 'hygiene_target',
      key: 'hygiene_target',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
    {
      title: 'VARIANCE',
      dataIndex: 'variance',
      key: 'variance',

      render: (text) => <span>{decFormatterNumber(text)}%</span>,
    },
  ];
  const onFilterChange = async (data) => {
    setFilter(data);
    setFormStyle(data.type);
    const temp = await fetchReport(data);
    let mapped = [];
    if (
      data.type === 'pmcr_current_month' ||
      data.type === 'pmcr_ytd_avg_month'
    ) {
      mapped = [
        {
          key: '1',
          category: 'Staff',
          totalAmount: temp?.total_amount.staff,
          collectionsPercent: temp?.percentage_of_collections.staff,
          interimBudget: temp?.interim_budget.staff,
          interimVariance: temp?.interim_budget_variance.staff,
          cpdTarget: temp?.cpd_target.staff,
          cpdVariance: temp?.cpd_variance.staff,
        },
        {
          key: '2',
          category: 'Occupancy',
          totalAmount: temp?.total_amount.occupancy,
          collectionsPercent: temp?.percentage_of_collections.occupancy,
          interimBudget: temp?.interim_budget.occupancy,
          interimVariance: temp?.interim_budget_variance.occupancy,
          cpdTarget: temp?.cpd_target.occupancy,
          cpdVariance: temp?.cpd_variance.occupancy,
        },
        {
          key: '3',
          category: 'H&P Resources',
          totalAmount: temp?.total_amount.hp_resource,
          collectionsPercent: temp?.percentage_of_collections.hp_resource,
          interimBudget: temp?.interim_budget.hp_resource,
          interimVariance: temp?.interim_budget_variance.hp_resource,
          cpdTarget: temp?.cpd_target.hp_resource,
          cpdVariance: temp?.cpd_variance.hp_resource,
        },
        {
          key: '4',
          category: 'Supplies',
          totalAmount: temp?.total_amount.supplies,
          collectionsPercent: temp?.percentage_of_collections.supplies,
          interimBudget: temp?.interim_budget.supplies,
          interimVariance: temp?.interim_budget_variance.supplies,
          cpdTarget: temp?.cpd_target.supplies,
          cpdVariance: temp?.cpd_variance.supplies,
        },
        {
          key: '5',
          category: 'Laboratory',
          totalAmount: temp?.total_amount.laboratory,
          collectionsPercent: temp?.percentage_of_collections.laboratory,
          interimBudget: temp?.interim_budget.laboratory,
          interimVariance: temp?.interim_budget_variance.laboratory,
          cpdTarget: temp?.cpd_target.laboratory,
          cpdVariance: temp?.cpd_variance.laboratory,
        },
        {
          key: '6',
          category: 'Services',
          totalAmount: temp?.total_amount.services,
          collectionsPercent: temp?.percentage_of_collections.services,
          interimBudget: temp?.interim_budget.services,
          interimVariance: temp?.interim_budget_variance.services,
          cpdTarget: temp?.cpd_target.services,
          cpdVariance: temp?.cpd_variance.services,
        },
        {
          key: '7',
          category: 'Mktng/Sales',
          totalAmount: temp?.total_amount.marketing_sales,
          collectionsPercent: temp?.percentage_of_collections.marketing_sales,
          interimBudget: temp?.interim_budget.marketing_sales,
          interimVariance: temp?.interim_budget_variance.marketing_sales,
          cpdTarget: temp?.cpd_target.marketing_sales,
          cpdVariance: temp?.cpd_variance.marketing_sales,
        },
        {
          key: '8',
          category: 'Overhead Total',
          totalAmount: temp?.total_amount.overhead_total,
          collectionsPercent: temp?.percentage_of_collections.overhead_total,
          interimBudget: temp?.interim_budget.overhead_total,
          interimVariance: temp?.interim_budget_variance.overhead_total,
          cpdTarget: temp?.cpd_target.overhead_total,
          cpdVariance: temp?.cpd_variance.overhead_total,
        },
        {
          key: '9',
          category: 'DRS Salaries',
          totalAmount: temp?.total_amount.drs_salaries,
          collectionsPercent: temp?.percentage_of_collections.drs_salaries,
          interimBudget: temp?.interim_budget.drs_salaries,
          interimVariance: temp?.interim_budget_variance.drs_salaries,
          cpdTarget: temp?.cpd_target.drs_salaries,
          cpdVariance: temp?.cpd_variance.drs_salaries,
        },
        {
          key: '10',
          category: 'All Expenses',
          totalAmount: temp?.total_amount.all_expenses,
          collectionsPercent: temp?.percentage_of_collections.all_expenses,
          interimBudget: temp?.interim_budget.all_expenses,
          interimVariance: temp?.interim_budget_variance.all_expenses,
          cpdTarget: temp?.cpd_target.all_expenses,
          cpdVariance: temp?.cpd_variance.all_expenses,
        },
      ];
      setReportData({
        ...DEFAULT_REPORT,
        ...temp,
        table: mapped,
      });
    }
    let mappedHygiene = [];
    if (
      data.type === 'pmcr_hygiene_current_month' ||
      data.type === 'pmcr_hygiene_ytd_avg_month'
    ) {
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
    if (data.type === 'prod_analysis_time_stats') {
      setReportData({
        ...DEFAULT_REPORT,
        reportFive: temp,
      });
    }
    if (data.type === 'prod_analysis_time_dollars') {
      setReportData({
        ...DEFAULT_REPORT,
        reportSix: temp,
      });
    }
    if (data.type === 'prod_analysis_pt_activity') {
      setReportData({
        ...DEFAULT_REPORT,
        reportSeven: temp,
      });
    }
  };
  const fetchReport = async (args) => {
    const res = await getReporting(args);
    return res;
  };

  const renderName = (arr) => {
    const res = arr.reduce((prev, acc) => `${prev} ${acc.name}`, '');
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
      return 'bluerow_style';
    }
    if (record.grand_total == 'GRAND TOTAL') {
      return 'bluerow_style';
    }

    if (
      record.age == 'total' ||
      record.name == 'total' ||
      record.title == 'Total Referrals' ||
      record.doctors == 'Total Dr. Visits' ||
      record.hygienist == 'Total Hyg Visits'
    ) {
      return 'dashed_row';
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
          {filter.type === 'pmcr_current_month' ? (
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
            FOR: &nbsp; {renderName(reportData?.prod_hour_scheduled)}
          </Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'pmcr_current_month' ? (
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
              <Col span={15} className="border-bottom">
                <p>{formatCurrency(reportData.unpaid_bills)}</p>
              </Col>
            </Row>
            {filter.type !== 'pmcr_ytd_avg_month' && (
              <Row className="mb-15" style={{ color: 'blue' }}>
                <Col span={8}>
                  <p>Production</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.production)}</p>
                </Col>
              </Row>
            )}
            {filter.type === 'pmcr_current_month' ? (
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
              <Col span={12} style={{ textAlign: 'center' }}>
                <p>TOTAL SHORT TERM DEBT</p>
              </Col>
              <Col span={12} className="border-bottom">
                <p>{formatCurrency(reportData.total_short_term_debt)}</p>
              </Col>
            </Row>
            {filter.type === 'pmcr_current_month' ? (
              <>
                <Row className="mb-15" style={{ color: 'blue' }}>
                  <Col style={{ textAlign: 'right' }} span={10}>
                    <p>Avg. Prod/Mo</p>
                  </Col>
                  <Col span={12} offset={2} className="border-bottom">
                    <p>{formatCurrency(reportData.average.prod_per_month)}</p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col style={{ textAlign: 'right' }} span={10}>
                    <p>Avg Coll/Mo</p>
                  </Col>
                  <Col span={12} offset={2} className="border-bottom">
                    <p>{reportData.average.collections_per_month}</p>
                    {/* <p>% of Production</p> */}
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row className="mb-15" style={{ color: 'blue' }}>
                  <Col style={{ textAlign: 'right' }} span={10}>
                    <p>Total Prod. YTD:</p>
                  </Col>
                  <Col span={12} offset={2} className="border-bottom">
                    <p>{formatCurrency(reportData.total.prod_ytd)}</p>
                  </Col>
                </Row>
                <Row className="mb-15">
                  <Col style={{ textAlign: 'right' }} span={10}>
                    <p>Total Coll YTD</p>
                  </Col>
                  <Col span={12} offset={2} className="border-bottom">
                    <p>{formatCurrency(reportData.total.coll_ytd)}</p>
                  </Col>
                </Row>
              </>
            )}
            <Row
              className="mb-15"
              style={{ color: 'orange', marginTop: '25px' }}
            >
              <Col style={{ textAlign: 'right' }} span={10}>
                <p>Budgeted R/L</p>
              </Col>
              <Col span={12} offset={2} className="border-bottom">
                <p>{formatCurrency(reportData.budget.red_line)}</p>
              </Col>
            </Row>
            <Row className="mb-15" style={{ color: 'blue' }}>
              <Col style={{ textAlign: 'right' }} span={10}>
                <p>Budgeted B/L</p>
              </Col>
              <Col span={12} offset={2} className="border-bottom">
                <p>{formatCurrency(reportData.budget.blue_line)}</p>
              </Col>
            </Row>
            <Row className="mb-15">
              <Col style={{ textAlign: 'right' }} span={10}>
                <p>Budgeted G/L</p>
              </Col>
              <Col span={12} offset={2} className="border-bottom">
                <p>{formatCurrency(reportData.budget.green_line)}</p>
              </Col>
            </Row>

            <Row className="mb-15">
              <Col style={{ textAlign: 'right' }} span={10}>
                <p>Budgeted Balance</p>
              </Col>
              <Col span={12} offset={2} className="border-bottom">
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

                  render: (text) => {
                    if (text) {
                      return (
                        <span style={{ color: 'blue' }}>
                          {filter.type === 'pmcr_current_month' ||
                          filter.type === 'pmcr_ytd_avg_month'
                            ? `Dr. ${text}`
                            : text}
                        </span>
                      );
                    }
                    return '';
                  },
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',

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

                  render: (text) => {
                    if (text) {
                      return (
                        <span style={{ color: 'blue' }}>
                          {filter.type === 'pmcr_current_month' ||
                          filter.type === 'pmcr_ytd_avg_month'
                            ? `Dr. ${text}`
                            : text}
                        </span>
                      );
                    }
                    return '';
                  },
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',

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
        {filter.type === 'pmcr_hygiene_current_month' ? (
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
          {/* <Text strong>FOR: &nbsp; {reportData?.prod_hour[0]?.name}</Text> */}
          <Text strong>FOR: &nbsp; {renderName(reportData?.prod_hour)}</Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'pmcr_hygiene_current_month' ? (
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
            {filter.type === 'pmcr_hygiene_current_month' ? (
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
                  <p>Avg. Prod/Mo</p>
                </Col>
                <Col span={12} className="border-bottom">
                  <p>{formatCurrency(reportData.hyg_prod_mo)}</p>
                </Col>
              </Row>
            )}
            {filter.type === 'pmcr_hygiene_current_month' ? (
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
            {filter.type === 'pmcr_hygiene_current_month' ? (
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
            {filter.type === 'pmcr_hygiene_current_month' ? (
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

            {filter.type === 'pmcr_hygiene_current_month' ? (
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

                  render: (text) => (
                    <span style={{ color: 'blue' }}>{text}</span>
                  ),
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',

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

                  render: (text) => (
                    <span style={{ color: 'blue' }}>{text}</span>
                  ),
                },
                {
                  title: '',
                  dataIndex: 'value',
                  key: 'value',

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
          {filter.type === 'prod_analysis_time_stats' ? (
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
        {filter.type === 'prod_analysis_time_stats' ? (
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
          {filter.type === 'prod_analysis_time_dollars' ? (
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
        {filter.type === 'prod_analysis_time_dollars' ? (
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
          }}
        />
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={[
            {
              title: 'GRAND TOTAL',
              dataIndex: 'grand_total',
              key: 'grand_total',
            },
            {
              title: '',
              dataIndex: 'worked',
              key: 'worked',
            },
            {
              title: '',
              dataIndex: 'prod',
              key: 'prod',
            },
            {
              title: '',
              dataIndex: 'wrkd',
              key: 'wrkd',
            },
            {
              title: '',
              dataIndex: 'avail',
              key: 'avail',
            },
            {
              title: '',
              dataIndex: 'lost',
              key: 'lost',
            },
            { title: '', dataIndex: '', key: '' },
            {
              title: '',
              dataIndex: 'avg_worked',
              key: 'avg_worked',
            },
            {
              title: '',
              dataIndex: 'avg_prod',
              key: 'avg_prod',
            },
            {
              title: '',
              dataIndex: 'avg_wrkd',
              key: 'avg_wrkd',
            },
            {
              title: '',
              dataIndex: 'avg_avail',
              key: 'avg_avail',
            },
            {
              title: '',
              dataIndex: 'avg_lost',
              key: 'avg_lost',
            },
          ]}
          dataSource={[
            {
              grand_total: 'GRAND TOTAL',
              ...reportData.reportSix.grand_total,
            },
          ]}
          onChange={handleChange}
          showHeader={false}
        />
        <div style={{ marginTop: '24px', textAlign: 'left' }} />
        <Table
          size="small"
          pagination={false}
          columns={[
            {
              title: 'CATEGORY NAME',
              dataIndex: 'categoryName',
              key: 'categoryName',
            },
            {
              title: 'CURRENT $',
              dataIndex: 'current',
              key: 'current',
            },
            {
              title: '%',
              dataIndex: 'percentageCurrent',
              key: 'percentageCurrent',
            },
            {
              title: 'AVG/YTD $',
              dataIndex: 'avg',
              key: 'avg',
            },
            {
              title: '%',
              dataIndex: 'percentageAvg',
              key: 'percentageAvg',
            },
            {
              title: '',
              key: '',
              dataIndex: '',
            },
            {
              title: 'ACCOUNT REC',
              dataIndex: 'accountRec',
              key: 'accountRec',
            },
            {
              title: 'CURRENT %',
              dataIndex: 'curPercentage',
              key: 'curPercentage',
            },
            {
              title: 'YTD %',
              dataIndex: 'ytdPercentage',
              key: 'ytdPercentage',
            },
          ]}
          dataSource={[
            {
              categoryName: '',
              current: '',
              percentageCurrent: '0',
              avg: '',
              percentageAvg: '0',
              accountRec: '0 - 30',
              curPercentage: '',
              ytdPercentage: '',
            },
            {
              categoryName: '',
              current: '',
              percentageCurrent: '0',
              avg: '',
              percentageAvg: '0',
              accountRec: '31 - 60',
              curPercentage: '',
              ytdPercentage: '',
            },
            {
              categoryName: '',
              current: '',
              percentageCurrent: '0',
              avg: '',
              percentageAvg: '0',
              accountRec: '61 - 90',
              curPercentage: '',
              ytdPercentage: '',
            },
            {
              categoryName: '',
              current: '',
              percentageCurrent: '0',
              avg: '',
              percentageAvg: '0',
              accountRec: '>90',
              curPercentage: '',
              ytdPercentage: '',
            },
          ]}
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
          showHeader={false}
          columns={[
            {
              title: 'CATEGORY NAME',
              dataIndex: 'categoryName',
              key: 'categoryName',
            },
            {
              title: 'CURRENT $',
              dataIndex: 'current',
              key: 'current',
            },
            {
              title: '%',
              dataIndex: 'percentageCurrent',
              key: 'percentageCurrent',
            },
            {
              title: 'AVG/YTD $',
              dataIndex: 'avg',
              key: 'avg',
            },
            {
              title: '%',
              dataIndex: 'percentageAvg',
              key: 'percentageAvg',
            },
            {
              title: '',
              key: '',
              dataIndex: '',
            },
            {
              title: 'ACCOUNT REC',
              dataIndex: 'accountRec',
              key: 'accountRec',
            },
            {
              title: 'CURRENT %',
              dataIndex: 'curPercentage',
              key: 'curPercentage',
            },
            {
              title: 'YTD %',
              dataIndex: 'ytdPercentage',
              key: 'ytdPercentage',
            },
          ]}
          dataSource={[
            {
              categoryName: '',
              current: '',
              percentageCurrent: '0',
              avg: '',
              percentageAvg: '0',
              accountRec: 'FRONT DESK COLL.',
              curPercentage: '',
              ytdPercentage: '',
            },
          ]}
        />
      </div>
    </div>
  );
  const renderFormSeven = () => (
    <div
      className="search-result-list"
      // eslint-disable-next- line no-return-assign
      ref={(el) => setCompRef(el)}
    >
      <div style={{ textAlign: 'center' }}>
        <div className="mb-10">
          {filter.type === 'prod_analysis_pt_activity' ? (
            <Title style={{ color: 'blue' }} level={3}>
              PRODUCTIVITY ANALYSIS - PATIENT ACTIVITY - STATISTICS
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
            FOR: &nbsp;
            {reportData?.reportSeven?.patient_visits?.doctor[0]?.name}
          </Text>
          <Text className="border-bottom">&nbsp;</Text>
        </div>
        {filter.type === 'prod_analysis_pt_activity' ? (
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
        <h4
          style={{ color: 'blue', textAlign: 'center', marginBottom: '12px' }}
        >
          New Patients
        </h4>
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={reportSevenColNewPatients}
          dataSource={reportData.reportSeven.new_patients}
          onChange={handleChange}
        />
        <h4
          style={{
            color: 'blue',
            textAlign: 'center',
            marginBottom: '12px',
            marginTop: '12px',
          }}
        >
          Patient Referrals
        </h4>
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={reportSevenColPatientRef}
          dataSource={reportData.reportSeven.patient_referrals}
          onChange={handleChange}
        />
        <h4
          style={{
            color: 'blue',
            textAlign: 'center',
            marginBottom: '12px',
            marginTop: '12px',
          }}
        >
          Case Presentation
        </h4>
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={reportSevenColCasePresent}
          dataSource={reportData.reportSeven.case_presentation}
          onChange={handleChange}
        />
        <h4
          style={{
            color: 'blue',
            textAlign: 'center',
            marginBottom: '12px',
            marginTop: '12px',
          }}
        >
          Patients Visits
        </h4>
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={reportSevenColPatientVisitDoc}
          dataSource={reportData.reportSeven?.patient_visits?.doctor}
          onChange={handleChange}
        />
        <h4
          style={{
            color: 'blue',
            textAlign: 'center',
            marginBottom: '12px',
            marginTop: '12px',
          }}
        >
          New Patients
        </h4>
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={reportSevenColPatientVisitHyg}
          dataSource={reportData.reportSeven?.patient_visits?.hygiene}
          onChange={handleChange}
        />
        <div
          style={{
            height: '10px',
            marginTop: '24px',
            textAlign: 'left',
            borderTop: '2px dashed black',
          }}
        />
        <Table
          rowClassName={renderStyleRow}
          size="small"
          pagination={false}
          columns={[
            {
              title: 'GRAND TOTAL',
              dataIndex: 'grand_total',
              key: 'grand_total',
            },
            {
              title: 'Current Mo.',
              dataIndex: 'current_mo',
              key: 'current_mo',
            },
            {
              title: '%',
              dataIndex: 'percentage_of_current_mo',
              key: 'percentage_of_current_mo',

              width: '80px',
            },
            {
              title: 'YTD',
              dataIndex: 'ytd',
              key: 'ytd',
            },
            {
              title: '%',
              dataIndex: 'percentage_of_ytd',
              key: 'percentage_of_ytd',

              width: '80px',
            },
            {
              title: 'AVG/Mo',
              dataIndex: 'avg_per_month',
              key: 'avg_per_month',
            },
          ]}
          dataSource={[
            {
              grand_total: 'GRAND TOTAL',
              ...reportData.reportSeven?.patient_visits?.grand_total,
            },
          ]}
          onChange={handleChange}
          showHeader={false}
        />
        <div style={{ marginTop: '24px', textAlign: 'left' }} />
      </div>
    </div>
  );

  const renderForm = () => {
    switch (formStyle) {
      case 'pmcr_current_month':
      case 'pmcr_ytd_avg_month':
        return renderFormType1();
      case 'pmcr_hygiene_current_month':
      case 'pmcr_hygiene_ytd_avg_month':
        return renderFormHygiene();
      case 'prod_analysis_time_stats':
        return renderFormFive();
      case 'prod_analysis_time_dollars':
        return renderFormSix();
      case 'prod_analysis_pt_activity':
        return renderFormSeven();
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
            bodyClass="print-window"
          />
        </Col>
      </Row>
      <div>{renderForm()}</div>
    </div>
  );
};

export default ReportingContainer;
