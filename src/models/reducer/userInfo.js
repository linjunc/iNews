import { INIT_INFO, EDIT_INFO, DELETE_INFO } from '../constant'
export const UserInfo = (state, action) => {
  switch (action.type) {
    case INIT_INFO:
      return action.userInfo
    case EDIT_INFO:
      return action.userInfo
    case DELETE_INFO:
      return null
    default:
      return state
  }
}
