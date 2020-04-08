import getCountryCodes from '../services/countryService'

const countryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_COUNTRYCODES':
      return {
        ...state,
        countryCodes: action.countryCodes,
      }
    default:
      return state
  }
}

export const initializeCountryCodes = () => {
  return async (dispatch) => {
    const countryCodes = await getCountryCodes()
    dispatch({
      type: 'INIT_COUNTRYCODES',
      countryCodes: countryCodes,
    })
  }
}

export default countryReducer
