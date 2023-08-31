import React from "react";
import EditProfile from "../components/editprofile/EditProfile";
import { styled } from "styled-components";

const ProfileEditPage = () => {
  return (
    <>
     <Container>
      <EditProfile />
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
    background-color: #141414;
    padding-top: 35px;
`