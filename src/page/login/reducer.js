export default function login(state, action) {
  debugger
  /*注意：如果 state 没有初始值，那就给他初始值！！*/
  if (!state) { state = { loginInfo: {}, loginValid: false } }
  console.info("触发reducer=>%o", state);
  console.info("====", action);
  switch (action.type) {
    case 'PASSWORD_LOGIN_SUCCESS':
      {
        console.log("PASSWORD_LOGIN_SUCCESS.....");
        return Object.assign({}, state, { loginInfo: action.loginInfo, loginValid: action.loginValid })
      }
    default:
      return state;
  }
}
