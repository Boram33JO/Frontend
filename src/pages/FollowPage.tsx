import React from "react";
import styled from "styled-components";
import Pictures from "../components/profiledetail/Pictures";
import ProfileNav from "../components/profiledetail/ProfileNav";
import ProfileNav2 from "../components/profiledetail/ProfileNav2";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import { useParams } from "react-router-dom";


const FollowPage = () => {

  const {userId} = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);


  const userIdNumber = Number(userId);
  const loginUserNumber = Number(LoginUser.userId);
  return (
    <>
      {userIdNumber === loginUserNumber ? <ProfileNav /> : <ProfileNav2 />}
      <Pictures />
    </>
  );
};

export default FollowPage;
