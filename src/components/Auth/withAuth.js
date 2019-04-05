import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { checkJWT } from './../../redux/actions/jwt'

export function withAuth(ComponentToProtect) {
  class Auth extends Component {
    componentDidMount() {
      this.props.dispatch(checkJWT())
    }

    render() {
      const { loading, valid } = this.props
      if (loading) {
        return null
      }
      if (!valid) {
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
      ...state
    }
  };

  return connect(mapStateToProps)(Auth)
}
