import React from "react";
import EditProfile from "../components/editprofile/EditProfile";
import { styled } from "styled-components";
import DirectingButton from "../components/editprofile/DirectingButton";
import NotFoundPage from "./NotFoundPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";

const ProfileEditPage = () => {
  const LoginUser = useSelector((state: RootState) => state.user);


  if (LoginUser.isLogin === false) {
    return <NotFoundPage />;
  }


  return (
    <>
     <Container>
      <EditProfile />
      <DirectingButton />
      </Container>
    </>
  );
};

export default ProfileEditPage;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 390px;
    min-height: 80vh;
    margin: auto;
`