import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'

import './Header.css'

export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Toolbar className="header">
        <a href="/">Foosball ranking</a>
      </Toolbar>
    )
  }
}
