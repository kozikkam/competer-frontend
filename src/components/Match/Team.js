import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';

import { Player } from './Player'

import './Team.css'

export class Team extends Component {
  render() {
    const { players } = this.props

    return (
      <Paper className="team-container" elevation={1}>
        {players.map((player, i) => (<Player key={i} player={player} />))}
      </Paper>
    )
  }
}
