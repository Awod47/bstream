import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const RecommendedMovies = ({movieTitles}) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  };
  

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovie = async(title) =>{
    const encodedTitle = encodeURIComponent(title)
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`
    try {
      const res = await fetch(url, options)
      const data = await res.json()
      return data.results?.[0] || null
    } catch (error) {
      console.log('error fetching movie after recommendation', error)
      return null      
    }
  }

  useEffect(()=>{
    const loadMovies = async() =>{
      setLoading(true)
      const results = await Promise.all(movieTitles.map((title) => fetchMovie(title)))
      setMovies(results.filter(Boolean))
      setLoading(false)
    }

    if(movieTitles?.length){
      loadMovies()
    }
  }, [movieTitles])

  if(loading){
    <p>loading...</p>
  }

  console.log(movies)

  return(
    <div className='grid grid-cols-2 md:grid-cols-5 gap-5'>
      {movies.map((mov) => (
        <Link to={`/movie/${mov.id}`} key={mov.id} className='bg-[#232323]/10 rounded-lg overflow-hidden hover:scale-105 transition duration-200'>
          {mov.poster_path? 
          (
            <img className='w-full object-cover' src={`https://image.tmdb.org/t/p/original/${mov.poster_path}`}/> 
          )
          : 
          <></>}
          <div className='m-2'>
            <h3 className='text-center text-white font-semibold'>{mov.title}</h3>
            <h3 className='text-xs text-center text-white'>{mov.release_date? mov.release_date.slice(0,4) : 'NA'}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default RecommendedMovies