import React, { useState } from 'react'
import PropTypes from 'prop-types'

function ThreadInput ({ addThread }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  return (
    <form className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); addThread({ title, category, body }) }}>
      <h2>Buat Diskusi Baru</h2>
      <input type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} />
      <textarea placeholder="Isi diskusi..." value={body} onChange={(e) => setBody(e.target.value)} rows="5" required />
      <button type="submit" className="btn-primary">Buat Diskusi</button>
    </form>
  )
}
ThreadInput.propTypes = { addThread: PropTypes.func.isRequired }
export default ThreadInput
