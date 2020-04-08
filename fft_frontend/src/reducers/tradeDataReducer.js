import dataService from '../services/dataService'

const tradeDataReducer = (state = { flow: 'exports' }, action) => {
  switch (action.type) {
    case 'INIT_TRADEDATA':
      return {
        ...state,
        exportsData: action.exportsData,
        importsData: action.importsData,
        tradeBalance: action.tradeBalance,
        sitc2Data: action.sitc2Data,
      }
    case 'SET_FLOW':
      return {
        ...state,
        flow: action.flow,
      }
    default:
      return state
  }
}

export const initializeTradeData = (year) => {
  return async (dispatch) => {
    const exportsData = await dataService.getExports(year)
    const importsData = await dataService.getImports(year)
    const tradeBalance = await dataService.getTradeBalance()
    const sitc2Data = await dataService.getSitc2Data(year, 'total')
    dispatch({
      type: 'INIT_TRADEDATA',
      exportsData: exportsData,
      importsData: importsData,
      tradeBalance: tradeBalance,
      sitc2Data: sitc2Data,
    })
  }
}

export const setFlowDirection = (flow) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_FLOW',
      flow: flow,
    })
  }
}

export default tradeDataReducer
