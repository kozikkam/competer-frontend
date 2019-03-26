import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import './Info.css'

export class Info extends Component {
  render() {
    const { attributes } = this.props

    return (
      <Paper className='info'>
        <Grid container spacing={40} >
          {Object.entries(attributes).map(([key, val], i) => (
            <Grid item xs={4} key={i} ><b>{key}</b>: {val}</Grid>
          ))}
        </Grid>
      </Paper>
    )
  }
}
