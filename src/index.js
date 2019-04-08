import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { PersistGate } from 'redux-persist/integration/react'
import JssProvider from 'react-jss/lib/JssProvider'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import ReactDOM from 'react-dom'
import { create } from 'jss'
import React from 'react'


import { App } from './components/App'
import configureStore from "./redux/stores/rootStore"
import * as serviceWorker from './serviceWorker'

import './index.css'

require('dotenv').config()

const store = configureStore()

const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
jss.options.insertionPoint = 'jss-insertion-point'

ReactDOM.render((
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </JssProvider>
), document.getElementById('root'))

serviceWorker.unregister()
