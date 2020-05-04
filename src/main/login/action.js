import axios from "axios";
// 序列化数据
import qs from "qs";

// 登录函数
export const passwordLogin = data => {
    return dispatch => {
        dispatch({ type: "PASSWORD_LOGIN_START" });
        // 请求后台登录接口
        axios
            .post("/server/auth/login", qs.stringify(data))
            .then(function(res) {
                console.info("服务器返回: %o", res.data);
                dispatch({
                    // 实际项目中最好将所有的 type 集中管理，可以避免重名等问题;
                    type: "PASSWORD_LOGIN_SUCCESS",
                    payLoad: res.data.token
                });
            })
            .catch(function(error) {
                dispatch({
                    type: "PASSWORD_LOGIN_ERROR"
                });
            });
    };
};
