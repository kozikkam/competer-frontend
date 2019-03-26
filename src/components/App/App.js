import React, { Component } from 'react'

import { Main } from './../Main'
import { Header } from './../Header'

import './App.css'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}
