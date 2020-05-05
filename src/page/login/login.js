// 引入"react-redux"两个API中的高阶函数 connect（另一个是 Provider），用来将state绑定到Connect组件的参数上
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { passwordLogin } from "./action";
import { DatePicker, Typography, Divider, Row, Col, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ passwordLogin }, dispatch);
}

class Login extends Component {
    state = { username: "user", password: 123456 };

    doLogin = (values) => {
        console.log("Received values of form: ", values);
        this.props.passwordLogin(values);
    };
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        // 等redux初始化已完成，在组件中绑定state就可以使用this.props访问reducer中的状态了
        console.log(this.props.loading);
        console.log(this.props.loginInfo);
        return (
            <>
                <Divider orientation="center" style={{ color: "#fff", fontWeight: "bolder", fontSize: "24px" }}>
                    Welcome
                </Divider>
                <DatePicker onChange={this.onChange} />
                <Row justify="space-around" align="middle">
                    <Col xs={22} sm={20} md={16} lg={12} xl={10} className="login-form">
                        <Title> 星 辰 变 </Title>
                        <Form name="login_form" className="login-form" onFinish={this.doLogin} initialValues={{ remember: true }}>
                            <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                                <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                                <Input size="large" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="//#endregion">
                                    忘记密码
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登 录
                                </Button>
                                 Or <a href="//#endregion">注 册!</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

                <Row justify="space-around" align="middle">
                    <Col xs={22} sm={20} md={16} lg={12} xl={10}>
                        <div>账号:{this.state.username}</div>
                        <div>密码:{this.state.password}</div>
                        <div>登录信息1:{this.state.loginInfo}</div>
                        {/* <div>登录信息2:{this.props.loginInfo}</div> */}
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect((state) => state.login, mapDispatchToProps)(Login);
