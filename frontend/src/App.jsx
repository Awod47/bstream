import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { Routes, Route, useLocation } from 'react-router-dom'
import Moviepage from './pages/Moviepage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Recommendations from './pages/Recommendations'

const App = () => {
  const location = useLocation()
  const {fetchUser, fetchingUser} = useAuthStore()
  
  useEffect(()=>{
    if(location.pathname !== '/signin' && location.pathname !== '/signup'){
      fetchUser()
    }
  }, [fetchUser, location.pathname])

  if(fetchingUser){
    return <p>loading...</p>
  }
  return (
    <div>
      <Toaster/>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/movie/:id' element={<Moviepage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/ai-recommendations' element={<Recommendations/>}/>

      </Routes>
    </div>
  )
}

export default App