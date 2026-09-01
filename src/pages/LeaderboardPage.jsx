import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPopulateLeaderboards } from '../states/leaderboards/action'
import LeaderboardItem from '../components/LeaderboardItem'

function LeaderboardPage () {
  const leaderboards = useSelector((states) => states.leaderboards) || []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  }, [dispatch])

  return (
    <section>
      <h2 style={{ marginBottom: '2rem' }}>Klasemen Pengguna Aktif</h2>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <span>Pengguna</span>
          <span>Skor</span>
        </div>
        {leaderboards.map(({ user, score }) => (
          <LeaderboardItem key={user.id} user={user} score={score} />
        ))}
      </div>
    </section>
  )
}
export default LeaderboardPage
