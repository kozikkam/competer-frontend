import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import { Team } from './Team'

import './Match.css'

export class Match extends Component {
  getMatchInfo(data) {
    return {
      previousElo: data.previousElo,
      newElo: data.newElo,
      eloChange: data.eloChange,
      date: data.match.date,
    }
  }

  getWinners(data) {
    return data.match.participants.filter(participant => participant.winner)
  }

  getLosers(data) {
    return data.match.participants.filter(participant => !participant.winner)
  }

  render() {
    const { data } = this.props
    const formattedDate = (data.match.date.split('T'))[0]

    return (
      <div className="single-match">
        <div className="teams">
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <Team players={this.getWinners(data)} />
            </Grid>
            <Grid item xs={2} className="elo-change">
              <span style={{ fontSize: "0.25em", fontWeight: "bold" }}>{formattedDate}</span>
              <span style={{ color: data.winner ? 'green' : 'red' }}>{ data.eloChange > 0 ? `+${data.eloChange}`: data.eloChange }</span>
            </Grid>
            <Grid item xs={4}>
              <Team players={this.getLosers(data)} />
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
        
      </div>
    )
  }
}
