import React from 'react'
import {Search} from 'lucide-react'
import { Link } from 'react-router'

const Navbar = () => {
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
        <button className='bg-green-700 hover:bg-green-600 text-white py-2 px-5 cursor-pointer'>Get AI recommendations</button>
        <Link to={'/signin'}>
          <button className='border border-[#333333] py-2 px-4 hover:border-[#666666] cursor-pointer'>Sign In</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar