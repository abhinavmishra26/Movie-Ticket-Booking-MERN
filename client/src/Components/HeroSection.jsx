import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar1Icon, Clock10Icon } from 'lucide-react'
import {useNavigate} from "react-router-dom"
import { useAppContext } from '../context/AppProvider'
import { useState ,useEffect} from 'react'


const HeroSection = () => {
  const{image_base_url}=useAppContext();
  const {shows}=useAppContext();
  const navigate=useNavigate();

  const backgroundImages=[
    "/bg-12.jpg",
   ];

   const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000); 

    return () => clearInterval(interval); 
  }, []);


  return (
  <div
    className="
      h-screen w-screen
      bg-cover bg-center
      flex items-center
      px-4 sm:px-6
      max-md:bg-center max-md:bg-cover
    "
    style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
  >
    <div
      className="
        w-full max-w-[420px]
        md:max-w-[1080px]
        relative
        top-6 md:top-4
        md:left-38
      "
    >
      
      <img
        src={assets.marvelLogo}
        className="mb-4 w-32 sm:w-40 md:w-auto"
        alt="Marvel"
      />

      <h1 className="font-semibold mb-2 leading-tight">
        <span className="block text-2xl sm:text-3xl md:text-4xl text-gray-200">
          Forget the hassle of long ticket counters..
        </span>
      </h1>

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-4">
        Tap to Book.
      </h1>

    
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm mb-4 text-gray-300">
        <p>Action | Adventure | Sci-Fi</p>
        <span className="flex items-center gap-1">
          <Calendar1Icon className="w-4 h-4" /> 2008
        </span>
        <span className="flex items-center gap-1">
          <Clock10Icon className="w-4 h-4" /> 2h 8m
        </span>
      </div>

     
      <p
        className="
          text-sm sm:text-base
          leading-relaxed
          text-gray-200
          mb-6
          max-w-full md:max-w-[700px]
        "
      >
        “Book tickets for the latest blockbusters and timeless classics in just a
        few seconds. Choose your cinema, pick your seats, and enjoy a seamless
        movie-going experience — anytime, anywhere.”
      </p>

    
      <button
        className="
          flex items-center gap-2
          bg-red-500 hover:bg-red-400
          h-10 px-6
          rounded-md
          font-semibold
          text-sm sm:text-base
        "
        onClick={() => navigate("/movies")}
      >
        Explore Movies
        <ArrowRight className="w-5" />
      </button>
    </div>
  </div>
);

}

export  default HeroSection;