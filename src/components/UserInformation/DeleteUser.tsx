import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../../api/user";
import { toast } from "react-hot-toast";
import store, { RootState } from "../../redux/config/configStore";
import { logout } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";

const DeleteUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const LoginUser = useSelector((state: RootState) => state.user);
  const isMyProfile = Number(userId) === LoginUser.userId;

  const navigateTomain = async () => {
    navigate(-1);
  };

  const handleUserDeleteChange = async () => {
    try {
      const result = await deleteUser();
      //console.log(result)
      if (result.success) {
        //console.log(result)
        toast.success("탈퇴가 완료되었습니다. 감사합니다.", {
          position: "top-center",
        });
        navigate("/");
        store.dispatch(logout());
        //console.log(result.success);
      }
      if (result.error) {
        toast.error(`${result.error}`);
      }
    } catch (error: any) {
      // 오류 처리 로직
      toast.error(`${error}`);
      //console.error('탈퇴오류:', error);
      if (error.response && error.response.data) {
        toast.error(`${error.response.data}`, { position: "top-center" });
      } else {
        toast.error("서버 에러가 발생했습니다.", { position: "top-center" });
      }
    }

    //  if (!isMyProfile) {
    //   // 사용자의 프로필이 아닌 경우, 404 페이지로 리디렉션합니다.
    //   return navigate(`/*`);
    // }
  };
  return (
    <>
      <InnerContainer>
        <Stbox>
          <Stbutton2 onClick={navigateTomain}>뒤로</Stbutton2>
          <Stbutton2 onClick={handleUserDeleteChange}>계정삭제</Stbutton2>
        </Stbox>
      </InnerContainer>
    </>
  );
};

export default DeleteUser;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  padding-top: 250px;
  box-sizing: border-box;
`;

const StBox2 = styled.div``;

const Stbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 14px;
`;

const Stbutton2 = styled.button`
  width: 168px;
  height: 44px;
  background: #45424e;
  color: #e7e6f0;
  &:hover {
    color: #141414;
  }
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
`;

