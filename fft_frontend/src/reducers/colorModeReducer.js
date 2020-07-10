const colorModeReducer = (state = { darkModeActive: true }, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, darkModeActive: !state.darkModeActive }
    default:
      return state
  }
}

export const changeColorMode = () => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_MODE',
    })
  }
}

export default colorModeReducer
