import React, { Component } from 'react'
import { Modal } from 'antd'
export default class EditOrder extends Component {
    render() {
        return (
            <div>
                <Modal title="添加订单"
                    visible={this.props.addVisible}
                    closable={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal></div>
        )
    }
}
