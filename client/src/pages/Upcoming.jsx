import React from 'react'
import MovieCardUpcoming from '../Components/MovieCardUpcoming'
import BlurCircle from '../Components/BlurCircle'
import { useAppContext } from '../context/AppProvider'

const Upcoming = () => {
  const { upcomingShows } = useAppContext()

  return upcomingShows.length > 0 ? (
    <div className="w-full mt-32 px-4 md:px-0 lg:px-46 overflow-x-hidden">
      <BlurCircle top="200px" left="50px" />
      <p className="text-lg mb-5 text-center md:text-left md:mx-0">
        Upcoming Movies
      </p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 px-2 sm:px-6 md:px-0">
        {upcomingShows.map(movie => (
          <MovieCardUpcoming key={movie._id} movie={movie} />
        ))}
        <BlurCircle top="680px" right="50px" />
      </div>
    </div>
  ) : (
    <div className="w-full mt-44 flex justify-center items-center px-4">
      <h1 className="text-xl sm:text-3xl md:text-4xl text-gray-400 text-center">
        Upcoming Movies Not Available
      </h1>
    </div>
  )
}

export default Upcoming
