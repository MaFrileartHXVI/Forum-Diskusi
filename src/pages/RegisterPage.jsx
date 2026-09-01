import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { asyncRegisterUser } from '../states/users/action'
import RegisterInput from '../components/RegisterInput'

function RegisterPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password })).then((success) => {
      if (success) navigate('/login')
    })
  }

  return (
    <section style={{ textAlign: 'center', marginTop: '4rem' }}>
      <RegisterInput register={onRegister} />
      <p style={{ marginTop: '2rem' }}>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
    </section>
  )
}
export default RegisterPage
