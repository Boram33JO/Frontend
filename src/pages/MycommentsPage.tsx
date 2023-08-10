import React from "react";
import styled from "styled-components";
import ProfileNav from "../components/profiledetail/ProfileNav";
import GlobalStyle from "../components/common/GlobalStyle";

const MycommentsPage = () => {
  return (
    <>
      <GlobalStyle />
      <ProfileNav />
      <div>댓글단</div>
    </>
  );
};

export default MycommentsPage;
