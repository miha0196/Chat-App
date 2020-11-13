import { combineReducers } from "redux"
import { createErrorReducer, createFetchingReducer } from './common';

const createLoginReducer = () => 
  combineReducers({
    isChecking: createFetchingReducer('AUTH_LOGIN'),
    error: createErrorReducer('AUTH_LOGIN')
  })


const createRegisterReducer = () => 
  combineReducers({
    isChecking: createFetchingReducer('AUTH_REGISTER'),
    error: createErrorReducer('AUTH_REGISTER')
  })


function createAuthReducers() {
  const user = (state = null, action) => {
    switch (action.type) {
      case 'AUTH_ON_INIT':
      case 'AUTH_ON_ERROR':
        return null
      case 'AUTH_REGISTER_SUCCESS':
      case 'AUTH_LOGIN_SUCCESS':
      case 'AUTH_ON_SUCCESS':
        return action.user
      default:
        return state
    }
  }

  return combineReducers({
    user,
    isChecking: createFetchingReducer('AUTH_ON'),
    login: createLoginReducer(),
    register: createRegisterReducer()
  })
}

export default createAuthReducers();