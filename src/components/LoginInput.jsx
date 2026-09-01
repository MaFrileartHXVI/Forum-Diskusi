import React, { useState } from 'react'
import PropTypes from 'prop-types'

function LoginInput ({ login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }} onSubmit={(e) => { e.preventDefault(); login({ email, password }) }}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" className="btn-primary">Login</button>
    </form>
  )
}
LoginInput.propTypes = { login: PropTypes.func.isRequired }
export default LoginInput
