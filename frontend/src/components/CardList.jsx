import React, { useEffect, useState } from 'react'
import cardimg from '../assets/cardimg.jpg'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import { Link } from 'react-router-dom'

const CardList = ({categoryName, category}) => {
    const [movieList, setMovieList] = useState([])
    // const static_data = [
    //     {
    //         id: 1,
    //         title: 'Card 1',
    //         description: 'Description for card 1',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 2,
    //         title: 'Card 2',
    //         description: 'Description for card 2',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 3,
    //         title: 'Card 3',
    //         description: 'Description for card 3',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 4,
    //         title: 'Card 4',
    //         description: 'Description for card 4',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 5,
    //         title: 'Card 5',
    //         description: 'Description for card 5',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 6,
    //         title: 'Card 6',
    //         description: 'Description for card 6',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 7,
    //         title: 'Card 7',
    //         description: 'Description for card 7',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     },
    //     {
    //         id: 8,
    //         title: 'Card 8',
    //         description: 'Description for card 8',
    //         imageUrl: 'https://via.placeholder.com/150'
    //     }
    // ]


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDc5MTFkNDQyMzliOThjMWVlODlmZDQ4NGFjODVhZiIsIm5iZiI6MTc0OTg1MjExNi40Nywic3ViIjoiNjg0YzlmZDRlYmY2ZTY2Y2E0YjBkYzBkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.qryDNHrm0Pp3Yhb13aHYZ4lI7M7VMK0F2RTA4Vc2DNs'
        }
    };

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res){
                setMovieList(res.results)
            }
        })
        .catch(err => console.error(err));
    },[category])
        
    if(movieList){
        return (
        <div className='text-white md:px-2'>
            <h2 className='pt-10 pb-5 text-lg font-medium'>{categoryName}</h2>
            <Swiper className='mySwiper' slidesPerView={'auto'} spaceBetween={15}> 

                {movieList.map((item, index)=>(
                    <SwiperSlide key={index} className='max-w-72'>
                        <Link to={`/movie/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="card image" className='h-44 w-full object-center object-cover rounded-2xl hover:scale-105 transition-transform duration-200'/>
                        <p className='text-center pt-2'>{item.title}</p>
                        </Link>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
    }
    
}

export default CardList