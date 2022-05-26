import {React,Component} from "react";
import { Route,BrowserRouter} from "react-router-dom";
import "antd/dist/antd.css"
import Login from "./views/Login/Login"
import Home from "./views/Home/Home"

export default class App extends Component{
    render(){

        return(
            <BrowserRouter>
                <Route component={Login} path={"/"} exact ></Route>
                <Route component={Home} path="/home"  ></Route>
            </BrowserRouter>
        )
    }
}