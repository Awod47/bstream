import React, { useEffect, useState } from 'react'
import poster from '../assets/herobg2.jpg'
import { Bookmark, Play } from 'lucide-react'
import { Link } from 'react-router'

const MainPoster = () => {

  const [movie, setMovie] = useState(null)
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDc5MTFkNDQyMzliOThjMWVlODlmZDQ4NGFjODVhZiIsIm5iZiI6MTc0OTg1MjExNi40Nywic3ViIjoiNjg0YzlmZDRlYmY2ZTY2Y2E0YjBkYzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qryDNHrm0Pp3Yhb13aHYZ4lI7M7VMK0F2RTA4Vc2DNs'
    }
  };


  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => {
      if (res){
        const randomInt = Math.floor(Math.random() * 20)
        setMovie(res.results[randomInt])
      }
    })
    .catch(err => console.error(err));
  },[])
  

  if(movie){
    return (
      <div className='text-white relative'>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="image loading.." className='w-full rounded-2xl h-[480px] object-center object-cover'/>
        <div className='flex space-x-2 md:space-x-5 absolute bottom-3 left-4 md:bottom-8 md:left-10'>
          <button className='flex justify-center items-center bg-black text-[#555555] hover:text-[#999999] py-3 px-4 cursor-pointer rounded-2xl text-sm md:text-base'><Bookmark className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Save</button>
          <Link to={`/movie/${movie.id}`}>
          <button className='flex justify-center items-center bg-black text-[#555555] hover:text-[#999999] py-3 px-4 cursor-pointer rounded-2xl text-sm md:text-base'><Play className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Watch now</button>
          </Link>
        </div>
      </div>
    )
  }
}


export default MainPoster