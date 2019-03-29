import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import configureStore from "./redux/stores/rootStore"
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'

import './index.css'

require('dotenv').config()

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'jss-insertion-point'

ReactDOM.render((
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </JssProvider>
), document.getElementById('root'))

serviceWorker.unregister()
