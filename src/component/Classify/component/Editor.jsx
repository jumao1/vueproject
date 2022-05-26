import React, { Component } from 'react';
import { Input, message, Modal, Form, Button } from 'antd';
import axios from 'axios';
class Editor extends Component {
    state = {
        id: '',
        classify: ''
    }
    update = (value) => {
        console.log(value)
        axios.post('/api/product/classify/update', {

            id: this.props.classify.id,
            classify: value.classify

        }).then(res => {

            // this.setState({ classify: this.props.classify.classify })
            message.success('修改成功', 1, this.props.closeEdit)

        })
    }
    // onChange = (e) => {
    //     console.log(e.target.value)
    //     this.setState({ classify: e.target.value })
    // }
    render() {
        // console.log(this.props.classify[0].classify)
        // console.log(this.props.classify.classify)
        // const List = this.props.classify
        // let newList = List.map((item) => {
        //     return item.classify
        // })
        // console.log(newList)

        // const { id, classify } = this.props.classify
        console.log(this.props.classify)
        return (
            <div>
                <Modal width="520px"
                    visible={this.props.editorVisibel}
                    title="修改分类"
                    // onCancel={this.props.closeEdit}
                    closable={false}
                    // onOk={() => this.update()}
                    destroyOnClose={true}
                    footer={null}
                >
                    {/* <Input
                        type="text"
                        placeholder='请输入分类名'
                        width="250px"
                        // defaultValue={this.props.classify}
                        // defaultValue={newList}
                        defaultValue={this.props.classify}
                        // defaultValue={this.props.classify[0].classify}
                        // onChange={this.onChange.bind(this, 'classify')}
                        onChange={(value) => this.update(value)}
                    ></Input> */}
                    <Form

                        onFinish={(value) => this.update(value)}
                        initialValues={this.props.classify}
                        style={{ width: 300 }}
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item
                            label="分类名"
                            // initialValue={this.props.classify}
                            name="classify"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Editor;
