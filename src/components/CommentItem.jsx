import React from 'react'
import PropTypes from 'prop-types'
import { postedAt } from '../utils/formatter'
import parse from 'html-react-parser'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'

function CommentItem ({ id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, upVote, downVote, neutralizeVote }) {
  const isUpvoted = authUser && upVotesBy.includes(authUser)
  const isDownvoted = authUser && downVotesBy.includes(authUser)

  return (
    <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={owner.avatar} alt={owner.name} style={{ width: '32px', borderRadius: '50%' }} />
          <strong>{owner.name}</strong>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{postedAt(createdAt)}</span>
      </div>
      <div style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{parse(content)}</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => isUpvoted ? neutralizeVote(id) : upVote(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', color: isUpvoted ? 'var(--primary)' : 'var(--text-secondary)' }}><FiThumbsUp /> {upVotesBy.length}</button>
        <button onClick={() => isDownvoted ? neutralizeVote(id) : downVote(id)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', color: isDownvoted ? 'var(--secondary)' : 'var(--text-secondary)' }}><FiThumbsDown /> {downVotesBy.length}</button>
      </div>
    </div>
  )
}
CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}
export default CommentItem
