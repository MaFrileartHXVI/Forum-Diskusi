/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterInput from './RegisterInput'

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />)
    const nameInput = screen.getByPlaceholderText('Name')

    // action
    await userEvent.type(nameInput, 'John Doe')

    // assert
    expect(nameInput).toHaveValue('John Doe')
  })

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />)
    const emailInput = screen.getByPlaceholderText('Email')

    // action
    await userEvent.type(emailInput, 'john@example.com')

    // assert
    expect(emailInput).toHaveValue('john@example.com')
  })

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />)
    const passwordInput = screen.getByPlaceholderText('Password')

    // action
    await userEvent.type(passwordInput, 'password123')

    // assert
    expect(passwordInput).toHaveValue('password123')
  })

  it('should call register function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn()
    render(<RegisterInput register={mockRegister} />)
    const nameInput = screen.getByPlaceholderText('Name')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const registerButton = screen.getByRole('button', { name: 'Register' })

    // action
    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'john@example.com')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.click(registerButton)

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    })
  })
})
