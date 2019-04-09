import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { checkToken } from './../../redux/actions/jwt'

export function withAuth(ComponentToProtect) {
  class Auth extends Component {
    componentWillMount() {
      const jwt = sessionStorage.getItem(process.env.REACT_APP_JWT_STORE_KEY)
      this.props.dispatch(checkToken(jwt))
    }

    render() {
      const { authenticated } = this.props
      if (!authenticated) {
        return <Redirect to="/login" />
      }
      return (
        <ComponentToProtect {...this.props} />
      )
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.authenticated,
    }
  };

  return connect(mapStateToProps)(Auth)
}
