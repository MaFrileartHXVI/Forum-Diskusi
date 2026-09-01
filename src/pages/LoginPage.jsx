import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { asyncSetAuthUser } from '../states/authUser/action'
import LoginInput from '../components/LoginInput'

function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
    navigate('/')
  }

  return (
    <section style={{ textAlign: 'center', marginTop: '4rem' }}>
      <LoginInput login={onLogin} />
      <p style={{ marginTop: '2rem' }}>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
    </section>
  )
}
export default LoginPage
