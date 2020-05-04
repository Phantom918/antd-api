export default function login(state = { loading: false, loginInfo: {} }, action) {
  switch (action.type) {
    case 'PASSWORD_LOGIN_SUCCESS':
      return Object.assign({}, state, {loginInfo: action.payLoad})
    default:
      return state;
  }
}
