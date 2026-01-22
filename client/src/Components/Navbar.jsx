
import { LogIn, MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useAppContext } from '../context/AppProvider';

const Navbar = () => {
  const { favoriteMovies } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  return (
    <div className="w-screen h-18 fixed top-0 left-0 z-50 flex justify-between items-center px-6 
     backdrop-blur-md shadow-lg border-b border-primary/30">
      
   
      <div>
        <Link to="/">
          <img src={assets.movieTicket} className="w-16 h-16 hover:scale-105 transition-transform" alt="Logo" />
        </Link>
      </div>

  
      <div className={`hidden md:flex gap-8 text-white font-medium`}>
        {["Home", "Movies", "Upcoming Movies"].map((item, idx) => (
          <Link
            key={idx}
            onClick={() => scrollTo(0, 0)}
            to={item === "Home" ? "/" : item === "Upcoming Movies" ? "/upcoming" : `/${item.toLowerCase()}`}
            className="relative group"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all"></span>
          </Link>
        ))}
        <Link to="/favorite" className="relative group">
          Favorites
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all"></span>
        </Link>
      </div>

      <div className="flex items-center gap-6 text-white">
        <Link to="/admin" className="w-36 h-8 flex text-center py-1 px-1.5  bg-red-500 md:block text-md font-mono  rounded-lg  cursor-pointer hover:bg-primary transition">Admin Dashboard</Link>
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-full shadow-md transition"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <MenuIcon
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer hover:text-red-500 transition"
        />
      </div>

   
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-black backdrop-blur-md shadow-lg transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 flex flex-col items-start p-6 space-y-6 text-white`}
      >
        <XIcon
          onClick={() => setIsOpen(false)}
          className="self-end cursor-pointer hover:text-red-500 transition"
        />
        {["Home", "Movies", "Upcoming Movies"].map((item, idx) => (
          <Link
            key={idx}
            onClick={() => setIsOpen(false)}
            to={item === "Home" ? "/" : item === "Upcoming Movies" ? "/upcoming" : `/${item.toLowerCase()}`}
            className="text-lg hover:text-red-500 transition"
          >
            {item}
          </Link>
        ))}
        <Link
          onClick={() => setIsOpen(false)}
          to="/favorite"
          className="text-lg hover:text-red-500 transition"
        >
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
