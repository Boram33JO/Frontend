import React from "react";
import styled from "styled-components";
import ProfileNav from "../components/profiledetail/ProfileNav";
import GlobalStyle from "../components/common/GlobalStyle";
import YourPostList from "../components/profiledetail/YourPostList";




const WishlistPage = () => {
  return (
    <>
    <GlobalStyle/>
    <ProfileNav />
  < YourPostList />
    <div>좋아한</div>
    </>
  );
};

export default WishlistPage;
