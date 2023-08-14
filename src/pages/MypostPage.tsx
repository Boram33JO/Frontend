import React from "react";
import styled from "styled-components";
import ProfileNav from "../components/profiledetail/ProfileNav";
import GlobalStyle from "../components/common/GlobalStyle";
import MyPostList from "../components/profiledetail/MyPostList";

import ProfileNav2 from "../components/profiledetail/ProfileNav2";
import { useParams } from "react-router-dom";

const MypostPage = () => {
  const { userId } = useParams();

  return (
    <>
      <GlobalStyle />
      {(userId) ? <ProfileNav /> : <ProfileNav2 />}
      <MyPostList />

      <div>내가쓴</div>
    </>
  );
};

export default MypostPage;

// http://localhost:3000/profile/%7BuserId%7D/post
