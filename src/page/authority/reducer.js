export default function authorityData(state = { formData: {} }, action) {
  switch (action.type) {
    case 'AUTHORITY_DATA_SUCCESS':
      return Object.assign({}, state, { formData: action.data.result })
    default:
      return state;
  }
}
