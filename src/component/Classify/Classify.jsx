import React, { Component } from 'react';
import { Button, message, Table, Popconfirm, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import { Space } from 'antd';
import Add from './component/Add';
import Editor from './component/Editor';
import axios from 'axios';
import PubSub from "pubsub-js"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const { Column } = Table
const { Search } = Input;


class Classify extends Component {
  state = {
    addVisibel: false,
    editorVisibel: false,
    page: '1',
    limit: "2",
    totalCount: '',
    classify: {},
    id: '',
    list: [
      { id: "", classifyName: "" }
    ]
  }
  componentDidMount() {
    this.getClassifyList()
  }
  // 向兄弟组件传值
  pubsub() {
    console.log('Classify组件发送数据')
    //PubSub.publish向外定义方法名 第一个参数是方法名，第二个参数是传递的数据
    PubSub.publish("methodName", this.state.classify);
    console.log(this.state.classify)
  }
  // 获取分类列表
  getClassifyList = (current) => {
    console.log(this.getClassifyList)
    axios.post('/api/product/classify/list', {
      params: {
        page: this.state.page,
        limit: this.state.limit,
        classify: this.state.classify,
        id: this.state.id
      }

    }).then(res => {
      console.log(res)
      console.log(res.data.page.list)
      this.setState({ list: res.data.page.list })
      this.setState({ totalCount: res.data.page.totalCount })
    })
  }
  // 添加类别
  addClassify = () => {
    console.log(this.state.addVisibel)
    this.setState({
      addVisibel: true
    })
    console.log(this.state.addVisibel)
  }
  // 根据分类id查询
  selectByClassifyId = (id) => {
    console.log('hhhh')
    console.log(id)
    // const { id } = this.state.list
    axios.post(`/api/product/classify/info/${id}`).then(res => {
      console.log(res)

      if (res.data.code === 0) {
        message.success('查询成功', 1, () => this.getClassifyList())

      } else {
        message.error(res.data.msg)
      }
    })
  }
  // 删除类别
  delClassify = (id) => {
    // console.log(id)
    axios.post('/api/product/classify/delete', [id]).then(res => {
      console.log(res)
      if (res.data.code === 0) {
        console.log(res.data.message)
        message.success('删除成功', 1, () => this.getClassifyList())
      } else {
        message.error(res.data.msg, 1)
      }
    })
  }
  closeAdd = () => {
    this.setState({
      addVisibel: false
    })
  }
  editClassify = (value) => {
    this.setState({
      editorVisibel: true,
      classify: value
    })
  }
  closeEdit = () => {
    this.getClassifyList()
    this.setState({
      editorVisibel: false
    })
  }


  render() {
    // const { id } = this.state.list
    return (
      <div>

        <Button
          onClick={this.addClassify}
          type="primary"
          style={{ marginBottom: 20 }}
          size='middle'>
          添加新分类
        </Button>
        {/* <Button onClick={() => this.selectByClassifyId} type="primary" size='middle'>
          添加
        </Button> */}
        <Search
          // enterButton
          // addonBefore
          // loading={true}
          onPressEnter={(value) => this.selectByClassifyId(value)}
          placeholder="输入分类编号"
          style={{
            width: 400,
            marginLeft: 400
          }}
          onSearch={(value) => this.selectByClassifyId(value)}
        />
        <Form>
          <Table columns={this.columns} rowKey="id" dataSource={this.state.list}
            pagination={{
              pageSize: this.state.limit,
              current: this.state.current,
              total: this.state.totalCount,
              onChange: (current) => this.getClassifyList(current)
            }}
          >
            <Column title="#" dataIndex="id" width="20%"></Column>
            <Column title="分类名" dataIndex="classify" width='50%'></Column>

            <Column title="操作" render={(value) => {
              return (
                <Space >
                  <Button size='middle'
                    type="primary"
                    onClick={() => this.editClassify(value)}
                    icon={<EditOutlined />}
                  >修改</Button>

                  <Popconfirm
                    title="此操作将永久删除该分类,是否继续？"
                    onConfirm={() => this.delClassify(value.id)}
                    // onCancel={cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="danger" size='middle'
                      icon={<DeleteOutlined />}
                    >删除</Button>
                  </Popconfirm>

                </Space>
              )
            }} ></Column>
          </Table>
          <Add
            addVisibel={this.state.addVisibel}
            closeAdd={this.closeAdd}
            getClassifyList={() => this.getClassifyList}
          ></Add>
          <Editor
            editorVisibel={this.state.editorVisibel}
            closeEdit={this.closeEdit}
            // classify={this.selectByClassifyId}
            // classify={this.state.list}
            classify={this.state.classify}
            getClassifyList={() => this.getClassifyList}

          ></Editor>
        </Form>
      </div>
    );
  }
}

export default Classify;