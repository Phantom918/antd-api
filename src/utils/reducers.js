// 引入 combineReducers 用来整合所有的reducer
import { combineReducers } from "redux";
// 引入 刚刚创建的 login reducer
import login from "../page/login/reducer";

let Reducers = combineReducers({ login });
console.log("调用combineReducers.....");

export default Reducers;
