import React from 'react'
import Mypicture from '../components/profile/MyPicture'
import FollowersAll from '../components/profile/FollowersAll'
import List from '../components/profile/List'
import FavList from '../components/profile/FavList'
import ListComments from '../components/profile/ListComments'
import GlobalStyle from '../components/common/GlobalStyle'



const ProfilePage = () => {
  return (
    <>
    <GlobalStyle />
    <Mypicture />
    <List />
    <FollowersAll />
    <FavList />
    <ListComments />
    </>
  )
}

export default ProfilePage