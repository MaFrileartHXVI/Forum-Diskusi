import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DetailPage from './pages/DetailPage'
import AddThreadPage from './pages/AddThreadPage'
import LeaderboardPage from './pages/LeaderboardPage'

function App () {
  const authUser = useSelector((states) => states.authUser)
  const isPreload = useSelector((states) => states.isPreload)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser())
  }

  if (isPreload) {
    return null
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/new" element={<AddThreadPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
