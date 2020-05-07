import React, { Component } from "react";
import { connect } from "react-redux";
import Pages from "./router/root";
// import logo from "./logo.svg";
import "./App.css";

class App extends Component {


    toPage = () => {
        // 判断是否登录
        const { loginValid } = this.props;
        console.log("判断是否登录:" + loginValid);

        if (loginValid) {
            console.log("已登陆....");
            this.props.history.replace({ pathname: '/index' })
        } else {
            console.log("没登陆....");
            this.props.history.replace({ pathname: '/login' })
        }
    }

    /**
     * componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。
     * 如需通过网络请求获取数据，此处是实例化请求的好地方。
     * 这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅
     */
    componentDidMount() {
        console.log("componentDidMount.....");
        this.toPage();
    }

    /**
     * componentDidUpdate(prevProps, prevState, snapshot)
     * componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。
     * 当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。
     * 典型用法（不要忘记比较 props）：
     * if (this.props.userID !== prevProps.userID) {
     *     this.fetchData(this.props.userID);
     * }
     * 你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行
     * 处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将 props “镜像”给 state，请考虑
     * 直接使用 props。 欲了解更多有关内容，请参阅为什么 props 复制给 state 会产生 bug。
     * 如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数
     *  “snapshot” 参数传递。否则此参数将为 undefined。
     */
    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate.....");
        console.log(Location.pathname);
        console.log(prevProps.pathname);
        // if (Location.pathname !== prevProps.pathname) {
        //     this.toPage();
        // }
    }


    // 菜单获取
    render() {
        return (
            <div className="App app-bg">
                <div>公共头部</div>
                <h1>公共菜单</h1>
                <Pages />
            </div>
        );
    }
}

export default connect(state => {
    console.log('app=', state);
    return state.login
})(App);
