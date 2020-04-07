import dataService from '../services/dataService'

const tradeDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_TRADEDATA':
      return {
        ...state,
        exportsData: action.exportsData,
        importsData: action.importsData,
      }
    default:
      return state
  }
}

export const initializeTradeData = (year) => {
  return async (dispatch) => {
    const exportsData = await dataService.getExports(year)
    const importsData = await dataService.getImports(year)
    dispatch({
      type: 'INIT_TRADEDATA',
      exportsData: exportsData,
      importsData: importsData,
    })
  }
}

export default tradeDataReducer
