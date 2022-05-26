import React, { Component } from 'react'
import { Button, message, Table, Popconfirm, Input, Image } from 'antd';
import { Space } from 'antd';
import Form from 'antd/lib/form/Form';
import AddManager from '../Manager/component/AddManager'
import axios from 'axios';
import EditManager from './component/EditManager';
import { Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const { Column } = Table
const { Search } = Input;
export default class Manager extends Component {
    state = {
        addVisibel: false,
        editVisible: false,
        memberPass: '',
        page: 1,
        limit: 2,
        totalPage: '',
        totalCount: '',
        // limit: 2,
        list: [
            {
                memberName: '',
                id: '',
                avater: "",
            }
        ],
        memberName: "",

    }
    componentDidMount() {
        this.getRoles(1)
    }
    /**获取管理员列表 */
    getRoles = (current) => {

        // console.log(this.state.limit)
        axios.post('/api/admin/admin/list', {
            params: {
                page: this.state.page,
                limit: this.state.limit,
                memberName: this.state.memberName,
            },
        }).then(res => {
            console.log(res)
            this.setState({ list: res.data.page.list })
            // this.setState({ limit: res.data.page.pageSize })
            this.setState({ totalCount: res.data.page.totalCount })

        })
    }
    // 打开编辑弹窗
    editVisible = () => {
        console.log('kai')
        this.setState({ editVisible: true })
    }
    handleAdd = () => {
        // console.log('点击')
        this.setState({
            addVisibel: true
        })
        // console.log(this.state.addVisibel)
    }
    // handleDel = (id) => {
    //     // console.log('点击删除按钮')
    //     axios.post('/api/admin/admin/delete', [
    //     ]).then(res => {
    //         console.log(res)
    //         if (res.data.code === 0) {
    //             console.log(res.data.msg)//success
    //             // 获取list列表
    //             const { list } = this.state
    //             // 删除指定id的list对象
    //             const { id } = this.state.list;
    //             const newList = list.filter((item) => {
    //                 return item.id != id
    //             })
    //             console.log(newList)
    //             this.setState({ list: newList })
    //             console.log(list)
    //             console.log(list.memberName)
    //         }
    //     })
    // }
    /**删除管理员 */
    handleDel = (id) => {
        axios.post('/api/admin/admin/delete', [id]).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                message.success('删除成功', 1, (current) => this.getRoles(current))
            } else {
                message.error(res.data.msg, 1)
            }
        })
    }

    handleEdit = () => {
        console.log('点击修改按钮')
        this.setState({ editVisible: true })
    }
    // 关闭添加弹窗
    closeAdd = () => {
        this.setState({
            addVisibel: false
        })

    }
    // 关闭修改弹窗
    closeEdit = () => {
        this.setState({ editVisible: false })
    }
    // ok = () => {
    //     this.setState({
    //         addVisibel: false
    //     })
    //     console.log("123" + this.state.memberName)
    //     axios.post('/api/admin/admin/save', {
    //         "memberName": this.state.memberName,
    //         "memberPass": this.state.memberPass
    //     }).then(res => {
    //         console.log(res)
    //         if (res.data.code === 500) {
    //             console.log(res.data.msg)
    //         } else if (res.data.code === 0) {
    //             console.log(res.data.msg)
    //         }


    //     })
    // }
    render() {
        const { id } = this.state.list
        return (
            <div>
                <Button
                    style={{ marginBottom: 20 }}
                    type='primary'
                    onClick={() => this.handleAdd()}>添加新用户</Button>
                {/* <Search
                    placeholder="输入用户编号"
                    allowClear
                    enterButton="Search"
                    size="middle"
                // onSearch={onSearch}
                /> */}
                <Form>
                    <Table columns={this.columns} rowKey="id" dataSource={this.state.list} pagination={{
                        pageSize: this.state.limit,
                        total: this.state.totalCount,
                        current: this.state.current,
                        onChange: (current) => this.getRoles(current)
                    }}>
                        <Column title="编号" dataIndex="id" width="20%"></Column>
                        <Column title="用户名" dataIndex="memberName" width='50%'></Column>
                        <Column title="头像" dataIndex="avater" width='50%'
                            render={(value, record) => {
                                // console.log(value, record)
                                return (
                                    <img src={value} alt="aaaa" width={120} height={60}></img>
                                    // <Image src={value} alt="aaaa" width={120} height={60} />
                                )
                            }} ></Column>
                        <Column title="操作" render={(value) => {
                            return (
                                <Space >
                                    <Button
                                        type="primary"
                                        size='middle'
                                        icon={<EditOutlined />}
                                        onClick={this.handleEdit}>修改</Button>
                                    <Popconfirm
                                        title="此操作将永久删除该用户,确定删除?"
                                        onConfirm={() => this.handleDel(value.id)}
                                        okText="确定"
                                        cancelText="取消"
                                    >
                                        <Button
                                            type="danger"
                                            size='middle'
                                            icon={<DeleteOutlined />}
                                        >删除</Button>
                                    </Popconfirm>
                                </Space>
                            )
                        }} >
                        </Column>
                    </Table>
                    {/* <Pagination

                        pageSize={2}
                        onChange={(page) => this.getRoles(page)}
                        total={this.state.totalCount} style={{ margin: 16 }} /> */}
                    <AddManager addVisibel={this.state.addVisibel} closeAdd={this.closeAdd} ></AddManager>
                    <EditManager
                        editVisible={this.state.editVisible}
                        closeEdit={this.closeEdit}

                    ></EditManager>
                    {/* <Editor editorVisibel={this.state.editorVisibel} closeEdit={this.closeEdit}></Editor> */}
                </Form >
            </div >
        )
    }
}





