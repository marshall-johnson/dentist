import React, { Component } from 'react';
import './index.scss';
import { Button, Form } from 'antd';
import { tabsleft, tabsright } from './config';
import TabSummary from '../tab1/tabSummary';

class Tab1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: {},
      totalTabLeft: 0,
      totalTabRight: 0,
    };
  }

  handleTotal = (_, value) => {
    const total = {};
    Object.keys(value).forEach((field) => {
      const fieldObject = value[field];
      total[field] = Object.keys(fieldObject).reduce(
        (previous, value) => previous + (Number(fieldObject[value]) || 0),
        0,
      );
    });

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

    return (
      <Form
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
              totalData={[{ label: 'Total', value: totalTabLeft }]}
            />
          </div>
          <div style={{ width: '100%' }}>
            <TabSummary
              total={total}
              tabData={tabsright}
              totalData={[
                { label: 'IRA', value: 0 },
                { label: 'Total', value: totalTabRight },
              ]}
            />
          </div>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20, marginTop: 50 }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

Tab1.propTypes = {};

export default Tab1;
