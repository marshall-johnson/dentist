import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach } from 'lodash';
import {
  Table,
} from 'antd';

import {
  fetchClassRoomsCompleted
} from '@/actions/classRoomCompletedActions';


const classCompletedColumns = [
  {
    title: 'Class Name',
    dataIndex: 'className',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Materials',
    dataIndex: 'material',
  },
];

class ClassCompleted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  }

  componentDidMount() {
    const { fetchClassRoomsCompleted, page } = this.props;
    fetchClassRoomsCompleted({ page });
  }

  handleTableChange = (pagination) => {
  }

  classCompletedData = () => {
    const { items } = this.props;
    const data = [];

    forEach(items, item => {
      const {
        name: className,
        date,
        materialInclude,
      } = item.attributes;

      data.push({
        key: item.id,
        className,
        date,
        material: materialInclude,
      });
    });

    return data;
  }

  render() {
    const {
      pagination,
    } = this.state;

    const {
      loading
    } = this.props;

    return (
      <div className="class-completed-container">
        <h1>Classes Completed</h1>
        <Table
          columns={classCompletedColumns}
          dataSource={this.classCompletedData()}
          rowKey={record => record.key}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

ClassCompleted.propTypes = {
  fetchClassRoomsCompleted: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  // totalCount: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = ({ classRoomCompleted, error }) => ({
  items: classRoomCompleted.items,
  totalCount: classRoomCompleted.totalCount,
  page: classRoomCompleted.page,
  loading: classRoomCompleted.loading,
});

export default connect(mapStateToProps, {
  fetchClassRoomsCompleted,
})(ClassCompleted);
