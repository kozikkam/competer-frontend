import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { checkJWT } from './../../redux/actions/jwt'

export function withAuth(ComponentToProtect) {
  class Auth extends Component {
    componentWillMount() {
      this.props.dispatch(checkJWT())
    }

    render() {
      const { authenticated } = this.props
      if (!authenticated) {
        return <Redirect to="/login" />
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.authenticated,
      loading: state.loading,
    }
  };

  return connect(mapStateToProps)(Auth)
}
