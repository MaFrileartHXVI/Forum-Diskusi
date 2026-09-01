import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveThreadDetail, asyncAddComment, asyncUpVoteThreadDetail, asyncDownVoteThreadDetail, asyncNeutralizeVoteThreadDetail, asyncUpVoteComment, asyncDownVoteComment, asyncNeutralizeVoteComment } from '../states/threadDetail/action'
import ThreadItem from '../components/ThreadItem'
import CommentItem from '../components/CommentItem'
import CommentInput from '../components/CommentInput'

function DetailPage () {
  const { id } = useParams()
  const threadDetail = useSelector((states) => states.threadDetail)
  const authUser = useSelector((states) => states.authUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id))
  }, [id, dispatch])

  if (!threadDetail) return null

  const onUpVote = () => dispatch(asyncUpVoteThreadDetail())
  const onDownVote = () => dispatch(asyncDownVoteThreadDetail())
  const onNeutralize = () => dispatch(asyncNeutralizeVoteThreadDetail())

  const onCommentUpVote = (commentId) => dispatch(asyncUpVoteComment(commentId))
  const onCommentDownVote = (commentId) => dispatch(asyncDownVoteComment(commentId))
  const onCommentNeutralize = (commentId) => dispatch(asyncNeutralizeVoteComment(commentId))

  const onAddComment = (content) => {
    if (!authUser) return alert('Silakan login terlebih dahulu')
    dispatch(asyncAddComment({ content }))
  }

  return (
    <section>
      <ThreadItem {...threadDetail} user={threadDetail.owner} authUser={authUser ? authUser.id : null} upVote={onUpVote} downVote={onDownVote} neutralizeVote={onNeutralize} />
      <div className="glass" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3>Komentar ({threadDetail.comments.length})</h3>
        {authUser ? <CommentInput addComment={onAddComment} /> : <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Silakan login untuk memberi komentar.</p>}
        <div style={{ marginTop: '2rem' }}>
          {threadDetail.comments.map((comment) => (
            <CommentItem key={comment.id} {...comment} authUser={authUser ? authUser.id : null} upVote={onCommentUpVote} downVote={onCommentDownVote} neutralizeVote={onCommentNeutralize} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default DetailPage
