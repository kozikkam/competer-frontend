import decode from 'jwt-decode'

export const CHECK_JWT_SUCCESS = 'CHECK_JWT_SUCCESS'
export const CHECK_JWT_FAILURE = 'CHECK_JWT_FAILURE'

export const checkToken = (token) => {
  try {
    const decoded = decode(token)

    if (decoded.exp * 1000 > Date.now()) {
      return checkJWTSuccess()
    }
    else {
      return checkJWTFailure()
    }
  }
  catch (err) {
    return checkJWTFailure()
  }
}

export const checkJWTSuccess = () => ({
  type: CHECK_JWT_SUCCESS,
})

export const checkJWTFailure = () => ({
  type: CHECK_JWT_FAILURE,
})
