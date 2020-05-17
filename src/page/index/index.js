import React, { Component } from "react";

import { useStore, connect, } from 'react-redux'

// const Index = (props) => {

//   const store = useStore();

//   // 判断是否登录
//   const { login } = store.getState()

//   if (!login.loginValid) {
//     props.history.replace({ pathname: '/login' })
//   }

//   return <div>首页内容</div>;

// }
class Index extends Component {

	constructor() {
		super()
		this.state = { count: 0 }
	}

	componentDidMount() {
		console.log("props:%o", this.props)
	}

	add = () => {
		this.setState({ count: Math.random() })
		this.setState({ a: 'aaa' })
	}

	render() {
		const { count } = this.state;

		console.log('index.js => render');


		return <div onClick={this.add}>这里是首页{count}</div>;
	}
}

export default connect(state => state)(Index);
