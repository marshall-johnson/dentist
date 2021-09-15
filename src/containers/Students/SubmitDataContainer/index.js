import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Radio,
  Upload,
  Button,
  Divider,
  PageHeader,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import AppConfig from '@/constants/AppConfig';

class SubmitDataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      practiceType: null
    };
  }

  componentDidMount() {
    window.onbeforeunload = (e) => {
      localStorage.removeItem('dentistryDoctorProduction');
      localStorage.removeItem('dentistryHygienistProduction');
      localStorage.removeItem('dentistryPatientActivity');
      localStorage.removeItem('dentistryCollections');
      localStorage.removeItem('dentistryStaffCompensation');
      localStorage.removeItem('dentistryOccupanyAndHP');
      localStorage.removeItem('dentistrySuppliesAndMarketing');
      localStorage.removeItem('dentistryLaboratory');
      localStorage.removeItem('dentistryAdministrativeServices');
      localStorage.removeItem('dentistryDoctorSalary');
      localStorage.removeItem('dentistrySolvencySavingsROIFunds');
      localStorage.removeItem('orthoDoctorProduction');
      localStorage.removeItem('orthoPatientActivity');
      localStorage.removeItem('orthoStaffCompensation');
      localStorage.removeItem('orthoOccupanyAndHP');
      localStorage.removeItem('orthoSuppliesAndMarketing');
      localStorage.removeItem('orthoDoctorSalary');
      localStorage.removeItem('orthoLaboratory');
      localStorage.removeItem('orthoAdministrativeServices');
    };
  }

  normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  renderManuallyEnterData = () => {
    const { practiceType } = this.state;
    let href = null;

    if (practiceType === 'dentistry') {
      href = `${AppConfig.ROUTES.DENTISTRY}/${AppConfig.DENTISTRY_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`;
    }

    if (practiceType === 'ortho') {
      href = `${AppConfig.ROUTES.ORTHO}/${AppConfig.ORTHO_SUBMIT_DATA_STEPS.DOCTOR_PRODUCTION}`;
    }

    if (href) {
      return (
        <Button
          href={href}
          type="primary"
        >
          Manually Enter Data
        </Button>
      );
    }

    return null;
  }

  onChangePracticeType = (e) => {
    this.setState({ practiceType: e.target.value });
  }

  render() {
    return (
      <div className="submit-data-container">
        <PageHeader
          className="site-page-header"
          title="Submit Data Page"
        />

        <Divider />

        <Row align="bottom">
          <Col span={12}>
            <Form
              onFinish={this.onFinish}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please pick an item!',
                  },
                ]}
                name="radio-group"
                label="Select Practice Type:"
              >
                <Radio.Group
                  onChange={this.onChangePracticeType}
                >
                  <Radio value="dentistry">Dentistry</Radio>
                  <Radio value="ortho">Ortho</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={this.normFile}
                rules={[
                  {
                    required: true,
                    message: 'Please upload an item!',
                  },
                ]}
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Upload name="file" listType="picture">
                  <Button icon={<UploadOutlined />}>Browser</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
                style={{ marginBottom: 0 }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            {this.renderManuallyEnterData()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubmitDataContainer;
