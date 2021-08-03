import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Table,
  Space,
  Button,
  Select,
  Divider,
  PageHeader,
  Typography,
} from 'antd';

const { Text } = Typography;

const options = [{ value: 'Item 1' }, { value: 'Item 2' }, { value: 'Item 3' }];

const columns = [
  {
    title: 'Item Name',
    dataIndex: 'itemName',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'MSRP',
    dataIndex: 'msrp',
    render: price => <span>${price}</span>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    render: price => <span>${price}</span>,
  },
];

const data = [
  {
    key: '1',
    itemName: 'Item 1',
    description: 'Booking on Savings',
    msrp: 33.99,
    quantity: 1,
    total: 39.99,
  },
  {
    key: '2',
    itemName: 'Item 2',
    description: 'Tracking Pad',
    msrp: 10.99,
    quantity: 3,
    total: 32.97,
  },
  {
    key: '3',
    itemName: 'Item 3',
    description: 'CFPD Mug',
    msrp: 15.99,
    quantity: 1,
    total: 15.99,
  },
];

class PurchaseItemsContainer extends Component {

  formatPrice = price => `$${(Math.round(price * 100) / 100).toFixed(2)}`;

  render() {
    const taxes = 8.90;

    return (
      <div className="purchase-items-container">
        <PageHeader
          className="site-page-header"
          title="Purchase Items Page"
        />
        <Divider />
        <Form layout="vertical">
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="Select Items">
                <Select
                  style={{ 'width': '100%' }}
                  mode="multiple"
                  placeholder="Select Items"
                  defaultValue={['Item 1', 'Item 2', 'Item 3']}
                  options={options}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                summary={pageData => {
                  let subTotal = 0;
                  let total = 0;

                  pageData.forEach(({ total: totalItemPrice }) => {
                    subTotal += totalItemPrice;
                  });

                  total = subTotal + taxes;

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={5} />
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell>
                          <Text strong>Subtotal</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={3} />
                        <Table.Summary.Cell>
                          <Text strong>{this.formatPrice(subTotal)}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={5} />
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell>
                          <Text strong>Taxes</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={3} />
                        <Table.Summary.Cell>
                          <Text strong>{this.formatPrice(taxes)}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell>
                          <Text strong>Total</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={3} />
                        <Table.Summary.Cell>
                          <Text strong>{this.formatPrice(total)}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 32 }}>
            <Col>
              <Space>
                <Button
                  type="primary"
                >
                  Back
                </Button>
                <Button
                  type="primary"
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

export default PurchaseItemsContainer;
