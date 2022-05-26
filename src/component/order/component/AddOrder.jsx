import React, { Component } from 'react'
import { Modal, Form, Input, Button, Select, InputNumber } from 'antd'
export default class AddOrder extends Component {
    // state = {
    //     addVisible: true
    // }
    render() {
        function onChange(value) {
            console.log('changed', value);
        }
        const onFinish = (values) => {
            console.log('Success:', values);
        };
        return (
            <div>
                <Modal
                    title="添加订单"
                    width={800}

                    // visible={this.props.addVisible}
                    closable={false}

                    visible={this.props.addVisibel}
                    // title="添加用户"
                    destroyOnClose={true}
                    onCancel={this.props.closeAdd}
                // closable={false}
                >
                    <Form
                        name="basic"
                    // labelCol={{
                    //     span: 8,
                    // }}
                    // wrapperCol={{
                    //     span: 16,
                    // }}
                    // initialValues={{
                    //     remember: true,
                    // }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    >
                        <Form.Item
                            label="客户名称"
                            name="coustomer"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="支付方式"
                            name="paytype"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Button>欠款</Button>
                            <Button>支付宝</Button>
                            <Button>微信</Button>
                            <Button>银行卡</Button>
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="remarks"

                        >
                            {/* <Input /> */}
                            <textarea />
                        </Form.Item>
                        <Form.Item
                            label="商家名称"
                            name="username"

                        >
                            <Select style={{ width: 150 }} defaultValue={"请选择"} />
                        </Form.Item>

                        <Form.Item
                            label="商品名称"
                            name="pName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="单位名称"
                            name="pUnitName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="单价"
                            name="pUnitPrice"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <InputNumber min={0.00} defaultValue={0.00} onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                            label="总价"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <InputNumber min={0.00} defaultValue={1.00} onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                            label="库存量"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <InputNumber min={0.00} defaultValue={1.00} onChange={onChange} />
                        </Form.Item>

                    </Form>
                </Modal>
                {/* 添加订单 */}
            </div>
        )
    }
}
