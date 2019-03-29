import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Match } from './Match'
import { Info } from './../Info'

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
    const jwt = sessionStorage.getItem('jwtToken')
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_DOMAIN}/user/${this.number}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      }
    )
    const data = await response.json()
    this.setState({ data, isLoading: false })
  }

  render() {
    const { data, isLoading } = this.state
    if (isLoading) {
      return (
        <CircularProgress color="secondary" />
      )
    }

    return (
      <div className="matches">
        <Info attributes={{firstName: data.firstName, lastName: data.lastName, elo: data.elo}}/>
        {data.participants.map((participant, i) => {
          return <Match key={i} data={participant} />
        })}
      </div>
    )
  }
}
