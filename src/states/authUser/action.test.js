import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { asyncSetAuthUser, setAuthUserActionCreator } from './action'

// Mock API and react-redux-loading-bar
vi.mock('../../utils/api', () => ({
  default: {
    login: vi.fn(),
    getOwnProfile: vi.fn()
  },
  putAccessToken: vi.fn(),
  removeAccessToken: vi.fn()
}))

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn()
}))

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.login.mockResolvedValue('fake-token')
    api.getOwnProfile.mockResolvedValue({ id: 'user-1', name: 'John' })
    const dispatch = vi.fn()

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'password' })
    expect(api.getOwnProfile).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator({ id: 'user-1', name: 'John' }))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const fakeError = new Error('Ups, something went wrong')
    api.login.mockRejectedValue(fakeError)
    const dispatch = vi.fn()

    // action
    await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'password' })
    expect(window.alert).toHaveBeenCalledWith(fakeError.message)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
