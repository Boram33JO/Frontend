import React from 'react'
import Followers from '../components/profile/Followers'
import Mypicture from '../components/profile/MyPicture'
import List from '../components/profile/List'
import FavList from '../components/profile/FavList'
import ListComments from '../components/profile/ListComments'

const ProfilePage = () => {
  return (
    <>
    <Mypicture />
    <Followers />
    <List />
    <FavList />
    <ListComments />
    </>
  )
}

export default ProfilePage