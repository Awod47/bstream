import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router'
import Moviepage from './pages/Moviepage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

const App = () => {
  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/movie/:id' element={<Moviepage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>

      </Routes>
    </div>
  )
}

export default App