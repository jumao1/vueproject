import React, { Component } from 'react'
import { Button, Input, Modal, Alert, Form } from 'antd';
export default class EditManager extends Component {

    render() {
        console.log(this.props.memberName)
        return (
            <div>
                <Modal width="520px"
                    visible={this.props.editVisible}
                    title="更改用户信息"
                    destroyOnClose={true}
                    okText={"确定"}
                    cancelText={'取消'}
                    onCancel={this.props.closeEdit}
                    closable={false}
                    onOk={this.ok}
                >
                    {/* <Alert message="当前修改的管理员id" type="info" /> */}
                    <Alert
                        style={{
                            height: 30,
                            marginBottom: 20
                        }}
                        message="当前修改的用户编号为10"
                        type="info"
                        showIcon />
                    <Form

                    >
                        <Form.Item
                            label="客户名称"
                            initialValue={this.props.memberName}
                            name="memberName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input onChange={this.onChange} value={this.val} />
                        </Form.Item>
                        <Form.Item
                            label="用户密码"
                            initialValue={this.props.memberPass}
                            name="memberPass"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>
                    {/* <Input type="text" placeholder='请输入用户名' width="250px"></Input>
                    <Input type="text" placeholder='请输入密码' width="250px"></Input> */}


                </Modal>
            </div>
        )
    }
}
