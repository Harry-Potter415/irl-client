import { selectList } from 'helpers/selectors'

export const selectMessages = state => selectList(state.adminMessages, 'messages')
