export const ACTIONS = {
  RESET_LAYOUT: 'RESET_LAYOUT',
  SET_SIDEBAR_DISABLED: 'SET_SIDEBAR_DISABLED',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
}

export const resetLayout = () => dispatch => {
  dispatch({ type: ACTIONS.RESET_LAYOUT })
}

export const setSidebarDisabled = () => dispatch => {
  dispatch({ type: ACTIONS.SET_SIDEBAR_DISABLED })
}

export const toggleSidebar = isOpen => dispatch => {
  dispatch({ type: ACTIONS.TOGGLE_SIDEBAR, isOpen })
}
