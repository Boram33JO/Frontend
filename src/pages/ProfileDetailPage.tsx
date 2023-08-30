import { useState } from "react";
import AllCommentsList from "../components/profiledetail/AllCommmentsList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";
import ProfileNav3 from "../components/profiledetail/ProfileNav3";
import Pictures from "../components/profiledetail/Pictures";
import FavListAll from "../components/profiledetail/FavListAll";
import YourPostList from "../components/profiledetail/YourPostList";

const MycommentsPage = () => {
    const [nav, setNav] = useState<number>(0);
    const { userId } = useParams();
    const LoginUser = useSelector((state: RootState) => state.user);
    const userIdNumber = Number(userId);
    const loginUserNumber = Number(LoginUser.userId);
    const isYours = (userIdNumber === loginUserNumber);

    return (
        <>
            {isYours
                ? <>
                    <ProfileNav3 nav={nav} setNav={setNav} isYours={isYours} />
                    {nav === 0 && <YourPostList />}
                    {nav === 1 && <Pictures />}
                    {nav === 2 && <FavListAll />}
                    {nav === 3 && <AllCommentsList />}
                </>
                : <>
                    <ProfileNav3 nav={nav} setNav={setNav} isYours={isYours} />
                    {nav === 0 && <YourPostList />}
                    {nav === 1 && <Pictures />}
                </>
            }
        </>
    );
};

export default MycommentsPage;
