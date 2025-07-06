import React, { useState } from 'react'
import {HelpCircle, LogOut, Search, Settings} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const {user, logout} = useAuthStore()
  const [userMenu, showUserMenu] = useState(false)

  const handleLogout = async() => {
    const message = await logout()
    toast.success(message)
    navigate('/')
  }
  
  return (
    <nav className='bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap'>
      <Link to={'/'}>
        <label className='text-2xl text-green-500 cursor-pointer font-bold'>BSTREAM</label>
      </Link>
      
      <ul className='hidden xl:flex space-x-6' >
        <li className='cursor-pointer hover:text-green-500'>Home</li>
        <li className='cursor-pointer hover:text-green-500'>TV Shows</li>
        <li className='cursor-pointer hover:text-green-500'>Movies</li>
        <li className='cursor-pointer hover:text-green-500'>Anime</li>
        <li className='cursor-pointer hover:text-green-500'>Games</li>
        <li className='cursor-pointer hover:text-green-500'>New and Popular</li>
        <li className='cursor-pointer hover:text-green-500'>Upcoming</li>
      </ul>

      <div className='flex items-center space-x-4 relative'>
        <div className='relative hidden md:inline-flex'>
          <input type="text" className='bg-[#333333] px-4 py-2 rounded-full min-w-72 outline-none' placeholder='Search..'/>
          <Search className='absolute top-2 right-4 w-5 h-5 cursor-pointer'/>
        </div>
        <Link to={user? '/ai-recommendations' : '/signin'}>
        <button className='bg-green-700 hover:bg-green-600 text-white py-2 px-5 cursor-pointer'>Get AI recommendations</button>
        </Link>
        
        {!user ? 
        <Link to={'/signin'}>
          <button className='border border-[#333333] py-2 px-4 hover:border-[#555555] cursor-pointer'>Sign In</button>
        </Link> 
        :  
        <div>
          <img onClick={()=>showUserMenu(!userMenu)} src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.username}`} alt="error" className='w-9 h-9 rounded-full border-2 border-[#222222] '/>
          {userMenu && (
            <div className='absolute right-0 mt-2 w-64 bg-[#333333] bg-opacity-95 rounded-lg z-50 flex flex-col p-5 shadow-lg gap-2 border border-[#222222]'>
              <div className='flex flex-col items-center mb-2'>
                <span className='text-white font-semibold text-base'>{user.username}</span>
                <span className='text-xs text-gray-400'>{user.email}</span>
              </div>

              <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                <HelpCircle className='w-5 h-5'/>
                Help center
              </button>

              <button className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                <Settings className='w-5 h-5'/>
                Settings
              </button>

              <button onClick={handleLogout} className='flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer'>
                <LogOut className='w-5 h-5'/>
                Logout
              </button>
            </div>
          )}
        </div>}
      </div>
    </nav>
  )
}

export default Navbar