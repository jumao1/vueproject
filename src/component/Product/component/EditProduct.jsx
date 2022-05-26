import React, { Component } from 'react'
import { Modal, Input, Form, Select, InputNumber, message, Button } from 'antd'
import axios from 'axios'

export default class EditProduct extends Component {
    state = {
        cid: '',
        classifyList: []
    }
    componentDidMount() {
        this.getClassifyList()
    }
    getClassifyList = () => {
        axios.get('/api/product/classify/getAllClassify').then(res => {
            console.log(res)
            this.setState({ classifyList: res.data.data })
        })
    }
    getCid = (value) => {
        console.log(value)
        this.setState({ cid: value })
    }
    updateProduct = (value) => {
        axios.post('/api/product/product/update', {
            "id": this.props.product.id,
            "productName": value.productName,
            "unit": value.unit,
            "unitPrice": value.unitPrice,
            "nums": value.nums,
            "cid": this.state.cid
        }).then(res => {
            console.log(res)
            message.success('修改成功', 1, () => this.props.closeUpdate)
        })
    }
    render() {
        return (
            <div>
                <Modal title="更改产品"
                    closable={false}
                    okText={"添加"}
                    cancelText={"取消"}
                    onCancel={this.props.closeUpdate}
                    visible={this.props.updateVisibel}
                    footer={null}
                >

                    <Form
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        initialValues={this.props.product}
                        onFinish={(value) => this.updateProduct(value)}
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
                            <Select style={{ width: 150 }}
                                defaultValue={"请选择分类"}
                                onChange={(value) => this.getCid(value)}
                            >
                                {
                                    this.state.classifyList.map((item) =>
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
