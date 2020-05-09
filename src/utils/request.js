import axios from "axios";
// 序列化数据
import qs from "qs";

// 登录函数
export const getUsersInfo = data => {
    return dispatch => {
        dispatch({ type: "PASSWORD_LOGIN_START" });
        // 请求后台登录接口
        axios.post("/server/auth/login", qs.stringify(data))
            .then(response => {
                // response  包含 data、status、statusText、headers、config
                console.info("服务器返回: %o", response);
                if(response.status === 200) {
                    dispatch({
                        // 实际项目中最好将所有的 type 集中管理，可以避免重名等问题;
                        type: "PASSWORD_LOGIN_SUCCESS",
                        loginInfo: response.data,
                        loginValid: true,
                    });
                    sessionStorage.token = response.data.token;
                    // localStorage.removeItem("token");// 删除
                    // 登录成功跳转到首页
                    data.history.push("/index");
                } else {
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.status);// 403
                    console.log(error.response.data);// {message: "无效Token, 请认证后操作 !", status: 403}
                } else {
                    console.log('Error', error.message);
                }
                dispatch({
                    type: "PASSWORD_LOGIN_ERROR",
                    loginValid: false,
                });
            });
    };
};
