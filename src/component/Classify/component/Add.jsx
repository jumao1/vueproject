import { Input, message, Modal } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';

class Add extends Component {
    state = {
        classify: ''
    }
    save = (e) => {
        console.log("e", e)
        axios.post('/api/product/classify/save', {
            classify: this.state.classify
        }).then(res => {
            if (res.data.code === 0) {
                console.log(res)
                console.log(res.data.code)
                this.setState({ classify: this.props.classify })
                message.success('添加成功', 1,
                    () => this.props.getClassifyList,
                    () => this.props.closeAdd
                )
            } else {
                console.log(res.data.code)
                message.error(res.data.msg, 1)
            }
        })
    }
    onChange = (e) => {
        console.log(333, e)
        this.setState({ classify: e.target.value })
    }
    render() {
        return (
            <div>
                <Modal width="520px"
                    visible={this.props.addVisibel}
                    title="添加分类"
                    okText={'确认'}
                    cancelText={'取消'}
                    onCancel={this.props.closeAdd}
                    destroyOnClose={true}
                    closable={false}
                    onOk={() => this.save()}
                >
                    <Input type="text" placeholder='请输入分类名' width="250px"
                        // onChange={console.log('hhhh')}
                        // onChange={() => this.setState({ classify: this.props.classify })}
                        onChange={this.onChange}
                        value={this.val}
                    />
                </Modal>
            </div>
        );
    }
}

export default Add;