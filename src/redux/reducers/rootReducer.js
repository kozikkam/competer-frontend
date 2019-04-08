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
      }
    case CHECK_JWT_SUCCESS:
      return {
        ...state,
        authenticated: true,
      }
    case CHECK_JWT_FAILURE:
      return {
        ...state,
        authenticated: false,
      }
    default:
      return state
  }
}
