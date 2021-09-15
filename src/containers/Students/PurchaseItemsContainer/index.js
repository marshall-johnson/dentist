import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  forEach,
} from 'lodash';
import {
  Row,
  Col,
  Form,
  Table,
  Space,
  Button,
  Divider,
  PageHeader,
  Typography,
} from 'antd';
import camelcaseKeys from 'camelcase-keys';

import api from '@/api';
import DebounceSelect from '@/components/DebounceSelect';
import {
  fetchProducts,
} from '@/actions/productActions';
import {
  submitPurchaseItems,
} from '@/actions/purchaseActions';
import { formatPrice } from '@/utils/helpers';
import {
  EditableRow,
  EditableCell,
} from './items';

import './index.scss';

const { Text } = Typography;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '${label} is required!',
};

class PurchaseItemsContainer extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Item Name',
        dataIndex: 'name',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'MSRP',
        dataIndex: 'price',
        render: price => price ? <span>${price}</span> : '',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        editable: true,
        width: '15%',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        width: '15%',
        render: price => price ? <span>${price}</span> : '',
      },
    ];

    this.state = {
      taxPercent: 0.1,
      dataSource: [],
    };
  }

  componentDidMount() {
    const { fetchProducts, page } = this.props;

    fetchProducts({ page });
  }

  fetchProductList = (keyword) => api
    .get('/api/v1/items', { params: { search: keyword } })
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
        name,
      } = item.attributes;

      data.push({
        label: name,
        value: item.id,
      });
    });

    return data;
  }

  onChange = (value) => {
    api
      .get('/api/v1/items/filter_by_ids', { params: { ids: value } })
      .then(
        ({ data: response }) => {
          const {
            result: { data: items },
          } = camelcaseKeys(response, { deep: true });
          const data = [];

          forEach(items, item => {
            const {
              name,
              price,
              description,
            } = item.attributes;

            const { id } = item;

            data.push({
              id,
              name,
              price,
              key: id,
              description,
              quantity: 1,
              total: price * 1,
            });
          });

          this.setState({
            dataSource: data
          });
        },
      )
      .catch((error) => {
        throw error;
      });
  }

  handleSave = (row) => {
    const { dataSource } = this.state;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const quantity = row.quantity * 1;
    const total = formatPrice(quantity * row.price * 1) * 1;

    newData.splice(index, 1, { ...item, ...row, total, quantity });
    this.setState({
      dataSource: newData,
    });
  };

  onFinish = data => {
    const { dataSource } = this.state;
    const { submitPurchaseItems, history } = this.props;

    if (dataSource.length === 0) {
      return;
    }

    const params = {
      purchase: {
        items: dataSource.map(item => ({ id: item.id, quantity: item.quantity })),
      }
    };

    submitPurchaseItems({ params, history });
  }

  render() {
    const { dataSource, taxPercent } = this.state;

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div className="purchase-items-container">
        <PageHeader
          className="site-page-header"
          title="Purchase Items Page"
        />
        <Divider />
        <Form
          ref={this.formRef}
          layout="vertical"
          onFinish={this.onFinish}
          validateMessages={validateMessages}
        >
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Select Items"
                rules={[{ required: true }]}
                name="itemIds"
                fieldKey="itemIds"
              >
                <DebounceSelect
                  mode="multiple"
                  optionInit={this.optionInit()}
                  placeholder="Select Items"
                  fetchOptions={this.fetchProductList}
                  style={{ width: '100%' }}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Table
            bordered
            columns={columns}
            pagination={false}
            dataSource={dataSource}
            components={components}
            rowClassName={() => 'editable-row'}
            summary={pageData => {
              let subTotal = 0;
              let total = 0;
              let tax = 0;

              pageData.forEach(({ total: totalItemPrice }) => {
                subTotal += totalItemPrice;
              });
              tax = subTotal * taxPercent;
              total = subTotal * 1 + tax;

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
                      <Text strong>${formatPrice(subTotal)}</Text>
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
                      <Text strong>${formatPrice(tax)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={3} />
                    <Table.Summary.Cell>
                      <Text strong>${formatPrice(total)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
          <Row style={{ marginTop: 32 }}>
            <Col>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
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

PurchaseItemsContainer.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  fetchProducts: PropTypes.func,
  submitPurchaseItems: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = ({ product, error }) => ({
  items: product.items,
  totalCount: product.totalCount,
  page: product.page,
});

export default connect(
  mapStateToProps, {
  fetchProducts,
  submitPurchaseItems,
})(PurchaseItemsContainer);
