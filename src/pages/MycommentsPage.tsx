import ProfileNav from "../components/profiledetail/ProfileNav";
import AllCommentsList from "../components/profiledetail/AllCommmentsList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import ProfileNav2 from "../components/profiledetail/ProfileNav2";

const MycommentsPage = () => {
  const {userId} = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);


  const userIdNumber = Number(userId);
  const loginUserNumber = Number(LoginUser.userId);
  return (
    <>
      {userIdNumber === loginUserNumber ? <ProfileNav /> : <ProfileNav2 />}
      < AllCommentsList />
    </>
  );
};

export default MycommentsPage;
