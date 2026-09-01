import React, { useState } from 'react'
import PropTypes from 'prop-types'

function RegisterInput ({ register }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }} onSubmit={(e) => { e.preventDefault(); register({ name, email, password }) }}>
      <h2>Register</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" className="btn-primary">Register</button>
    </form>
  )
}
RegisterInput.propTypes = { register: PropTypes.func.isRequired }
export default RegisterInput
