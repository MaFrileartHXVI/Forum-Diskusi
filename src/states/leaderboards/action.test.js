import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { asyncPopulateLeaderboards, receiveLeaderboardsActionCreator } from './action'

vi.mock('../../utils/api')
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn()
}))

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const fakeLeaderboards = [{ user: { id: 'user-1', name: 'John' }, score: 100 }]
    api.getLeaderboards.mockResolvedValue(fakeLeaderboards)
    const dispatch = vi.fn()

    // action
    await asyncPopulateLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.getLeaderboards).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboards))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const fakeError = new Error('Ups, something went wrong')
    api.getLeaderboards.mockRejectedValue(fakeError)
    const dispatch = vi.fn()

    // action
    await asyncPopulateLeaderboards()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeError.message)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
