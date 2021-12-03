import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { fetchStudents, deleteStudent } from '@/actions/studentActions';
import PropTypes from 'prop-types';
import { Button, Table, Form, PageHeader, Divider, Pagination } from 'antd';
import React, { Component } from 'react';
import { capitalizeFirstLetter } from '@/utils/helpers';
import './index.scss';
import AppConfig from '@/constants/AppConfig';

class ManagementStudent extends Component {
  formRef = React.createRef();

  columns = [
    {
      title: 'ID',
      width: '100px',
      dataIndex: 'id',
      render: (value) => <span style={{ fontWeight: 'bold' }}>{value}</span>,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      render: (value) => value,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      render: (value) => value,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (value) => value,
    },
    {
      title: 'Type',
      dataIndex: 'account_type',
      render: (value) => capitalizeFirstLetter(value?.split('_')?.[1]),
    },
    {
      title: '',
      dataIndex: 'action',
      width: '100px',
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Form.Item style={{ marginRight: 10 }}>
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                const { history } = this.props;
                history.push(
                  `${AppConfig.ROUTES.MANGEMENT}/${AppConfig.MANGEMENT.STUDENT}/${record.id}`,
                );
              }}
              shape="circle"
              type="primary"
              htmlType="submit"
            />
          </Form.Item>
          <Form.Item>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                const { deleteStudent } = this.props;
                deleteStudent(record.id);
              }}
              shape="circle"
              type="danger"
              htmlType="submit"
            />
          </Form.Item>
        </div>
      ),
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      searchParams: {
        size: 5,
        number: 1,
      },
    };
  }

  componentDidMount() {
    const { fetchStudents } = this.props;
    const { searchParams } = this.state;

    fetchStudents(searchParams);
  }

  render() {
    const { students, loading, meta, fetchStudents } = this.props;
    const { searchParams } = this.state;

    return (
      <div className="profit-and-loss-container">
        <PageHeader className="site-page-header" title="Management Student" />
        <Divider />
        <Form
          ref={this.formRef}
          className="form-wrapper"
          name="data"
          autoComplete="off"
        >
          <Table
            pagination={false}
            dataSource={students || []}
            columns={this.columns}
            loading={loading}
          />
        </Form>
        <Pagination
          defaultCurrent={searchParams?.number || 1}
          total={meta?.total_record || 0}
          style={{ marginTop: 50 }}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 15, 20]}
          showSizeChanger
          onChange={(page, pageSize) => {
            this.setState({
              searchParams: {
                number: page,
                size: pageSize,
              },
            });
            fetchStudents({
              number: page,
              size: pageSize,
            });
          }}
        />
        ,
      </div>
    );
  }
}

ManagementStudent.propTypes = {
  students: PropTypes.array,
  fetchStudents: PropTypes.func,
  deleteStudent: PropTypes.func,
  history: PropTypes.object,
  meta: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = ({ student }) => ({
  students: student.items,
  loading: student.loading,
  meta: student.meta,
});

export default connect(mapStateToProps, {
  fetchStudents,
  deleteStudent,
})(ManagementStudent);
