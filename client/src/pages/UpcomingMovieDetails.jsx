import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import BlurCircle from "../Components/BlurCircle";
import { StarIcon } from "lucide-react";
import { PlayCircleIcon } from "lucide-react";
import { Heart } from "lucide-react";
import timeformate from "../lib/timeFormate";
import ReactPlayer from 'react-player';

const UpcomingMovieDetails =() => {
 const {upcomingShows ,image_base_url,favoriteMovies, axios,getToken}=useAppContext();
 const navigate=useNavigate();
 const {id}=useParams();
 const [upcomingMovie,setUpcomingMovie]=useState();
 const [show,setShow]=useState();
 const fetchUpcomingMovies=()=>{
  const movie = upcomingShows.find((movie) => movie.id === Number(id));
  console.log(movie);
    if (movie) {
      setUpcomingMovie(movie);
    }
  };

  const getShow=async()=>{
    try{
      const {data}=await axios.get(`/api/show/${id}`,{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      })
    
      setShow({trailer:data.videoKey});
    }
    catch(error){
      console.log(error);

    }
  }
  
  useEffect(()=>{
    fetchUpcomingMovies();
    getShow();
  },[id]);
 
  console.log(upcomingMovie);

  return upcomingMovie && show? (
    <div className='  md:px-40 md:pt-48 '>
      <BlurCircle left='400px'  top='100px' />
      <div className='flex  flex-col  gap-8 mb-24 md:flex-row'>
        <img src={image_base_url+upcomingMovie.poster_path} className='w-72 h-1/2 rounded-2xl ml-25 mt-30 md:ml-0 md:mt-0'></img>
        <div className='mx-6 mt-4=3 md:w-3/5 relative '>
         <BlurCircle  left="0px " top='0px'  />
          <p className='text-rose-500 mb-3 '>ENGLISH</p>
          <h1 className='text-4xl mt-4 font-semibold mb-3'>{upcomingMovie.title}</h1>
          <div className='flex mb-4 gap-2'>
            <StarIcon className='text-red-500 fill-red-500'/>
            <p className='text-md text-gray-300'>{upcomingMovie.vote_average.toFixed(1)} User Rating</p>
          </div>
          <p className='text-md text-gray-400 mb-3'>{upcomingMovie.overview}</p>
          <p className='text-lg mb-7 text-primary/95'>
             Releasing Date : <span className="text-gray-300"> {upcomingMovie.release_date} </span>
          </p>
          <div className='flex gap-4'>
            <a href='#trailer' className='w-40 h-11 cursor-pointer bg-gray-800 text-sm font-semibold rounded-md flex items-center px-4 gap-1 hover:bg-gray-700 '>
              <PlayCircleIcon className='w-6'/>
              Watch Tailer</a>     
          </div>
        </div>
      </div>
      <div className=' px-10  '>
      <p id='trailer' className='text-gray-300  text-2xl max-w-[969px] mx-4 font-bold' >Trailer</p>
        <div className='relative mt-6 md:px-0'>
            <BlurCircle top='100px' right='-100px' />
            <ReactPlayer className='mx-auto max-w-full' src={`https://www.youtube.com/watch?v=${show.trailer}`} controls={false} width="1200px" height="600px" />   
        </div>
        <div className='flex justify-center mb-5'>
        <button onClick={()=>(navigate("/upcoming"))}className='w-34 bg-red-500 rounded-md  mt-18 h-10 cursor-pointer hover:bg-red-400'>Show More</button>
        </div>
        </div>
      </div>
    
  ):(
    <Loading/>
  )
}

export default UpcomingMovieDetails;

