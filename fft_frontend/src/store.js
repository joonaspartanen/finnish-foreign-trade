import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import countryReducer from './reducers/countryReducer'
import tradeDataReducer from './reducers/tradeDataReducer'

const combinedReducer = combineReducers({
  tradeData: tradeDataReducer,
  countryData: countryReducer,
})

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
