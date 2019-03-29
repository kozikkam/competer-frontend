import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export function withAuth(ComponentToProtect) {
  return class Auth extends Component {
    constructor() {
      super()

      this.state = {
        loading: true,
        redirect: false,
      }
    }

    async componentDidMount() {
      const jwt = sessionStorage.getItem('jwtToken')
      console.log(jwt)
      let response
      try {
        response = await fetch(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/check-jwt`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${jwt}`,
            },
          }
        )
      } catch (err) {
        this.setState({ loading: false, redirect: true })
      }

      if (response.status === 200) {
        this.setState({ loading: false })
      } else {
        this.setState({ loading: false, redirect: true })
      }
    }


    render() {
      const { loading, redirect } = this.state
      if (loading) {
        return null
      }
      if (redirect) {
        return <Redirect to="/login" />
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      )
    }
  }
}
