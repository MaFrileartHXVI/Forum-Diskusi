/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle comment typing correctly
 *   - should call addComment function when submit button is clicked
 *   - should clear the textarea after submitting
 */

import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommentInput from './CommentInput'

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle comment typing correctly', async () => {
    // arrange
    render(<CommentInput addComment={() => {}} />)
    const commentInput = screen.getByPlaceholderText('Beri komentar...')

    // action
    await userEvent.type(commentInput, 'Komentar saya')

    // assert
    expect(commentInput).toHaveValue('Komentar saya')
  })

  it('should call addComment function when submit button is clicked', async () => {
    // arrange
    const mockAddComment = vi.fn()
    render(<CommentInput addComment={mockAddComment} />)
    const commentInput = screen.getByPlaceholderText('Beri komentar...')
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' })

    // action
    await userEvent.type(commentInput, 'Komentar saya')
    await userEvent.click(submitButton)

    // assert
    expect(mockAddComment).toHaveBeenCalledWith('Komentar saya')
  })

  it('should clear the textarea after submitting', async () => {
    // arrange
    const mockAddComment = vi.fn()
    render(<CommentInput addComment={mockAddComment} />)
    const commentInput = screen.getByPlaceholderText('Beri komentar...')
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' })

    // action
    await userEvent.type(commentInput, 'Komentar saya')
    await userEvent.click(submitButton)

    // assert
    expect(commentInput).toHaveValue('')
  })
})
