import { createStore, applyMiddleware } from 'redux'
import rootReducer from './../reducers/rootReducer'
import thunk from "redux-thunk"

function configureStore(state = {
  loading: false,
  valid: false,
}) {
  return createStore(rootReducer, state, applyMiddleware(thunk))
}

export default configureStore