import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import configureStore from "./redux/stores/rootStore"

import './index.css'

require('dotenv').config()

ReactDOM.render((
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

serviceWorker.unregister()
