import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div>
          <div className="fixed top-0 left-0 right-0 h-16 z-30 bg-black border-b border-gray-300 px-9 flex justify-around md:justify-between items-center">
        <img src={assets.movieTicket} className='w-18 h-18'></img>
        <Link to="/" className='w-auto h-8 bg-red-500 px-4 py-1 rounded-md hover:bg-red-400 '>Back to Home</Link>
      </div>
    </div>
  )
}

export default AdminNavbar
