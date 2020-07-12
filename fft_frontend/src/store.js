import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import countryCodes from './reducers/countryReducer'
import tradeData from './reducers/tradeDataReducer'
import darkModeActive from './reducers/colorModeReducer'

const combinedReducer = combineReducers({
  tradeData,
  countryCodes,
  darkModeActive,
})

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
