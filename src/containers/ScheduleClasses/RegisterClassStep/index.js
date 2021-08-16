import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  forEach,
} from 'lodash';
import {
  Row,
  Col,
  Form,
  Button,
  Divider,
  Calendar,
  PageHeader,
} from 'antd';
import camelcaseKeys from 'camelcase-keys';

import api from '@/api';
import DebounceSelect from '@/components/DebounceSelect';
import {
  fetchClassRooms
} from '@/actions/classRoomActions';

import ClassScheduled from './ClassScheduled';
import ClassCompleted from './ClassCompleted';
import './index.scss';

class RegisterClassStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classSelected: null,
      dateSelected: moment(),
    };
  }

  componentDidMount() {
    const { fetchClassRooms, page } = this.props;
    fetchClassRooms({ page });
  }

  fetchClassList = (keyword) => api
    .get('/api/v1/class_rooms', { params: { search: keyword } })
    .then(({ data: response }) => camelcaseKeys(response, { deep: true }))
    .then(({ result }) => result.data.map((item) => ({
      label: item.attributes.name,
      value: item.id,
    })))
    .catch((error) => {
      throw error;
    })

  optionInit = () => {
    const {
      items
    } = this.props;

    const data = [];

    forEach(items, item => {
      const {
        name: className,
      } = item.attributes;

      data.push({
        label: className,
        value: item.id,
      });
    });

    return data;
  }

  onChangeSelect = (classSelected) => {
    this.setState({ classSelected });
  }

  onCalendarSelect = (value) => {
    this.setState({ dateSelected: value });
  }

  onPanelChange = (value, mode) => {
    this.setState({ dateSelected: value });
  }

  render() {
    const {
      classSelected,
      dateSelected
    } = this.state;

    const { onNextPage } = this.props;

    return (
      <div className="schedule-class-register-container">
        <PageHeader
          className="site-page-header"
          title="Schedule Classes / Sessions"
        />
        <Divider />

        <Form
          layout="vertical"
          onFinish={onNextPage}
        >
          <Row gutter={48}>
            <Col span={8}>
              <Form.Item
                label="Select Class"
                name="classSelected"
                rules={[{ required: true, message: 'Class is required' }]}
              >
                <DebounceSelect
                  showSearch
                  value={classSelected}
                  optionInit={this.optionInit()}
                  placeholder="Select class"
                  fetchOptions={this.fetchClassList}
                  onChange={this.onChangeSelect}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="date"
                className="calendar"
                initialValue={dateSelected}
              >
                <Calendar
                  fullscreen={false}
                  value={dateSelected}
                  onSelect={this.onCalendarSelect}
                  onPanelChange={this.onPanelChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Col>
          </Row>
        </Form>

        <Divider />

        <ClassScheduled />

        <Divider />

        <ClassCompleted />
      </div>
    );
  }
}

RegisterClassStep.propTypes = {
  fetchClassRooms: PropTypes.func,
  items: PropTypes.array,
  page: PropTypes.number,
  onNextPage: PropTypes.func,
};

const mapStateToProps = ({ classRoom, error }) => ({
  items: classRoom.items,
  totalCount: classRoom.totalCount,
  page: classRoom.page,
  loading: classRoom.loading,
});

export default connect(mapStateToProps, {
  fetchClassRooms,
})(RegisterClassStep);
