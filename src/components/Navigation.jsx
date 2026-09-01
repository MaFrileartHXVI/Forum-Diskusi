import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FiLogOut, FiHome, FiTrendingUp } from 'react-icons/fi'

function Navigation ({ authUser, signOut }) {
  return (
    <nav className="glass p-4 mb-8 flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', marginBottom: '2rem' }}>
      <h2 style={{ margin: 0 }}><Link to="/">Forum Apps</Link></h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/"><FiHome /> Home</Link>
        <Link to="/leaderboards"><FiTrendingUp /> Leaderboards</Link>
        {authUser
          ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src={authUser.avatar} alt={authUser.id} title={authUser.name} style={{ width: '32px', borderRadius: '50%' }} />
            <button onClick={signOut} className="btn-primary" style={{ padding: '0.5rem 1rem' }}><FiLogOut /> Logout</button>
          </div>
            )
          : (
          <Link to="/login" className="btn-primary">Login</Link>
            )}
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  authUser: PropTypes.object,
  signOut: PropTypes.func
}

export default Navigation
