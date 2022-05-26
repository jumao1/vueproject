import React, { Component } from 'react'
import { Input, Modal, message, Form } from 'antd';
import axios from 'axios';

export default class AddManager extends Component {
    state = {
        addVisibel: true,
        memberName: '',
        memberPass: ''
    }
    save = (e) => {
        // this.setState({ addVisibel: false })
        // this.setState({
        //     addVisibel: false
        // })
        // console.log(this.state.memberName)
        console.log("e", e)
        axios.post('/api/admin/admin/save', {
            "memberName": this.state.memberName,
            "memberPass": this.state.memberPass
        }).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                this.setState({ memberName: this.props.memberName })
                message.success('添加成功', 1, () => this.props.closeAdd)
            } else {
                message.error(res.data.msg)
            }


        })
    }
    onChange = (e) => {
        this.setState({ memberName: e.target.value })
    }
    render() {
        return (
            <div>
                <Modal width="520px"
                    visible={this.props.addVisibel}
                    title="添加用户"
                    destroyOnClose={true}
                    onCancel={this.props.closeAdd}
                    // closable={false}
                    okText={"确认"}
                    cancelText={"取消"}
                    // onOk={() => { this.save }}
                    // onOk={() => {
                    //     // this.save.setState({ addVisibel: false })
                    //     // console.log('guan ')
                    //     // this.setState({ addVisibel: false })

                    // }}
                    // onOk={this.save}
                    onOk={() => this.save()}
                >

                    <Form

                    >
                        <Form.Item
                            label="客户名称"
                            name="memberName"

                            // initialValues={this.props.memberName}
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
                    {/* <Input onChange={this.onChange} value={this.val} placeholder="请输入用户名" />
                    <Input.Password placeholder="请输入密码" /> */}
                    {/* <Input onChange={this.onChange} placeholder="请输入密码"></Input> */}


                </Modal>

            </div >
        )
    }
}
