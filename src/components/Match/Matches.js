import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import { Match } from './Match'
import { Info } from './../Info'
import { SimpleAreaChart } from './../Chart'
import { LoadMore } from './../Load'

import './Matches.css'

export class Matches extends Component {
  constructor(props) {
    super(props)
    this.number = props.match.params.number

    this.state = {
      data: null,
      isLoading: true,
    }
  }

  async componentDidMount() {
    try {
      const jwt = sessionStorage.getItem(process.env.REACT_APP_JWT_STORE_KEY)
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/user/${this.number}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        }
      )
      const data = await response.json()
      this.setState({ data, isLoading: false })
    } catch (err) {
      this.setState({ error: 'Something went wrong' })
    }
  }

  getEloHistory(data) {
    return data.participants.map(participant => ({
      name: participant.match.date.split('T')[0],
      elo: participant.newElo,
    })).reverse()
  }

  loadFunction(data, page) {
    if (!data) {
      return (<React.Fragment></React.Fragment>)
    }
    return data.participants.map((participant, i) => {
      return <div className='fade-in'><Match key={i} data={participant} /></div>
    })
  }

  render() {
    const { data, isLoading } = this.state
    if (this.state.error) {
      return (<p>{this.state.error}</p>)
    }

    if (isLoading) {
      return (
        <CircularProgress color='secondary' />
      )
    }

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Info attributes={{ firstName: data.firstName, lastName: data.lastName, elo: data.elo }}/>
          </Grid>
          <Grid item xs={12} style={{ height: 400, marginBottom: 40 }}>
            <SimpleAreaChart data={this.getEloHistory(data)} valueName={'elo'}/>
          </Grid>
        </Grid>
        <LoadMore mapper={this.loadFunction} href={`${process.env.REACT_APP_BACKEND_DOMAIN}/user/${this.number}`} visiblePerClick={10}/>
      </React.Fragment>
    )
  }
}
