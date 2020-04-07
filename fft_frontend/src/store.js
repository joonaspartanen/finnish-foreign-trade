import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import tradeDataReducer from './reducers/tradeDataReducer'

const store = createStore(tradeDataReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
