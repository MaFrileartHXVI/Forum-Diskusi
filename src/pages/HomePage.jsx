import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralizeVoteThread } from '../states/threads/action'
import ThreadList from '../components/ThreadList'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

function HomePage () {
  const threads = useSelector((states) => states.threads) || []
  const users = useSelector((states) => states.users) || []
  const authUser = useSelector((states) => states.authUser)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
  }, [dispatch])

  const onUpVote = (id) => dispatch(asyncUpVoteThread(id))
  const onDownVote = (id) => dispatch(asyncDownVoteThread(id))
  const onNeutralize = (id) => dispatch(asyncNeutralizeVoteThread(id))

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {}
  }))

  const categories = [...new Set(threadList.map(t => t.category))]
  const filteredThreads = filter ? threadList.filter(t => t.category === filter) : threadList

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Diskusi Tersedia</h2>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          <button onClick={() => setFilter('')} className={!filter ? 'btn-primary' : 'glass'} style={{ padding: '0.5rem 1rem' }}>Semua</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'btn-primary' : 'glass'} style={{ padding: '0.5rem 1rem' }}>#{cat}</button>
          ))}
        </div>
      </div>
      <ThreadList threads={filteredThreads} authUser={authUser ? authUser.id : null} upVote={onUpVote} downVote={onDownVote} neutralizeVote={onNeutralize} />
      {authUser && (
        <Link to="/new" className="btn-primary" style={{ position: 'fixed', bottom: '2rem', right: '2rem', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', boxShadow: '0 10px 25px rgba(99,102,241,0.5)' }}>
          <FiPlus />
        </Link>
      )}
    </section>
  )
}
export default HomePage
