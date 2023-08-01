import React from 'react'
import LookAround from '../components/main/LookAround'
import PopularPosts from '../components/main/PopularPosts'
import Recommend from '../components/main/Recommend'
import FamousPeople from '../components/main/FamousPeople'

const MainPage = () => {
  return (
    <>
      <LookAround />
      <PopularPosts />
      <Recommend />
      <FamousPeople />
    </>
  )
}

export default MainPage