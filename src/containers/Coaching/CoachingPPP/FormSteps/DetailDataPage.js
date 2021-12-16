import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.scss';
import { Form } from 'antd';
import { formatCurrency } from '@/utils/helpers';
import { connect } from 'react-redux';
import { tabsleft, tabsright } from '../config';
import TabSummary from '../../tab1/tabSummary';

class DetailDataPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: {},
      totalTabLeft: 0,
      totalTabRight: 0,
    };
  }

  handleTotal = (_, value) => {
    const { setTotal } = this.props;
    const total = {};
    Object.keys(value).forEach((field) => {
      const fieldObject = value[field];
      total[field] = Object.keys(fieldObject).reduce(
        (previous, value) => previous + (Number(fieldObject[value]) || 0),
        0,
      );
    });

    setTotal(total);

    this.setState({
      total,
      totalTabLeft: tabsleft.reduce(
        (previous, tab) => previous + (total[tab.key] || 0),
        0,
      ),
      totalTabRight: tabsright.reduce(
        (previous, tab) => previous + (total[tab.key] || 0),
        0,
      ),
    });
  };

  render() {
    const { total, totalTabLeft, totalTabRight } = this.state;
    const { formRef } = this.props;

    return (
      <>
        <Form
          ref={formRef}
          style={{ marginTop: 40 }}
          className="form-wrapper"
          name="data"
          onValuesChange={this.handleTotal}
          autoComplete="off"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '100%', marginRight: '50px' }}>
              <TabSummary
                total={total}
                tabData={tabsleft}
                totalData={[
                  { label: 'Total', value: formatCurrency(totalTabLeft) },
                ]}
              />
            </div>
            <div style={{ width: '100%' }}>
              <TabSummary
                total={total}
                tabData={tabsright}
                totalData={[
                  { label: 'IRA', value: formatCurrency(0) },
                  { label: 'Total', value: formatCurrency(totalTabRight) },
                ]}
              />
            </div>
          </div>
        </Form>
      </>
    );
  }
}

DetailDataPage.propTypes = {
  formRef: PropTypes.object,
  setTotal: PropTypes.func,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(DetailDataPage);
