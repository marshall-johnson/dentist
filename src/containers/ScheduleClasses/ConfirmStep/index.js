import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Button,
  Space,
  Divider,
  PageHeader,
  Descriptions,
} from 'antd';

import {
  getClassDetail
} from '@/actions/classRoomActions';

class ConfirmRegisterClassStep extends Component {
  componentDidMount() {
    const { getClassDetail, classIdSelected } = this.props;

    getClassDetail({ classId: classIdSelected });
  }

  renderInformationConfirm = (data) => {
    const {
      endTime,
      startTime,
      instructor,
      description,
      name: className,
      materialInclude,
    } = data;

    const { dateSelected: date } = this.props;

    return (
      <div>
        <Descriptions title="Class Selected">
          <Descriptions.Item label="Class Name">{className}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Date">{date && moment(date).format('MM/DD/YYYY')}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Start Time">{startTime}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="End Time">{endTime}</Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Description">
            {description}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Instructor">
            {instructor}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item label="Material Include">
            {materialInclude}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  render() {
    const {
      item,
      onBack,
      onSubmit,
    } = this.props;

    return (
      <div className="schedule-class-confirm-container">
        <PageHeader
          className="site-page-header"
          title="Schedule Classes / Sessions"
        />
        <Divider />

        <Form
          layout="vertical"
        >
          <Row>
            <Col span={12}>
              {item && this.renderInformationConfirm(item.attributes)}
            </Col>
          </Row>

          <Row>
            <Col>
              <Space>
                <Button
                  type="primary"
                  onClick={onBack}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

ConfirmRegisterClassStep.propTypes = {
  onBack: PropTypes.func,
  item: PropTypes.object,
  onSubmit: PropTypes.func,
  dateSelected: PropTypes.string,
  getClassDetail: PropTypes.func,
  classIdSelected: PropTypes.string,
};

const mapStateToProps = ({ classRoom }) => ({
  item: classRoom.item,
});

export default connect(mapStateToProps, {
  getClassDetail,
})(ConfirmRegisterClassStep);
