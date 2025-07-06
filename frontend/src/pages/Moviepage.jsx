import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {Star, Clock, Calendar, Play} from 'lucide-react'
import { Link } from 'react-router-dom';

const Moviepage = () => {


    const [movie, setMovie] = useState(null)
    const [movieRecommendations, setMovieRecommendations] = useState(null)
    const [trailerKey, setTrailerKey] = useState(null)
    const {id} = useParams()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(res => res.json())
        .then(res => {
            if(res){
                console.log(res)
                setMovie(res)
            }
        })
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => {
            if(res){
                console.log('recs:', res)
                setMovieRecommendations(res.results)
            }
        })
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => {
            if(res){
                console.log('videos:',res)
                const trailer = res.results?.find((vid) => vid.site === 'YouTube' && vid.type === 'Trailer')
                setTrailerKey(trailer?.key)
            }
        })
        .catch(err => console.error(err));
    }, [id])


    if(movie){
        return (
            <div className='min-h-screen bg-[#111111] text-white'>
                <div className='relative h-[60vh] flex item-end' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

                    <div className='absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent'></div>
                    <div className='relative z-10 flex items-end p-8 gap-8'>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" className='rounded-lg shadow-lg w-48 hidden md:block'/>
                        <div>
                            <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
                            <div className='flex items-center gap-4 mb-2'>
                                <span className='flex space-x-2'>⭐{movie.vote_average.toFixed(1)}</span>
                                <span className='flex'><Calendar/>{movie.release_date}</span>
                                <span className='flex'><Clock/>{movie.runtime} minutes</span>
                            </div>
                            <div className='flex flex-wrap gap-2 mb-4'>
                                {movie.genres.map((genre)=>(
                                    <span key= {genre.id} className='bg-black px-3 py-1 rounded-full text-sm'>{genre.name}</span>
                                ))}
                            </div>
                            <p className='text-gray-200 mb-4'>{movie.overview}</p>
                            <Link to={`https://www.youtube.com/watch?v=${trailerKey}`} target='_blank'>
                            <button className='flex justify-center items-center bg-black text-[#555555] hover:text-[#999999] py-3 px-4 mt-2 md:mt-4 cursor-pointer rounded-2xl text-sm md:text-base'><Play className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Watch now</button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                <div className='p-8'>
                    <h2 className='text-2xl font-semibold mb-14'>About</h2>
                    <div className='bg-[#222222] rounded-lg p-6 flex flex-col md:flex-row gap-8'>
                        <div className='flex-1'>
                            <ul className='text-gray-300 space-y-3'>
                                <li>
                                    <span className='font-semibold text-white'>Status: </span>
                                    <span className='ml-2'>{movie.status}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Relase date: </span>
                                    <span className='ml-2'>{movie.release_date}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Original language: </span>
                                    <span className='ml-2'>{movie.original_language.toUpperCase()}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Budget: </span>
                                    <span className='ml-2'>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'NA'}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Revenue: </span>
                                    <span className='ml-2'>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'NA'}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Production companies: </span>
                                    <span className='ml-2'>
                                        {movie.production_companies? movie.production_companies.map(company => company.name).join(', ') : 'NA'}
                                    </span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Countries: </span>
                                    <span className='ml-2'>
                                        {movie.production_countries? movie.production_countries.map(country => country.iso_3166_1).join(', ') : 'NA'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='flex-1'>
                            <h3 className='font-semibold text-white mb-2'>Tagline</h3>
                            <p className='italic text-gray-400 mb-6'>{movie.tagline || 'No tagline'}</p>
                            
                            <h3 className='font-semibold text-white mb-2'>Overview</h3>
                            <p className='text-gray-200'>{movie.overview}</p>
                        </div>
                    </div>
                </div>

                {movieRecommendations && movieRecommendations.length > 0 && (
                    <div className='p-8'>
                        <h2 className='text-2xl font-semibold mb-6'>You might also like..</h2>
                        <div className='grid grid-cols-2 md:grid-cols-5 justify-items-center gap-6'>
                            {movieRecommendations.slice(0,10).map((rec)=>(
                                <div key={rec.id} className='bg-[#222222] rounded-2xl hover:scale-105 transition-transform duration-200'>
                                    <Link to={`/movie/${rec.id}`}>
                                        <img src ={`https://image.tmdb.org/t/p/original/${rec.poster_path}`} alt="loading.." className='w-[300px] rounded-2xl object-cover'/>
                                        <div className='justify-items-center p-2'>
                                            <h3 className='text-sm font-semibold'>{rec.title}</h3>
                                            <h3 className='text-xs text-gray-400 text-center'>{rec.release_date?.slice(0,4)}</h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Moviepage