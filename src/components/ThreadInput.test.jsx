/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when form is submitted
 */

import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThreadInput from './ThreadInput'

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle title typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />)
    const titleInput = screen.getByPlaceholderText('Judul')

    // action
    await userEvent.type(titleInput, 'Thread Baru')

    // assert
    expect(titleInput).toHaveValue('Thread Baru')
  })

  it('should handle category typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />)
    const categoryInput = screen.getByPlaceholderText('Kategori')

    // action
    await userEvent.type(categoryInput, 'react')

    // assert
    expect(categoryInput).toHaveValue('react')
  })

  it('should handle body typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />)
    const bodyInput = screen.getByPlaceholderText('Isi diskusi...')

    // action
    await userEvent.type(bodyInput, 'Isi dari thread baru')

    // assert
    expect(bodyInput).toHaveValue('Isi dari thread baru')
  })

  it('should call addThread function when form is submitted', async () => {
    // arrange
    const mockAddThread = vi.fn()
    render(<ThreadInput addThread={mockAddThread} />)
    const titleInput = screen.getByPlaceholderText('Judul')
    const categoryInput = screen.getByPlaceholderText('Kategori')
    const bodyInput = screen.getByPlaceholderText('Isi diskusi...')
    const submitButton = screen.getByRole('button', { name: 'Buat Diskusi' })

    // action
    await userEvent.type(titleInput, 'Thread Baru')
    await userEvent.type(categoryInput, 'react')
    await userEvent.type(bodyInput, 'Isi dari thread baru')
    await userEvent.click(submitButton)

    // assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Thread Baru',
      category: 'react',
      body: 'Isi dari thread baru'
    })
  })
})
