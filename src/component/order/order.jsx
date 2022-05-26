import React, { Component } from 'react'
import { Button, message, Table, Input, TimePicker, Popconfirm } from 'antd';
import moment from 'moment';
import { Space } from 'antd';
import Form from 'antd/lib/form/Form';
import axios from 'axios';
import EditOrder from './component/EditOrder';
import AddOrder from './component/AddOrder';
import { EditOutlined, DeleteOutlined, ProfileOutlined } from '@ant-design/icons';

const { Column } = Table
const { Search } = Input;
export default class order extends Component {
    state = {
        id: '',
        addVisibel: false,
        editVisible: false,
        page: '5',
        limit: '2',
        totalCount: '',
        list: [
            {
                coustomer: '',
                createtime: '',
                paytype: '',
                business: '',
                id: '',
            }
        ],
    }
    componentDidMount() {
        this.getOrderList()
    }
    /**
     * 展示订单列表 订单分页查询
     */
    getOrderList = (current) => {
        console.log(current)
        axios.post('/api/order/order/list', {
            params: {
                page: this.state.page,
                limit: this.state.limit
            },
        }).then(res => {
            if (res.data.code === 0) {
                console.log(res)
                console.log(res.data.page.list)
                this.setState({ list: res.data.page.list })
            }
        })
    }
    /**删除一个订单 */
    delOrder = () => {
        axios.post('/api/order/order/delete', {

            id: this.state.id

        }).then(res => {
            console.log(res)
            console.log(this.state.id)
            if (res.data.code === 0) {
                message.success('删除成功', 1, (current) => this.getOrderList(current))
            } else {
                message.error(res.data.msg)
            }
        })
    }
    handleAdd = () => {
        // this.setState({ addVisibel: true })
        console.log('..')
        this.setState({
            addVisibel: true
        })
    }
    // 关闭添加弹窗
    closeAdd = () => {
        console.log('关闭')
        this.setState({ addVisibel: false })
    }
    render() {
        return (
            <div>
                <Button type='primary'
                    onClick={() => this.handleAdd()}
                    style={{ marginBottom: 20 }}
                >添加新订单</Button>
                {/* <Search
                    placeholder="输入用户编号"
                    allowClear
                    enterButton="Search"
                    size="middle"
                /> */}
                <Form>
                    <Table columns={this.columns} rowKey="id" dataSource={this.state.list} pagination={{
                        pageSize: this.state.limit,
                        total: this.state.totalCount,
                        current: this.state.current,
                        onChange: (current) => this.getOrderList(current)
                    }}>
                        <Column title="商品编号" dataIndex="id" width="20%"></Column>
                        <Column title="顾客名字" dataIndex="coustomer" width='30%'></Column>
                        <Column title="订单时间" dataIndex="createtime" width='30%'></Column>
                        <Column title="支付方式" dataIndex="paytype" width='70%'></Column>
                        <Column title="事务" dataIndex="business" width='50%'></Column>
                        <Column title="操作" render={(value) => {
                            return (
                                <Space >
                                    {/* <Button size='small' type="primary" onClick={this.editClassify}>修改</Button> */}

                                    <Popconfirm
                                        title="此操作将永久删除该产品,是否继续？"
                                        onConfirm={() => this.delOrder(value.id)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button type="danger" size='middle' icon={<DeleteOutlined />}>删除</Button>
                                    </Popconfirm>
                                    <Button type="primary" size='middle' icon={<EditOutlined />}>修改</Button>
                                    <Button type="dashed" size='middle' icon={<ProfileOutlined />}>查看订单</Button>
                                </Space>
                            )
                        }} ></Column>
                    </Table>
                    {/* <AddOrder addVisibel={this.state.addVisibel}></AddOrder> */}
                    <AddOrder addVisibel={this.state.addVisibel} closeAdd={this.closeAdd}></AddOrder>
                    <EditOrder></EditOrder>
                </Form>

            </div>
        )
    }
}
