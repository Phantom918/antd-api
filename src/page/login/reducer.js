export default function login(state = { loginInfo: {} }, action) {
  switch (action.type) {
    case 'PASSWORD_LOGIN_SUCCESS':
      return Object.assign({}, state, {loginInfo: action.loginInfo})
    default:
      return state;
  }
}
