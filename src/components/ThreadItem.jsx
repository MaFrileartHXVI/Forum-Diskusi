import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { postedAt } from '../utils/formatter'
import parse from 'html-react-parser'
import { FiMessageSquare, FiThumbsUp, FiThumbsDown } from 'react-icons/fi'

function ThreadItem ({ id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, user, authUser, upVote, downVote, neutralizeVote }) {
  const isUpvoted = authUser && upVotesBy.includes(authUser)
  const isDownvoted = authUser && downVotesBy.includes(authUser)

  const onUpVoteClick = (e) => { e.preventDefault(); isUpvoted ? neutralizeVote(id) : upVote(id) }
  const onDownVoteClick = (e) => { e.preventDefault(); isDownvoted ? neutralizeVote(id) : downVote(id) }

  return (
    <div className="glass card-hover" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ padding: '0.25rem 0.75rem', border: '1px solid var(--primary)', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--primary)' }}>#{category}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{postedAt(createdAt)}</span>
      </div>
      <h3><Link to={`/threads/${id}`}>{title}</Link></h3>
      <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {parse(body)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={onUpVoteClick} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', color: isUpvoted ? 'var(--primary)' : 'var(--text-secondary)' }}><FiThumbsUp /> {upVotesBy.length}</button>
          <button onClick={onDownVoteClick} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', color: isDownvoted ? 'var(--secondary)' : 'var(--text-secondary)' }}><FiThumbsDown /> {downVotesBy.length}</button>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}><FiMessageSquare /> {totalComments}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <span>Dibuat oleh <strong style={{ color: 'var(--text-primary)' }}>{user.name}</strong></span>
          <img src={user.avatar} alt={user.name} style={{ width: '24px', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  )
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}
export default ThreadItem
