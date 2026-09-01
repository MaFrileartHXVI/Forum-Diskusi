import React from 'react'
import PropTypes from 'prop-types'

function LeaderboardItem ({ user, score }) {
  return (
    <div className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={user.avatar} alt={user.name} style={{ width: '40px', borderRadius: '50%' }} />
        <strong>{user.name}</strong>
      </div>
      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{score}</span>
    </div>
  )
}
LeaderboardItem.propTypes = {
  user: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired
}
export default LeaderboardItem
