import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncAddThread } from '../states/threads/action'
import ThreadInput from '../components/ThreadInput'

function AddThreadPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category })).then((success) => {
      if (success) navigate('/')
    })
  }

  return (
    <section>
      <ThreadInput addThread={onAddThread} />
    </section>
  )
}
export default AddThreadPage
