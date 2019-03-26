import React, { Component } from 'react'

export class Player extends Component {
  render() {
    const { player } = this.props

    return (
      <div className="player">
        <p style={{ fontWeight: 'bold' }}>{player.user.firstName} {player.user.lastName}</p>
        <p style={{ color: player.newElo > player.previousElo ? 'green' : 'red' }}>{player.previousElo} -> {player.newElo}</p>
      </div>
    )
  }
}
