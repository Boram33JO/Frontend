import React from "react";
import EditProfile from "../components/editprofile/EditProfile";
import { styled } from "styled-components";
import DirectingButton from "../components/editprofile/DirectingButton";

const ProfileEditPage = () => {
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