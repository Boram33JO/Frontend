import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileNav from "../components/profiledetail/ProfileNav";
import GlobalStyle from "../components/common/GlobalStyle";
import MyPostList from "../components/profiledetail/MyPostList";
import ProfileNav2 from "../components/profiledetail/ProfileNav2";
import { useParams } from "react-router-dom";

// 작성자가 쓴 포스팅 전체
const MypostPage = () => {
  const { userId } = useParams();
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    // 로컬 스토리지에서 userId를 가져옵니다.
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setStoredUserId(storedUserId);
    }
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  return (
    <>
      <GlobalStyle />
      {storedUserId === userId ? <ProfileNav /> : <ProfileNav2 />}
      <MyPostList />
    </>
  );
};

export default MypostPage;
