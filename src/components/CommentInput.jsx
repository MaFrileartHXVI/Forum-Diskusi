import React, { useState } from 'react'
import PropTypes from 'prop-types'

function CommentInput ({ addComment }) {
  const [content, setContent] = useState('')
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }} onSubmit={(e) => { e.preventDefault(); addComment(content); setContent('') }}>
      <textarea placeholder="Beri komentar..." value={content} onChange={(e) => setContent(e.target.value)} rows="3" required />
      <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Kirim Komentar</button>
    </form>
  )
}
CommentInput.propTypes = { addComment: PropTypes.func.isRequired }
export default CommentInput
