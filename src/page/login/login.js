// 引入"react-redux"两个API中的高阶函数 connect（另一个是 Provider），用来将state绑定到Connect组件的参数上
import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAction } from "./actions";
import { DatePicker, Typography, Divider, Row, Col, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const mapDispatchToProps = { loginAction };

class Login extends Component { 
    state = {};
    doLogin = (values) => {
        values.history = this.props.history;
        console.log("Received values of form: ", values);
        this.props.loginAction(values);
        // 跳转到首页
        // this.props.history.push("/index");
    };
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        // 等redux初始化已完成，在组件中绑定state就可以使用this.props访问reducer中的状态了
        console.log('渲染....'+ this.props.loginValid);
        return (
            <>
                <Divider orientation="center" style={{ color: "#fff", fontWeight: "bolder", fontSize: "24px" }}>
                    Welcome
                </Divider>
                <Row justify="space-around" align="middle">
                    <Col xs={22} sm={20} md={16} lg={12} xl={10} className="login-form">
                        <Title> YouTube </Title>
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
                        <DatePicker onChange={this.onChange} />
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

export default connect((state) => {
    console.log("state=%o", state);
    return state.login
}, mapDispatchToProps)(Login);
