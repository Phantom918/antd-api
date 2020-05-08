export default function login(state = { loginInfo: {}, loginValid: false }, action) {
  switch (action.type) {
    case 'PASSWORD_LOGIN_SUCCESS':
      return Object.assign({}, state, { loginInfo: action.loginInfo, loginValid: action.loginValid })
    default:
      return state;
  }
}
