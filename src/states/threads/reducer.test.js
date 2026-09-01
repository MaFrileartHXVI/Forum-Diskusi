import { describe, it, expect } from 'vitest'
import threadsReducer from './reducer'
import { ActionType } from './action'

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = []
    const action = { type: 'UNKNOWN' }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(initialState)
  })

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = []
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread 1' },
          { id: 'thread-2', title: 'Thread 2' }
        ]
      }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual(action.payload.threads)
  })

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1' }
    ]
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: { id: 'thread-2', title: 'Thread 2' }
      }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual([action.payload.thread, ...initialState])
  })

  it('should return the threads with updated upVotesBy when given by UP_VOTE_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', upVotesBy: [], downVotesBy: [] }
    ]
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1' }
    }
    const nextState = threadsReducer(initialState, action)
    expect(nextState).toEqual([{ ...initialState[0], upVotesBy: ['user-1'] }])
  })
})
