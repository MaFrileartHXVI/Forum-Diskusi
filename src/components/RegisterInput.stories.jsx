import RegisterInput from './RegisterInput'

const meta = {
  title: 'Components/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    register: { action: 'register' }
  }
}

export default meta

export const Default = {
  args: {
    register: (args) => console.log('Register called with:', args)
  }
}

export const WithPrefilledData = {
  args: {
    register: (args) => console.log('Register called with:', args)
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement
    const nameInput = canvas.querySelector('input[type="text"]')
    const emailInput = canvas.querySelector('input[type="email"]')
    const passwordInput = canvas.querySelector('input[type="password"]')
    if (nameInput) nameInput.value = 'John Doe'
    if (emailInput) emailInput.value = 'john@example.com'
    if (passwordInput) passwordInput.value = 'password123'
  }
}
