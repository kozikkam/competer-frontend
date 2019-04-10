import React, { PureComponent } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

export class SimpleAreaChart extends PureComponent {
  render() {
  	return (
      <ResponsiveContainer width='100%'>
        <AreaChart data={this.props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis type='number' domain={['dataMin - 100', 'dataMax + 100']}/>
          <Tooltip/>
          <Area type='monotone' dataKey={this.props.valueName || 'value'} stroke='gray' fill='gray' />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}
