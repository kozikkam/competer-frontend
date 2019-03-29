import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { withAuth } from './../Auth'
import { CustomTable } from './../CustomTable'
import { Matches } from './../Match'
import { Login } from './../Form'

export class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <main>
      <Switch>
        <Route exact path='/' component={withAuth(CustomTable)}/>
        <Route path='/user/:number' component={withAuth(Matches)}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </main>
    )
  }
}
