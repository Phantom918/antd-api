// 引入 combineReducers 用来整合所有的reducer
import { combineReducers } from "redux";
// 引入 刚刚创建的 login reducer
import login from "./main/login/reducer";

let Reducers = combineReducers({ login });

export default Reducers;
