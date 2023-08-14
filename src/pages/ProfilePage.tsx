import React, { useEffect, useState } from 'react';
import Mypicture from '../components/profile/MyPicture';
import FollowersAll from '../components/profile/FollowersAll';
import List from '../components/profile/List';
import FavList from '../components/profile/FavList';
import ListComments from '../components/profile/ListComments';
import GlobalStyle from '../components/common/GlobalStyle';


const ProfilePage = () => {
  const [userIdFromStorage, setUserIdFromStorage] = useState<string | undefined>(undefined);
  const [userIdFromUrl, setUserIdFromUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 로컬 스토리지에서 userId 가져오기 (실제 사용하는 로컬 스토리지 키로 교체해주세요)
    const storedUserId = localStorage.getItem('userId');
    // null을 undefined로 변환
    setUserIdFromStorage(storedUserId !== null ? storedUserId : undefined);

    // 현재 경로에서 userId 추출하기
    const pathParts = window.location.pathname.split('/');
    const urlUserId = pathParts[2]; // 경로 형식: /profile/${userId}
    // null을 undefined로 변환
    setUserIdFromUrl(urlUserId !== null ? urlUserId : undefined);
  }, []);


  // 내 프로필 여부 확인, 형 변환하여 비교
  const isMyProfile = Number(userIdFromStorage) === Number(userIdFromUrl);


  return (
    <>
      <GlobalStyle />
      {isMyProfile && <Mypicture />}
      <List />
      <FollowersAll />
      <FavList />
      <ListComments />
    </>
  );
};

export default ProfilePage;
