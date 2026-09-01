import LoginInput from './LoginInput'

const meta = {
  title: 'Components/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    login: { action: 'login' }
  }
}

export default meta

export const Default = {
  args: {
    login: (args) => console.log('Login called with:', args)
  }
}

export const WithPrefilledData = {
  args: {
    login: (args) => console.log('Login called with:', args)
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement
    const emailInput = canvas.querySelector('input[type="email"]')
    const passwordInput = canvas.querySelector('input[type="password"]')
    if (emailInput) emailInput.value = 'john@example.com'
    if (passwordInput) passwordInput.value = 'password123'
  }
}
