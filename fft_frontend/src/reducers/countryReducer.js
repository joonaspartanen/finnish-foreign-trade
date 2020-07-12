import getCountryCodes from '../services/countryService'

const countryCodes = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COUNTRYCODES':
      return action.payload
    default:
      return state
  }
}

export const initializeCountryCodes = () => {
  return async dispatch => {
    const countryCodes = await getCountryCodes()
    dispatch({
      type: 'INIT_COUNTRYCODES',
      payload: countryCodes,
    })
  }
}

export default countryCodes
