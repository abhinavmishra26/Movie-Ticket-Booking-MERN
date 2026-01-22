import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Heart, Images, PlayCircleIcon, StarIcon } from 'lucide-react';
import timeformate from '../lib/timeFormate';
import BlurCircle from '../Components/BlurCircle';
import DateSelected from '../Components/DateSelected';
import MovieCard from '../Components/MovieCard';
import Loading from '../Components/Loading';
import axios from 'axios';
import { useAppContext } from '../context/AppProvider';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player';


const MovieDetails = () => {
  const {axios,getToken,user,shows,image_base_url,favoriteMovies,fetchFavoriteMovies}=useAppContext();
  const {id}=useParams();
  const [show ,setShow]=useState(null)
  const navigate=useNavigate();

  const getShow=async()=>{
    try{
      const {data}=await axios.get(`/api/show/${id}`,{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      })
    
      setShow({movie:data.movie, dateTime:data.dateTime,trailer:data.videoKey});
    }
    catch(error){
      console.log(error);

    }
  }
  
  
  const handleSubmit=async()=>{
    try{
      if(!user) return toast.error("Please login to proceed")
      const {data}=await axios.post("/api/user/update-favorite",{movieId:id},{headers:{
        Authorization:`Bearer ${await getToken()}`
      }})
      if(data.success){
        toast.success(data.message);
      }
    }
    catch(error){
       console.log(error);
    }
   
  }

  useEffect(()=>{
    fetchFavoriteMovies();
  },[favoriteMovies])

useEffect(() => {
  console.log("ID changed to", id);
  getShow();
}, [id]);
console.log(show);


  return show ? (
  <div className="px-4 md:px-40 pt-24 md:pt-48 overflow-x-hidden">

    {/* Top blur (contained) */}
    <div className="relative overflow-hidden">
      <BlurCircle left="400px" top="100px" />
    </div>

    {/* Top section */}
    <div className="flex flex-col md:flex-row gap-8 mb-24 items-center md:items-start max-w-full">

      {/* Poster */}
      <img
        src={image_base_url + show.movie.poster_path}
        className="w-60 sm:w-72 rounded-2xl mt-8 md:mt-0"
        alt={show.movie.title}
      />

      {/* Details */}
      <div className="w-full md:w-3/5 px-2 sm:px-4 md:px-0 relative max-w-full">

        <div className="relative overflow-hidden">
          <BlurCircle left="0px" top="0px" />
        </div>

        <p className="text-rose-500 mb-3 text-sm">ENGLISH</p>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          {show.movie.title}
        </h1>

        <div className="flex items-center mb-4 gap-2">
          <StarIcon className="text-red-500 fill-red-500 w-5" />
          <p className="text-sm sm:text-md text-gray-300">
            {show.movie.vote_average.toFixed(1)} User Rating
          </p>
        </div>

        <p className="text-sm text-gray-400 mb-3 leading-relaxed">
          {show.movie.overview}
        </p>

        <p className="text-sm sm:text-md mb-7">
          {timeformate(show.movie.runtime)} •{" "}
          {show.movie.genres.map(g => g.name).join(", ")} •{" "}
          {new Date(show.movie.release_date).getFullYear()}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center max-w-full">

          <a
            href="#trailer"
            className="w-full sm:w-40 h-11 bg-gray-800 text-sm font-semibold rounded-md flex items-center justify-center gap-1 hover:bg-gray-700"
          >
            <PlayCircleIcon className="w-6" />
            Watch Trailer
          </a>

          <a
            href="#dateSelect"
            className="w-full sm:w-38 h-11 rounded-md text-sm font-semibold text-center py-2.5 bg-red-500 hover:bg-red-400"
          >
            Buy Tickets
          </a>

          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <Heart
              onClick={handleSubmit}
              className={`cursor-pointer ${
                favoriteMovies.find(movie => movie._id === id)
                  ? "fill-primary text-primary"
                  : ""
              }`}
            />
          </div>
        </div>

        {/* Preview button */}
        <button
          className="w-full sm:w-[380px] h-10 bg-zinc-700 text-white rounded-md mt-4 hover:bg-zinc-500 max-w-full"
          onClick={() => navigate(`/movies/${id}/images`)}
        >
          Preview
        </button>
      </div>
    </div>

    {/* Cast */}
    <div className="overflow-x-auto no-scrollbar px-2 md:px-0 max-w-full">
      <p className="mb-6 text-lg font-semibold text-center md:text-left">
        Your Favorite Cast
      </p>

      <div className="flex gap-4 w-max max-w-full">
        {show.movie.casts.slice(0, 12).map((cast, index) => (
          <div
            key={index}
            className="w-20 flex-shrink-0 flex flex-col items-center"
          >
            <img
              src={image_base_url + cast.profile_path}
              alt={cast.name}
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <p className="text-xs font-medium text-center">{cast.name}</p>
          </div>
        ))}
      </div>
    </div>

    <DateSelected dateTime={show.dateTime} id={id} />

    {/* Trailer */}
    <div className="mt-24 md:mt-36 px-2 sm:px-6 md:px-10 overflow-x-hidden">

      <p
        id="trailer"
        className="text-gray-300 font-medium text-lg max-w-[969px] mx-auto"
      >
        Trailer
      </p>

     <div className="relative mt-6">
  <BlurCircle top="100px" right="-100px" />

  <div
    className="
      mx-auto
      max-w-[1200px]
      aspect-[4/5]
      sm:aspect-[16/9]
      md:aspect-[16/9]
    "
  >
    <ReactPlayer
      className="w-full h-full"
      src={`https://www.youtube.com/watch?v=${show.trailer}`}
      controls={false}
      width="110%"
      height="90%"
    />
  </div>
</div>




      <div className="flex justify-center mt-8">
        <button
          onClick={() => (scrollTo(0, 0), navigate("/movies"))}
          className="w-36 bg-red-500 rounded-md h-10 hover:bg-red-400"
        >
          Show More
        </button>
      </div>
    </div>
  </div>
) : (
  <Loading />
)

}

export default MovieDetails
