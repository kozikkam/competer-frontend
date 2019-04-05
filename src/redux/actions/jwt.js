export const CHECK_JWT_BEGIN = 'CHECK_JWT_BEGIN'
export const CHECK_JWT_SUCCESS = 'CHECK_JWT_SUCCESS'
export const CHECK_JWT_FAILURE = 'CHECK_JWT_FAILURE'

export const checkJWT = () => {
  const jwt = sessionStorage.getItem('jwtToken')
  return dispatch => {
    dispatch(checkJWTBegin())
    return fetch(
      `${process.env.REACT_APP_BACKEND_DOMAIN}/check-jwt`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        return dispatch(checkJWTSuccess)
      }
      return dispatch(checkJWTFailure())
    })
    .catch(() => dispatch(checkJWTFailure()))
  }
}

export const checkJWTBegin = () => ({
  type: CHECK_JWT_BEGIN,
})

export const checkJWTSuccess = () => ({
  type: CHECK_JWT_SUCCESS,
  payload: {
    valid: true,
  },
})

export const checkJWTFailure = () => ({
  type: CHECK_JWT_FAILURE,
  payload: {
    valid: false,
  }
})
