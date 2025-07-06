import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import toast, {Toaster} from 'react-hot-toast'

const SignIn = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {signin, isLoading, error} = useAuthStore()


  const handleSignIn = async(event)=>{
    event.preventDefault()
    try {
      const {message} = await signin(username, password)
      toast.success(message)
      navigate('/')
    } catch (error) {
      console.log('error in handle signin jsx', error)
    }
  }

  console.log(username, password)

  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
    style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/background_banner.jpg)',
        }}>

        <div className='max-w-[450px] w-full mx-auto bg-black px-8 py-14 rounded mt-8'>
          <h1 className='text-3xl font-medium text-white mb-7'>Sign In</h1>

          
          <form  onSubmit={handleSignIn} action="" className='flex flex-col space-y-4 w-full' >
            <input value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='username' className='bg-[#222222] text-white w-full h-[50px] rounded text-base px-5' type="text" />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' className='bg-[#222222] text-white w-full h-[50px] rounded text-base px-5' type="password" />
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <button disabled={isLoading} type='submit' className='text-white rounded-2xl mt-6 bg-green-700 hover:bg-green-600 h-[48px] cursor-pointer'>Sign In</button>
          </form>
          <div className='p-3 justify-items-center w-full'>
            <Link to={'/signup'}>
            <p className=' text-white text-center'>no account? <span className='text-sm underline'> sign up here</span></p>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default SignIn