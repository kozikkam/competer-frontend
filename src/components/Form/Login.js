import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Snackbar } from './../Snackbar'

import './Login.css'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      error: null,
    }
  }

  handleInputChange(event) {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  async onSubmit(event) {
    event.preventDefault()
    let response

    try {
      response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/login`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    } catch (err) {
      this.setState({
        error: 'Error logging in. Please try again.',
      })
    }

    let body
    try {
      body = await response.json()
    } catch (err) {
      this.setState({
        error: 'Error logging in. Please try again.',
      })
    }

    if (response.status === 200) {
      sessionStorage.setItem('jwtToken', body.token)
    } else {
      this.setState({
        error: 'Error logging in. Please try again.',
      })
    }
  }

  onClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ error: null })
  }

  Error(error) {
    if (error) {
      return <Snackbar
        variant="error"
        message={this.state.error}
        onClose={this.onClose.bind(this)}
      />
    }
    return <br />
  }

  render() {
    return (
      <div className="main">
        <Paper className="paper">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.onSubmit.bind(this)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleInputChange.bind(this)} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange.bind(this)} />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="default" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
              color="default"
            >
              Sign in
            </Button>
            {this.Error(this.state.error)}
          </form>
        </Paper>
      </div>
    )
  }
}
