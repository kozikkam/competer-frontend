import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import { Link as RouterLink } from 'react-router-dom'

import './CustomTable.css'

let id = 0
function createData(userId, firstName, lastName, elo, matchCount, winCount, winPercent) {
  id += 1
  const winPercentage = winPercent || 0
  return { id, userId, firstName, lastName, elo, matchCount, winCount, winPercentage }
}

export class CustomTableComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isLoading: true,
    }
  }

  async componentDidMount() {
    const jwt = sessionStorage.getItem(process.env.REACT_APP_JWT_STORE_KEY)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/user`, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        }
      )
      const data = await response.json()
      const transformedData = data.map(row => createData(...Object.values(row)))
      this.setState({ data: transformedData, isLoading: false })
    } catch (err) {
      this.setState({ error: 'Something went wrong' })
    }
  }

  generateLink(userId) {
    return props => <RouterLink to={`/user/${userId}`} {...props} />
  }

  render() {
    const { data, isLoading } = this.state
    if (this.state.error) {
      return (<p>{this.state.error}</p>)
    }

    if (isLoading) {
      return (
        <Paper className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><CircularProgress color="secondary" /></TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      )
    }

    return (
      <Paper className="table">
        <Table>
          <TableHead>
            <TableRow className="table-row">
              <TableCell align="right">Place</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="right">Elo</TableCell>
              <TableCell align="right">Match Count</TableCell>
              <TableCell align="right">Win Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => {
              return (
                <TableRow key={row.id} className="table-row" onClick={() => window.location=`/user/${row.userId}`}>
                  <TableCell scope="row" align="right">{row.id}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell align="right">{row.elo}</TableCell>
                  <TableCell align="right">{row.matchCount}</TableCell>
                  <TableCell align="right">{row.winPercentage}%</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export const CustomTable = connect()(CustomTableComponent)
