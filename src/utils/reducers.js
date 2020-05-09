// 引入 combineReducers 用来整合所有的reducer
import { combineReducers } from "redux";
// 引入 刚刚创建的 login reducer
import login from "../page/login/reducer";
import authorityData from "../page/authority/reducer";

let Reducers = combineReducers({ login, authorityData });
console.log("调用combineReducers.....");

export default Reducers;
