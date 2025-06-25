import React from 'react'

const Footer = () => {
  return (
    <div className='text-[#737373] md:px-10'>
        <div className='py-20 justify-items-center'>
          <p>Developed by Ashutosh Wodeyar</p>
          <p>Questions? Contact us</p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 justify-items-center'>
          <ul>
            <li>FAQ</li>
            <li>Privacy</li>
            <li>Speed Test</li>
          </ul>

          <ul>
            <li>Account</li>
            <li>Ways to watch</li>
            <li>Only on Bstream</li>
          </ul>

          <ul>
            <li>Cookie preferences</li>
            <li>Media Center</li>
            <li>Terms of use</li>
          </ul>
        </div>
    </div>
  )
}

export default Footer