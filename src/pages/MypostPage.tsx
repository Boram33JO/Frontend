import React from "react";
import ProfileNav from "../components/profiledetail/ProfileNav";
import ProfileNav2 from "../components/profiledetail/ProfileNav2";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";


// 작성자가 쓴 포스팅 전체
const MypostPage = () => {
  const {userId} = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);


  const userIdNumber = Number(userId);
  const loginUserNumber = Number(LoginUser.userId);
  return (
    <>
      {userIdNumber === loginUserNumber ? <ProfileNav /> : <ProfileNav2 />}
    <div>내가쓴</div>
    </>
  );
};

export default MypostPage;
