import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './../reducers/rootReducer'
import thunk from "redux-thunk"

const persistConfig = {
  key: process.env.REACT_APP_STORE_PASS,
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(persistedReducer, { authenticated: null }, applyMiddleware(thunk))
  const persistor = persistStore(store)
  return { store, persistor }
}
