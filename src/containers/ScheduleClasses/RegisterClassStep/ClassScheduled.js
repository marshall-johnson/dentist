import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forEach } from 'lodash';
import {
  Table,
} from 'antd';

import {
  fetchClassRoomsScheduled
} from '@/actions/classRoomScheduledActions';

const classScheduledColumns = [
  {
    title: 'Class Name',
    dataIndex: 'className',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
  },
  {
    title: 'Material',
    dataIndex: 'material',
  },
];

class ClassScheduled extends Component {
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
    const { fetchClassRoomsScheduled, page } = this.props;
    fetchClassRoomsScheduled({ page });
  }

  handleTableChange = (pagination) => {

  }

  classScheduledData = () => {
    const { items } = this.props;
    const data = [];

    forEach(items, item => {
      const {
        name: className,
        date,
        startTime,
        endTime,
        materialInclude,
      } = item.attributes;

      data.push({
        key: item.id,
        className,
        date,
        startTime,
        endTime,
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
      <div className="class-scheduled-container">
        <h1>Classes Scheduled</h1>
        <Table
          columns={classScheduledColumns}
          dataSource={this.classScheduledData()}
          rowKey={record => record.key}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

ClassScheduled.propTypes = {
  fetchClassRoomsScheduled: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  // totalCount: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = ({ classRoomScheduled, error }) => ({
  items: classRoomScheduled.items,
  totalCount: classRoomScheduled.totalCount,
  page: classRoomScheduled.page,
  loading: classRoomScheduled.loading,
});

export default connect(mapStateToProps, {
  fetchClassRoomsScheduled,
})(ClassScheduled);
