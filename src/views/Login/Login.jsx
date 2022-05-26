import React from "react";
import "./Login.css"
import cookie from "react-cookies";
import axios from "axios";
import { message, Button } from "antd";
import $http from "../../request";
//类组件
export default class Login extends React.Component {

    constructor() {
        super()
    }

    state = {
        userName: "",
        password: "",
        code: "",
        img: "",
    }
    componentDidMount() {
        this.getCaptcha();
    }
    getCaptcha = () => {
        axios({
            method: 'get',
            url: '/api/auth/getCaptchaBase64',
        }).then((response) => {
            this.setState({ img: response.data.url })
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            // TODO
        });
    }

    getValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    login = () => {
        console.log(this.state.code)
        axios.get('/api/auth/checkCaptcha', {
            params: {
                code: this.state.code,
                memberName: this.state.userName,
                memberPass: this.state.password,
            },

        }).then((response) => {
            if (response.data.code === 0) {
                console.log(response.data.token)
                cookie.save("token", response.data.token)

                axios.request({
                    method: 'get',
                    url: '/api/admin/admin/getUserInfo',
                    headers: {
                        'token': cookie.load("token")
                    }
                }).then((response) => {
                    cookie.save("admin", response.data.data)
                    console.log(response)
                    message.success('登陆成功', 1, () => {
                        this.props.history.push({ pathname: '/home' })
                    });
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {
                    // TODO
                });


            }
            if (response.data.code === 500) {
                message.error(response.data.msg, 1);
            }

        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            // TODO
        });


    }
    render() {
        return (
            <div id="login">
                <section>
                    <h2>后台管理系统</h2>
                    <ul>
                        <li><label htmlFor="">用户名</label><input type="text" name="userName" onChange={this.getValue.bind(this)} /></li>
                        <li><label htmlFor="">密码</label><input type="text" name="password" onChange={this.getValue.bind(this)} /></li>
                        <li><label htmlFor="">验证码</label><input type="text" id="code" name="code" onChange={this.getValue.bind(this)} /><img src={this.state.img} alt="" onClick={() => { this.getCaptcha() }} /></li>
                        <Button type="primary" className="btn" onClick={this.login} >登录</Button>
                    </ul>
                </section>
            </div>
        )
    }


}




