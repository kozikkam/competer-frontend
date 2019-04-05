import {
  CHECK_JWT_BEGIN,
  CHECK_JWT_SUCCESS,
  CHECK_JWT_FAILURE,
} from './../actions/jwt'

export default (state, action) => {
  switch (action.type) {
    case CHECK_JWT_BEGIN:
      return {
        ...state,
        loading: true,
        valid: false,
      }
    case CHECK_JWT_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
      }
    case CHECK_JWT_FAILURE:
      return {
        ...state,
        loading: false,
        valid: false,
      }
    default:
      return state
  }
}
