import React from "react";
import styled from "styled-components";
import ProfileNav from "../components/profiledetail/ProfileNav";
import GlobalStyle from "../components/common/GlobalStyle";
import AllCommentsList from "../components/profiledetail/AllCommmentsList";

const MycommentsPage = () => {
  return (
    <>
      <GlobalStyle />
      <ProfileNav />
      < AllCommentsList />
    </>
  );
};

export default MycommentsPage;
