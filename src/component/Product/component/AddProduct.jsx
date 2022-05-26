import React, { Component } from 'react'
import { Modal, Input, Form, Select, InputNumber, message, Button } from 'antd'
import axios from 'axios';
export default class AddProduct extends Component {
    state = {
        classify: [],
        dataSource: [],
        cid: ''
    }
    componentDidMount() {
        this.getClassifyList()
    }
    getClassifyList = () => {
        axios.get("/api/product/classify/getAllClassify").then(res => {
            console.log(res)
            this.setState({ classify: res.data.data })
        })
    }
    getValue = (e) => {
        console.log(e.target.value)
        this.setState({ classify: e.target.value })
    }
    getCid = (value) => {
        console.log(value)
        this.setState({ cid: value })
    }
    save = (value) => {
        console.log(value)
        axios.post('/api/product/product/save', {
            productName: value.productName,
            unit: value.unit,
            unitPrice: value.unitPrice,
            nums: value.nums,
            // totalPrice: value.totalPrice,
            cid: value.cid
        }).then(res => {
            if (res.data.code === 0) {
                message.success('添加成功', 1, this.props.closeAdd());
                this.props.getProduct()
            } else {
                message.error('添加失败', 1, () => {
                    this.props.getProduct()
                })
            }
        })
    }
    render() {
        // onChange = (value) => {
        //     console.log('changed', value)
        // }
        // function onChange(value) {
        //     console.log('changed', value);
        // }
        // const onFinish = (values) => {
        //     console.log('Success:', values);
        // };
        return (
            <div>
                <Modal
                    title="添加产品"
                    closable={false}
                    okText={"添加"}
                    cancelText={"取消"}
                    onCancel={this.props.closeAdd}
                    visible={this.props.addVisibel}
                    footer={null}
                // onOk={(value) => this.save(value)}
                >


                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        // initialValues={{ remember: true }}
                        onFinish={(value) => this.save(value)}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"

                    >
                        <Form.Item
                            label="产品名"
                            name="productName"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="分类名"
                            name="cid"

                        >
                            <Select style={{ width: 150 }} defaultValue={"请选择分类"}>
                                {
                                    this.state.classify.map((item) =>
                                        <Option key={item.id} value={item.id}>{item.classify}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="单位"
                            name="unit"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="单价"
                            name="unitPrice"

                        >
                            <InputNumber min={0.00} defaultValue={0.00} />
                        </Form.Item>
                        {/* <Form.Item
                            label="总价"
                            name="totalPrice"

                        >
                            <InputNumber min={0.00} defaultValue={1.00} />
                        </Form.Item> */}
                        <Form.Item
                            label="库存量"
                            name="nums"

                        >
                            <InputNumber min={0.00} defaultValue={1.00} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>确定</Button>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        )
    }
}
