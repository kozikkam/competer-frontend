import { createStore } from "redux"
import rootReducer from "./../reducers/rootReducer"

function configureStore(state = { jwt: null }) {
  return createStore(rootReducer, state)
}

export default configureStore