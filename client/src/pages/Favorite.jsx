
import React from 'react'
import MovieCard from '../Components/MovieCard'
import BlurCircle from '../Components/BlurCircle'
import { useAppContext } from '../context/AppProvider'

const Favorite = () => {
  const { favoriteMovies } = useAppContext()

  return (
    favoriteMovies.length > 0 ? (
      <div className="w-full mt-30 md:mt-34 lg:px-46">

        <BlurCircle top="200px" left="50px" />
        <p className="text-lg mb-5 mx-10 md:mx-0  md:text-left">
          Your Favorite Movies
        </p>
        <div className="
          px-4
          sm:px-8
          md:px-0
          flex
          gap-6
          flex-wrap
          justify-center
          md:justify-start
        ">
          {favoriteMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}

          <BlurCircle top="680px" right="50px" />
        </div>
      </div>
    ) : (
      <div className="w-full mt-44 px-4 flex justify-center items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-400 text-center">
          No Favorite Movie Available
        </h1>
      </div>
    )
  )
}

export default Favorite
