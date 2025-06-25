import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log(username, email, password)

    return (
        <div className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
        style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/background_banner.jpg)',
            }}>

            <div className='max-w-[450px] w-full mx-auto bg-black px-8 py-14 rounded mt-8'>
            <h1 className='text-3xl font-medium text-white mb-7'>Sign Up</h1>

            
            <form action="" className='flex flex-col space-y-4' >
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='johndoe123' className='bg-[#222222] text-white w-full h-[50px] rounded text-base px-5' type="text" />
                <input value= {email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='johndoe@gmail.com'  className='bg-[#222222] text-white w-full h-[50px] rounded text-base px-5' type="email"  />
                <input value= {password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' className='bg-[#222222] text-white w-full h-[50px] rounded text-base px-5' type="password" />
                <button type='submit' className='text-white rounded-2xl mt-6 bg-green-700 hover:bg-green-600 h-[48px] cursor-pointer'>Sign Up</button>
            </form>
            <div className='p-3 justify-items-center w-full'>
                <Link to={'/signin'}>
                <p className=' text-white text-center'>already have an account? <span className='text-sm underline'> sign in here</span></p>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default SignUp