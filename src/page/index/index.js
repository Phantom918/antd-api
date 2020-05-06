import React, { PureComponent } from "react";
import { DatePicker, Typography, Divider, Row, Col, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useStore, connect } from 'react-redux'

// const Index = (props) => {

//   const store = useStore();

//   // 判断是否登录
//   const { login } = store.getState()

//   if (!login.loginValid) {
//     props.history.replace({ pathname: '/login' })
//   }


//   return <div>首页内容</div>;

// }
class Index extends PureComponent {

  constructor() {
    super()

    this.state = { count: 0 }
  }

  componentDidMount() {
    console.log("props:%o", this.props)
    // // 判断是否登录
    // const { login } = this.props;

    // if (!login.loginValid) {
    //   this.props.history.replace({ pathname: '/login' })
    // }
  }

  add = () => {
    this.setState({ count: Math.random() })
    this.setState({ a: 'aaa' })
  }

  render() {
    const { count } = this.state;

    console.log('render');


    return <div onClick={this.add}>{count}</div>;
  }
}

export default connect(state => state)(Index);
