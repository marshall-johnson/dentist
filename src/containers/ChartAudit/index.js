import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchStudents } from '@/actions/studentActions';
import PropTypes from 'prop-types';
import {
  Button,
  Descriptions,
  Table,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { formatCurrency } from '@/utils/helpers';
import {
  fetchChartAudit,
  deleteChartAudit,
  postChartAudit,
} from '@/services/chartAudit.service';

const INITIAL_VALUE = 'initial';
const { Option } = Select;

const ChartAudit = (props) => {
  const { fetchStudents, students } = props;
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({});
  const [dataSource, setDataSource] = useState([{ key: INITIAL_VALUE }]);

  const identifySource = [
    { text: 'Source A', value: 'a' },
    { text: 'Source B', value: 'b' },
  ];

  const formRef = React.createRef();

  const columns = [
    {
      title: 'New Patient Initials',
      dataIndex: 'patient',
      sorter: (a, b) => a.patient.length - b.patient.length,
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="patient"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input />
            </Form.Item>
          );
        }

        return record.attributes.new_patient_initials;
      },
    },
    {
      title: 'Total $ Amount Diagnosed',
      dataIndex: 'amount_diagnosed',
      sorter: (a, b) =>
        Number(a.amount_diagnosed.match(/\d/)) -
        Number(b.amount_diagnosed.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="amount_diagnosed"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.total_amount_diagnosed);
      },
    },
    {
      title: 'Total $ Treatment Completed',
      dataIndex: 'amount_treatment',
      sorter: (a, b) =>
        Number(a.amount_treatment.match(/\d/)) -
        Number(b.amount_treatment.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="amount_treatment"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.total_treatment_completed);
      },
    },
    {
      title: 'If Case Completed, Total $ Amount',
      dataIndex: 'amount',
      sorter: (a, b) =>
        Number(a.amount.match(/\d/)) - Number(b.amount.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="amount"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.completed_total_amount);
      },
    },
    {
      title: 'Has Hygiene Appt?',
      dataIndex: 'hygiene_appt',
      sorter: (a, b) => a.hygiene_appt.length - b.hygiene_appt.length,
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="hygiene_appt"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select>
                {[true, false].map((value, index) => (
                  <Option key={index.toString()} value={value}>
                    {value ? 'Yes' : 'No'}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        }

        return record.attributes.has_hygiene_appt ? 'Yes' : 'No';
      },
    },
    {
      title: 'Has Doctor Appt?',
      dataIndex: 'doctor_appt',
      sorter: (a, b) => a.doctor_appt.length - b.doctor_appt.length,
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="doctor_appt"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select>
                {[true, false].map((value, index) => (
                  <Option key={index.toString()} value={value}>
                    {value ? 'Yes' : 'No'}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        }

        return record.attributes.has_doctor_appt ? 'Yes' : 'No';
      },
    },
    {
      title: 'If Dr.Appt, $ Scheduled',
      dataIndex: 'scheduled',
      sorter: (a, b) =>
        Number(a.scheduled.match(/\d/)) - Number(b.scheduled.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="scheduled"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.dr_appt_scheduled);
      },
    },
    {
      title: 'Identify Referral Source',
      dataIndex: 'referral_source',
      sorter: (a, b) => a.referral_source - b.referral_source,
      filters: identifySource,
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="referral_source"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select>
                {identifySource?.map((data) => (
                  <Option value={data.value}>{data.text}</Option>
                ))}
              </Select>
            </Form.Item>
          );
        }

        return `Source ${record.attributes?.identify_referral_source?.toUpperCase()}`;
      },
    },
    {
      title: 'Remaining Unscheduled $ Treatment',
      dataIndex: 'unscheduled_remaining',
      sorter: (a, b) =>
        Number(a.unscheduled_remaining.match(/\d/)) -
        Number(b.unscheduled_remaining.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="unscheduled_remaining"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(
          record.attributes.remaining_unscheduled_treatment,
        );
      },
    },
    {
      title: 'Chart',
      dataIndex: 'chart',
      sorter: (a, b) =>
        Number(a.chart.match(/\d/)) - Number(b.chart.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="chart"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return record.attributes.chart;
      },
    },
    {
      title: 'Diagnosed',
      dataIndex: 'diagnosed',
      sorter: (a, b) =>
        Number(a.diagnosed.match(/\d/)) - Number(b.diagnosed.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="diagnosed"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.diagnosed);
      },
    },
    {
      title: 'Proposed',
      dataIndex: 'proposed',
      sorter: (a, b) =>
        Number(a.proposed.match(/\d/)) - Number(b.proposed.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="proposed"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.proposed);
      },
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      sorter: (a, b) =>
        Number(a.completed.match(/\d/)) - Number(b.completed.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="completed"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return record.attributes.completed;
      },
    },
    {
      title: 'Case',
      dataIndex: 'case',
      sorter: (a, b) => Number(a.case.match(/\d/)) - Number(b.case.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="case"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.case);
      },
    },
    {
      title: 'Hyg',
      dataIndex: 'hyg',
      sorter: (a, b) => Number(a.hyg.match(/\d/)) - Number(b.hyg.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="hyg"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return record.attributes.hyg;
      },
    },
    {
      title: 'Dr',
      dataIndex: 'dr',
      sorter: (a, b) => Number(a.dr.match(/\d/)) - Number(b.dr.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="dr"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return record.attributes.dr;
      },
    },
    {
      title: 'Has Appt',
      dataIndex: 'has_appt',
      sorter: (a, b) =>
        Number(a.has_appt.match(/\d/)) - Number(b.has_appt.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="has_appt"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return record.attributes.has_appt;
      },
    },
    {
      title: 'Dr Appt',
      dataIndex: 'dr_appt',
      sorter: (a, b) =>
        Number(a.dr_appt.match(/\d/)) - Number(b.dr_appt.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="dr_appt"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return record.attributes.dr_appt;
      },
    },
    {
      title: 'Unscheduled',
      dataIndex: 'unscheduled',
      sorter: (a, b) =>
        Number(a.unscheduled.match(/\d/)) - Number(b.unscheduled.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="unscheduled"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }

        return formatCurrency(record.attributes.unscheduled);
      },
    },
    {
      title: 'Test Patient',
      dataIndex: 'test_patient',
      sorter: (a, b) =>
        Number(a.test_patient.match(/\d/)) - Number(b.test_patient.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_patient">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testPatient =
          record.attributes.patient_chart_audit_extras[0].patient;
        return testPatient;
      },
    },
    {
      title: 'Test Outside Dr.',
      dataIndex: 'test_outside_dr',
      sorter: (a, b) =>
        Number(a.test_outside_dr.match(/\d/)) -
        Number(b.test_outside_dr.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_outside_dr">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testOutsideDr =
          record.attributes.patient_chart_audit_extras[0].outside_dr;

        return testOutsideDr;
      },
    },
    {
      title: 'Test Marketing',
      dataIndex: 'test_marketing',
      sorter: (a, b) =>
        Number(a.test_marketing.match(/\d/)) -
        Number(b.test_marketing.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_marketing">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testMarketing =
          record.attributes.patient_chart_audit_extras[0].marketing;
        return testMarketing;
      },
    },
    {
      title: 'Test Yellow Pages',
      dataIndex: 'test_yellow_pages',
      sorter: (a, b) =>
        Number(a.test_yellow_pages.match(/\d/)) -
        Number(b.test_yellow_pages.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_yellow_pages">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testYellowPages =
          record.attributes.patient_chart_audit_extras[0].yellow_pages;

        return testYellowPages;
      },
    },
    {
      title: 'Test Insurance',
      dataIndex: 'test_insurance',
      sorter: (a, b) =>
        Number(a.test_insurance.match(/\d/)) -
        Number(b.test_insurance.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_insurance">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testInsurance =
          record.attributes.patient_chart_audit_extras[0].yellow_pages;
        return testInsurance;
      },
    },
    {
      title: 'Test Walk-in',
      dataIndex: 'test_walk_in',
      sorter: (a, b) =>
        Number(a.test_walk_in.match(/\d/)) - Number(b.test_walk_in.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_walk_in">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testWalkIn =
          record.attributes.patient_chart_audit_extras[0].walk_in;
        return testWalkIn;
      },
    },
    {
      title: 'Test Unknown',
      dataIndex: 'test_unknown',
      sorter: (a, b) =>
        Number(a.test_unknown.match(/\d/)) - Number(b.test_unknown.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_unknown">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testUnknown =
          record.attributes.patient_chart_audit_extras[0].unknown;
        return testUnknown;
      },
    },
    {
      title: 'Test Other',
      dataIndex: 'test_other',
      sorter: (a, b) =>
        Number(a.test_other.match(/\d/)) - Number(b.test_other.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="test_other">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const testOther = record.attributes.patient_chart_audit_extras[0].other;
        return testOther;
      },
    },
    {
      title: 'Proposed Patient',
      dataIndex: 'proposed_patient',
      sorter: (a, b) =>
        Number(a.proposed_patient.match(/\d/)) -
        Number(b.proposed_patient.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_patient">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedPatient =
          record.attributes.patient_chart_audit_extras[0].patient;
        return proposedPatient;
      },
    },
    {
      title: 'Proposed Outside Dr.',
      dataIndex: 'proposed_outside_dr',
      sorter: (a, b) =>
        Number(a.proposed_outside_dr.match(/\d/)) -
        Number(b.proposed_outside_dr.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_outside_dr">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedOutsideDr =
          record.attributes.patient_chart_audit_extras[0].outside_dr;

        return proposedOutsideDr;
      },
    },
    {
      title: 'Proposed Marketing',
      dataIndex: 'proposed_marketing',
      sorter: (a, b) =>
        Number(a.proposed_marketing.match(/\d/)) -
        Number(b.proposed_marketing.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_marketing">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedMarketing =
          record.attributes.patient_chart_audit_extras[0].marketing;
        return proposedMarketing;
      },
    },
    {
      title: 'Proposed Yellow Pages',
      dataIndex: 'proposed_yellow_pages',
      sorter: (a, b) =>
        Number(a.proposed_yellow_pages.match(/\d/)) -
        Number(b.proposed_yellow_pages.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_yellow_pages">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedYellowPages =
          record.attributes.patient_chart_audit_extras[0].yellow_pages;

        return proposedYellowPages;
      },
    },
    {
      title: 'Proposed Insurance',
      dataIndex: 'proposed_insurance',
      sorter: (a, b) =>
        Number(a.proposed_insurance.match(/\d/)) -
        Number(b.proposed_insurance.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_insurance">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedInsurance =
          record.attributes.patient_chart_audit_extras[0].yellow_pages;
        return proposedInsurance;
      },
    },
    {
      title: 'Proposed Walk-in',
      dataIndex: 'proposed_walk_in',
      sorter: (a, b) =>
        Number(a.proposed_walk_in.match(/\d/)) -
        Number(b.proposed_walk_in.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_walk_in">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedWalkIn =
          record.attributes.patient_chart_audit_extras[0].walk_in;
        return proposedWalkIn;
      },
    },
    {
      title: 'Proposed Unknown',
      dataIndex: 'proposed_unknown',
      sorter: (a, b) =>
        Number(a.proposed_unknown.match(/\d/)) -
        Number(b.proposed_unknown.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_unknown">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedUnknown =
          record.attributes.patient_chart_audit_extras[0].unknown;
        return proposedUnknown;
      },
    },
    {
      title: 'Proposed Other',
      dataIndex: 'proposed_other',
      sorter: (a, b) =>
        Number(a.proposed_other.match(/\d/)) -
        Number(b.proposed_other.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="proposed_other">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const proposedOther =
          record.attributes.patient_chart_audit_extras[0].other;
        return proposedOther;
      },
    },
    {
      title: 'Completed Patient',
      dataIndex: 'completed_patient',
      sorter: (a, b) =>
        Number(a.completed_patient.match(/\d/)) -
        Number(b.completed_patient.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_patient">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedPatient =
          record.attributes.patient_chart_audit_extras[2].patient;
        return completedPatient;
      },
    },
    {
      title: 'Completed Outside Dr.',
      dataIndex: 'completed_outside_dr',
      sorter: (a, b) =>
        Number(a.completed_outside_dr.match(/\d/)) -
        Number(b.completed_outside_dr.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_outside_dr">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedOutsideDr =
          record.attributes.patient_chart_audit_extras[2].outside_dr;

        return completedOutsideDr;
      },
    },
    {
      title: 'Completed Marketing',
      dataIndex: 'completed_marketing',
      sorter: (a, b) =>
        Number(a.completed_marketing.match(/\d/)) -
        Number(b.completed_marketing.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_marketing">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedMarketing =
          record.attributes.patient_chart_audit_extras[2].marketing;
        return completedMarketing;
      },
    },
    {
      title: 'Completed Yellow Pages',
      dataIndex: 'completed_yellow_pages',
      sorter: (a, b) =>
        Number(a.completed_yellow_pages.match(/\d/)) -
        Number(b.completed_yellow_pages.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_yellow_pages">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedYellowPages =
          record.attributes.patient_chart_audit_extras[2].yellow_pages;

        return completedYellowPages;
      },
    },
    {
      title: 'Completed Insurance',
      dataIndex: 'completed_insurance',
      sorter: (a, b) =>
        Number(a.completed_insurance.match(/\d/)) -
        Number(b.completed_insurance.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_insurance">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedInsurance =
          record.attributes.patient_chart_audit_extras[2].yellow_pages;
        return completedInsurance;
      },
    },
    {
      title: 'Completed Walk-in',
      dataIndex: 'completed_walk_in',
      sorter: (a, b) =>
        Number(a.completed_walk_in.match(/\d/)) -
        Number(b.completed_walk_in.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_walk_in">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedWalkIn =
          record.attributes.patient_chart_audit_extras[2].walk_in;
        return completedWalkIn;
      },
    },
    {
      title: 'Completed Unknown',
      dataIndex: 'completed_unknown',
      sorter: (a, b) =>
        Number(a.completed_unknown.match(/\d/)) -
        Number(b.completed_unknown.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_unknown">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedUnknown =
          record.attributes.patient_chart_audit_extras[2].unknown;
        return completedUnknown;
      },
    },
    {
      title: 'Completed Other',
      dataIndex: 'completed_other',
      sorter: (a, b) =>
        Number(a.completed_other.match(/\d/)) -
        Number(b.completed_other.match(/\d/)),
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item className="input-item" name="completed_other">
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          );
        }
        const completedOther =
          record.attributes.patient_chart_audit_extras[2].other;
        return completedOther;
      },
    },

    {
      title: '',
      dataIndex: 'action',
      width: '50px',
      render: (_, record) => (
        <>
          {record.key === INITIAL_VALUE && (
            <Form.Item>
              <Button
                icon={<PlusOutlined />}
                shape="circle"
                htmlType="submit"
              />
            </Form.Item>
          )}
          {record.key !== INITIAL_VALUE && (
            <Button
              icon={<DeleteOutlined />}
              shape="circle"
              type="danger"
              onClick={() => removeItem(record.id)}
            />
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchStudents();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchChartAuditList();
  }, [studentInfo]);

  const fetchChartAuditList = async () => {
    const { id } = studentInfo;
    console.log('iod ne', id);
    if (id) {
      const res = await fetchChartAudit({ id });
      if (res.length > 0) {
        const data = res;
        if (data) {
          const temp = [...data, { key: INITIAL_VALUE }];
          setDataSource(temp);
        }
      }
    }
  };

  const deleteChartAuditById = async (id) => {
    if (id) {
      const res = await deleteChartAudit({ id });
      return res;
    }
    return { error: 'no id' };
  };

  // componentDidMount() {
  //   const { fetchStudents } = this.props;

  //   fetchStudents();

  //   setTimeout(() => {
  //     this.setState({
  //       loading: false,
  //     });
  //   }, 1000);
  // }

  const addItem = async (data) => {
    const { id } = studentInfo;
    if (!id) {
      alert('Please choose student before add data');
    }

    const temp = {
      user_id: id,
      amount: data.amount,
      amount_diagnosed: data.amount_diagnosed,
      amount_treatment: data.amount_treatment,
      case: data.case,
      chart: data.chart,
      completed: data.completed,
      diagnosed: data.diagnosed,
      doctor_appt: data.doctor_appt,
      dr: data.dr,
      dr_appt: data.dr_appt,
      has_appt: data.has_appt,
      hyg: data.hyg,
      hygiene_appt: data.hygiene_appt,
      patient: data.patient,
      proposed: data.proposed,
      referral_source: data.referral_source,
      scheduled: data.scheduled,
      unscheduled: data.unscheduled,
      unscheduled_remaining: data.unscheduled_remaining,
      patient_chart_audit_extras_attributes: [
        {
          section: 'tests',
          insurance: data.test_patient,
          marketing: data.test_marketing,
          other: data.test_other,
          outside_dr: data.test_outside_dr,
          patient: data.test_patient,
          unknown: data.test_unknown,
          walk_in: data.test_walk_in,
          yellow_pages: data.test_yellow_pages,
        },
        {
          section: 'proposed',
          insurance: data.proposed_insurance,
          marketing: data.proposed_marketing,
          other: data.proposed_other,
          outside_dr: data.proposed_outside_dr,
          patient: data.proposed_patient,
          unknown: data.proposed_unknown,
          walk_in: data.proposed_walk_in,
          yellow_pages: data.proposed_yellow_pages,
        },
        {
          section: 'completed',
          insurance: data.completed_insurance,
          marketing: data.completed_marketing,
          other: data.completed_other,
          outside_dr: data.completed_outside_dr,
          patient: data.completed_patient,
          unknown: data.completed_unknown,
          walk_in: data.completed_walk_in,
          yellow_pages: data.completed_yellow_pages,
        },
      ],
    };
    const res = await postChartAudit({
      id,
      payload: temp,
    });
    if (res) {
      fetchChartAuditList();
    }
  };

  const removeItem = async (id) => {
    const res = await deleteChartAuditById(id);
    if (res.success) {
      const temp = dataSource.filter((item) => item.id !== id);
      setDataSource(temp);
    }
  };

  // const { loading, dataSource, studentInfo } = this.state;
  // const { students } = this.props;

  return (
    <>
      <div
        style={{
          marginBottom: 20,
          width: 'auto',
        }}
      >
        <Descriptions title="Doctor's Personal Information" column={12}>
          <Descriptions.Item span={12} label="First Name">
            {studentInfo?.first_name}
          </Descriptions.Item>
          <Descriptions.Item span={12} label="Last Name">
            {studentInfo?.last_name}
          </Descriptions.Item>
          <Descriptions.Item span={12} label="Degree">
            {studentInfo?.degree?.toUpperCase()}
          </Descriptions.Item>
        </Descriptions>

        <span>Student:</span>
        <Select
          style={{ width: 200, marginLeft: 10 }}
          onChange={async (id) => {
            setLoading(true);
            const temp = students.find((student) => student.id === id);
            setStudentInfo(temp);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          {students.map((student, index) => (
            <Option value={student.id} key={index.toString()}>
              {`${student.first_name} ${student.last_name}`}
            </Option>
          ))}
        </Select>
      </div>

      <Form
        ref={formRef}
        className="form-wrapper"
        name="data"
        autoComplete="off"
        onFinish={addItem}
      >
        <div style={{ overflowY: 'scroll' }}>
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={{ position: ['bottomLeft'] }}
          />
        </div>
      </Form>
    </>
  );
};

ChartAudit.propTypes = {
  students: PropTypes.array,
  fetchStudents: PropTypes.func,
};

const mapStateToProps = ({ student, error }) => ({
  students: student.items,
  loading: student.loading,
});

export default connect(mapStateToProps, {
  fetchStudents,
})(ChartAudit);
