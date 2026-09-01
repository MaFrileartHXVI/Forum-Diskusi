import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { asyncPopulateUsersAndThreads } from './action'
import { receiveUsersActionCreator } from '../users/action'
import { receiveThreadsActionCreator } from '../threads/action'

vi.mock('../../utils/api')
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn()
}))

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const fakeUsers = [{ id: 'user-1', name: 'User 1' }]
    const fakeThreads = [{ id: 'thread-1', title: 'Thread 1' }]
    api.getAllUsers.mockResolvedValue(fakeUsers)
    api.getAllThreads.mockResolvedValue(fakeThreads)
    const dispatch = vi.fn()

    // action
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.getAllUsers).toHaveBeenCalled()
    expect(api.getAllThreads).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers))
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const fakeError = new Error('Ups, something went wrong')
    api.getAllUsers.mockRejectedValue(fakeError)
    const dispatch = vi.fn()

    // action
    await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.getAllUsers).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith(fakeError.message)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
