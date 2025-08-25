import React from 'react'
import { assets } from '../assets/assets'

const AdminNavbar = () => {
  return (
    <div>
          <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-black border-b border-gray-300 px-9 flex items-center">
        <img src={assets.movieTicket} className='w-18 h-18'></img>
      </div>
    </div>
  )
}

export default AdminNavbar
