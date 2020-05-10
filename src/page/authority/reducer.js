import { PAGE_SIZE } from '@/utils/utils';

export default function authorityData(state = { formData: [], pagination: { current: 1, pageSize: 1 } }, action) {
  switch (action.type) {
    case 'AUTHORITY_DATA_SUCCESS':
      console.info("reducer....");
      return Object.assign({}, state, { formData: action.data.result, pagination: action.data.pagination })
    default:
      return state;
  }
}
