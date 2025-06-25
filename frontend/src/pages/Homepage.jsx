import React from 'react'
import MainPoster from '../components/MainPoster'
import CardList from '../components/CardList'
import Footer from '../components/Footer'

const Homepage = () => {
  return (
    <div className='p-3'>
      <MainPoster/>
      <CardList categoryName='Now Playing' category='now_playing'/>
      <CardList categoryName='Top Rated' category='top_rated'/>
      <CardList categoryName= 'Popular' category='popular'/>
      <CardList categoryName= 'Upcoming' category='upcoming'/>
      <Footer/>
    </div>
  )
}

export default Homepage