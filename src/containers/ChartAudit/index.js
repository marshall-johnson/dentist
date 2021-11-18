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
import React, { Component } from 'react';
import './index.scss';
import { formatCurrency } from '@/utils/helpers';

const INITIAL_VALUE = 'initial';
const { Option } = Select;

class ChartAudit extends Component {
  identifySource = [
    { text: 'Source A', value: 'a' },
    { text: 'Source B', value: 'b' },
  ];

  formRef = React.createRef();

  columns = [
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

        return value;
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

        return formatCurrency(value);
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

        return formatCurrency(value);
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

        return formatCurrency(value);
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

        return value ? 'Yes' : 'No';
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

        return value ? 'Yes' : 'No';
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

        return formatCurrency(value);
      },
    },
    {
      title: 'Identify Referral Source',
      dataIndex: 'referral_source',
      sorter: (a, b) => a.referral_source - b.referral_source,
      filters: this.identifySource,
      render: (value, record) => {
        if (record.key === INITIAL_VALUE) {
          return (
            <Form.Item
              className="input-item"
              name="referral_source"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select>
                {this.identifySource.map((data) => (
                  <Option value={data.value}>{data.text}</Option>
                ))}
              </Select>
            </Form.Item>
          );
        }

        return `Source ${value.toUpperCase()}`;
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

        return formatCurrency(value);
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
              onClick={() => this.removeItem(record.id)}
            />
          )}
        </>
      ),
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dataSource: [
        {
          key: INITIAL_VALUE,
        },
      ],
    };
  }

  componentDidMount() {
    const { fetchStudents } = this.props;

    fetchStudents();

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  addItem = (data) => {
    this.setState((prevState) => ({
      dataSource: [
        ...prevState.dataSource,
        { ...data, id: prevState.dataSource.length },
      ],
    }));
    this.formRef.current.resetFields();
  };

  removeItem = (id) => {
    this.setState((prevState) => ({
      dataSource: prevState.dataSource.filter((value) => value.id !== id),
    }));
  };

  render() {
    const { loading, dataSource } = this.state;
    const { students } = this.props;

    return (
      <>
        <div
          style={{
            marginBottom: 20,
            width: 'auto',
          }}
        >
          <Descriptions title="Doctor's Personal Information" column={12}>
            <Descriptions.Item span={12} label="First Name" />
            <Descriptions.Item span={12} label="Last Name" />
            <Descriptions.Item span={12} label="Degree">
              DDS
            </Descriptions.Item>
          </Descriptions>

          <span>Students:</span>
          <Select
            style={{ width: 200, marginLeft: 10 }}
            onChange={async (id) => {
              this.setState({
                loading: true,
              });
              setTimeout(() => {
                this.setState({
                  loading: false,
                });
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
          ref={this.formRef}
          className="form-wrapper"
          name="data"
          autoComplete="off"
          onFinish={this.addItem}
        >
          <Table
            dataSource={dataSource}
            columns={this.columns}
            loading={loading}
          />
        </Form>
      </>
    );
  }
}

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
