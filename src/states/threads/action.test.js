import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { asyncAddThread, asyncUpVoteThread, addThreadActionCreator, upVoteThreadActionCreator } from './action'

vi.mock('../../utils/api')
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn()
}))

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const fakeThread = { id: 'thread-1', title: 'New Thread' }
    api.createThread.mockResolvedValue(fakeThread)
    const dispatch = vi.fn()

    // action
    await asyncAddThread({ title: 'New Thread', body: 'body', category: 'cat' })(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.createThread).toHaveBeenCalledWith({ title: 'New Thread', body: 'body', category: 'cat' })
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})

describe('asyncUpVoteThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.upVoteThread.mockResolvedValue({})
    const dispatch = vi.fn()
    const getState = () => ({ authUser: { id: 'user-1' } })

    // action
    await asyncUpVoteThread('thread-1')(dispatch, getState)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'user-1' }))
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1')
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
