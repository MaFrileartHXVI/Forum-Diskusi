import { describe, it, expect } from 'vitest'
import authUserReducer from './reducer'
import { ActionType } from './action'

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null
    const action = { type: 'UNKNOWN' }
    const nextState = authUserReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    const initialState = null
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: { id: 'user-123', name: 'John Doe', email: 'john@example.com' }
      }
    }
    const nextState = authUserReducer(initialState, action)
    expect(nextState).toEqual(action.payload.authUser)
  })

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-123', name: 'John Doe' }
    const action = { type: ActionType.UNSET_AUTH_USER }
    const nextState = authUserReducer(initialState, action)
    expect(nextState).toBeNull()
  })
})
