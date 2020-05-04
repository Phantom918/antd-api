// 引入"react-redux"两个API中的高阶函数 connect（另一个是 Provider），用来将state绑定到Connect组件的参数上
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { passwordLogin } from "./action";
import { Divider, Row, Col} from "antd";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ passwordLogin }, dispatch);
}

class Login extends Component {
    state = { username: "user", password: 123456 };

    login = () => {
        const data = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.passwordLogin(data);
    };

    render() {
        // 等redux初始化已完成，在组件中绑定state就可以使用this.props访问reducer中的状态了
        console.log(this.props.loading);
        console.log(this.props.loginInfo);
        return (
            <>
                <Divider orientation="center" style={{ color: "#fff", fontWeight: "bolder", fontSize: "24px" }}>
                    Welcome
                </Divider>
                <Row justify="space-around" align="middle">
                    <Col xs={22} sm={20} md={16} lg={12} xl={10}>
                        <div>账号:{this.state.username}</div>
                        <div>密码:{this.state.password}</div>
                        <div onClick={this.login}>点击登录</div>
                        <div>登录信息1:{this.state.loginInfo}</div>
                        {/* <div>登录信息2:{this.props.loginInfo}</div> */}
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect((state) => state.login, mapDispatchToProps)(Login);
