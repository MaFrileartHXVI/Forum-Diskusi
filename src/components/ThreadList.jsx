import React from 'react'
import PropTypes from 'prop-types'
import ThreadItem from './ThreadItem'

function ThreadList ({ threads, authUser, upVote, downVote, neutralizeVote }) {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} authUser={authUser} upVote={upVote} downVote={downVote} neutralizeVote={neutralizeVote} />
      ))}
    </div>
  )
}
ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired
}
export default ThreadList
