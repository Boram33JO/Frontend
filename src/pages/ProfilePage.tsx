import React from 'react'
import Mypicture from '../components/profile/MyPicture'
import FollowersAll from '../components/profiledetail/FollowersAll'
import List from '../components/profile/List'
import FavList from '../components/profile/FavList'
import ListComments from '../components/profile/ListComments'



const ProfilePage = () => {
  return (
    <>
    <Mypicture />
    <FollowersAll />
    <List />
    <FavList />
    <ListComments />
    </>
  )
}

export default ProfilePage