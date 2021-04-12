import { ACTIONS } from 'actions/layout'

const initialState = {
  isSidebarDisabled: false,
  isSidebarOpen: true,
}

const layout = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_SIDEBAR_DISABLED:
      return {
        ...state,
        isSidebarDisabled: true,
        isSidebarOpen: false,
      }
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.isOpen,
      }
    case ACTIONS.RESET_LAYOUT:
      return {
        ...state,
        isSidebarDisabled: false,
      }
    default:
      return state
  }
}

export default layout
