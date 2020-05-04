import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import Reducers from "./reducers";
// createStore 构造 项目唯一的store, applyMiddleware用来拓展thunk 中间件
import { createStore, applyMiddleware } from "redux";
// 中间件，用来处理异步请求获得的数据
import thunk from "redux-thunk";
// Provider 用于结合react和redux;
import { Provider } from "react-redux";

const store = createStore(Reducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
