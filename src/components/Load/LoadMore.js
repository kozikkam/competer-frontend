import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

export class LoadMore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      visibleData: null,
      isLoading: false,
      visibleTotal: 0,
      finished: false,
    }
  }

  async componentDidMount() {
    await this.loadData()
    await this.loadMore()
  }

  async loadData() {
    this.setState({ isLoading: true })

    try {
      const jwt = sessionStorage.getItem(process.env.REACT_APP_JWT_STORE_KEY)
      const response = await fetch(
        `${this.props.href}?page=${this.state.page}`, {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        }
      )
      const data = await response.json()
      this.setState({ data, isLoading: false })
    } catch (err) {
      this.setState({ error: 'Something went wrong', isLoading: false })
    }
  }

  loadMore() {
    let finished = false

    const visibleData = Object.entries(this.state.data).reduce((acc, [key, val]) => {
      if (Array.isArray(val)) {
        const newVal = val.filter((el, i) => i < this.state.visibleTotal + this.props.visiblePerClick)

        if (JSON.stringify(newVal) === JSON.stringify(val)) {
          finished = true
        }

        return { ...acc, [key]: newVal}
      }
      return { ...acc, [key]: val}
    }, {})

    this.setState({ visibleData, visibleTotal: this.state.visibleTotal + this.props.visiblePerClick, finished });
  }

  render() {
    const { visibleData, isLoading, finished } = this.state

    if (!isLoading) {
      return (
        <React.Fragment>
          {this.props.mapper(visibleData)}
          {!finished ? (
            <Button variant="contained" style={{ backgroundColor: '#c64031', color: 'white' }} onClick={this.loadMore.bind(this)}>
            Load More
            </Button>
          ) : null}
        </React.Fragment>
      )
    }
    return (
      <CircularProgress color='secondary' />
    )
  }
}

LoadMore.propTypes = {
  href: PropTypes.string,
  mapper: PropTypes.func,
  visiblePerClick: PropTypes.number,
}