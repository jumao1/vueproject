import React, { Component } from 'react'
import "./Product.css"
import { Button, Table, Space, message, Popconfirm, Select } from "antd"
import axios from 'axios'
import PubSub from 'pubsub-js'
import AddProduct from './component/AddProduct'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditProduct from './component/EditProduct'
const { Column } = Table
const { Option } = Select
export default class Product extends Component {
    state = {
        addVisibel: false,
        updateVisibel: false,
        page: "4",
        limit: '2',
        totalCount: '',
        key: '',
        list: [
            {
                id: "",
                productName: "",
                cid: "",
                unit: "",
                unitPrice: '',
                totalPrice: '',
                nums: '',
                date: ""
            },
        ],
        // classifyList: ["橘子", "苹果"]
        product: {}
    }
    handelAdd = () => {
        console.log('添加')
        this.setState({ addVisibel: true })
    }
    // 关闭添加弹窗
    closeAdd = () => {
        console.log('guan')
        this.setState({ addVisibel: false })
    }
    //关闭修改弹窗
    closeUpdate = () => {
        console.log('关闭修改弹窗')
        this.getProduct()
        this.setState({ updateVisibel: false })
    }
    // 打开修改弹窗
    handelUpdate = () => {
        console.log('kai')
        this.setState({ updateVisibel: true })
    }
    changeState = (msg, data) => {
        this.setState(data)
    }
    componentDidMount() {
        this.getProduct()
        // 订阅消息
        this.token = PubSub.subscribe('methodName', this.changeState)

    }
    componentWillUnmount() {
        // 取消消息订阅
        PubSub.unsubscribe(this.token)
    }
    handelSelectChange(e) {
        let val = e.target.value
    }
    /**接收兄弟组件传过来的参数 */
    // 使用PubSub.subscribe接收数据

    /**获取产品列表 */
    getProduct = (current) => {
        axios.post('/api/product/product/list', {
            params: {
                page: this.state.page,
                limit: this.state.limit,
                key: this.state.key
            }
        }).then(res => {
            // console.log(res)
            this.setState({ list: res.data.page.list })
            this.setState({ totalCount: res.data.page.totalCount })
        })
    }
    /**删除产品信息 */
    delProduct = (id) => {
        axios.post('/api/product/product/delete', [id]).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                message.success('删除成功', 1, (current) => this.getProduct(current))
            } else {
                message.error(res.data.msg)
            }
        })
    }
    render() {
        const { classifyList } = this.state
        return (
            <div>
                <Button type="primary"
                    style={{ marginBottom: 20 }}
                    onClick={this.handelAdd}>添加产品</Button>
                <Table dataSource={this.state.list} rowKey="id" pagination={{
                    pageSize: this.state.limit,
                    total: this.state.totalCount,
                    current: this.state.current,
                    onChange: (current) => this.getProduct(current)
                }}>
                    <Column title="编号" dataIndex="id"></Column>
                    <Column title="产品名称" dataIndex="productName"></Column>
                    <Column title="所属分类" dataIndex="cid" ></Column>
                    <Column title="单位" dataIndex="unit"></Column>
                    <Column title="单价" dataIndex="unitPrice"></Column>
                    <Column title="总价" dataIndex="totalPrice"></Column>
                    <Column title="库存" dataIndex="nums"></Column>
                    <Column title="入库时间" dataIndex="date"></Column>
                    <Column title="操作" render={(value) => {
                        return (
                            //fragment <></>
                            <Space>
                                <Button
                                    type="primary"

                                    size='middle'
                                    block="true"
                                    onClick={this.handelUpdate}
                                    icon={<EditOutlined />}
                                >更改</Button>
                                <Popconfirm
                                    title="此操作将永久删除该产品,是否继续？"
                                    onConfirm={() => this.delProduct(value.id)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type="danger" block="true" size='middle' icon={<DeleteOutlined />}>删除</Button>
                                </Popconfirm>
                            </Space>
                        )
                    }}></Column>
                </Table>
                <AddProduct
                    addVisibel={this.state.addVisibel}
                    closeAdd={this.closeAdd}
                    getProduct={() => this.getProduct()}
                ></AddProduct>
                <EditProduct
                    updateVisibel={this.state.updateVisibel}
                    closeUpdate={this.closeUpdate}
                    product={this.state.product}
                    getProduct={() => this.getProduct()}
                ></EditProduct>
            </div>
        )
    }
}
