import React from "react";
import styled from "styled-components";
import ProfileNav from "../components/profiledetail/ProfileNav";
import GlobalStyle from "../components/common/GlobalStyle";
import MyPostList from "../components/profiledetail/MyPostList";




const MypostPage = () => {
    return (
      <>
      < GlobalStyle />
      < ProfileNav />
      < MyPostList />
      
      <div>내가쓴</div>
      </>
    );
};

export default MypostPage;
