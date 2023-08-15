import React from "react";
import ProfileNav from "../components/profiledetail/ProfileNav";
import ProfileNav2 from "../components/profiledetail/ProfileNav2";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";


const WishlistPage = () => {
  const {userId} = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);


  const userIdNumber = Number(userId);
  const loginUserNumber = Number(LoginUser.userId);
  return (
    <>
      {userIdNumber === loginUserNumber ? <ProfileNav /> : <ProfileNav2 />}
  {/* < YourPostList /> */}
    <div>좋아한</div>
    </>
  );
};

export default WishlistPage;
