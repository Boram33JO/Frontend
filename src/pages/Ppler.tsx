import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../assets/images/default_profile.svg";
import { followUser } from "../api/post";
import { toast } from "react-hot-toast";

interface PplerProps {
    popularPpler: any;
}

const Ppler: React.FC<PplerProps> = ({ popularPpler }) => {
    const [follow, setFollow] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | undefined>();

    // const getSearch = async () => {
    //     const keyword = searchKeyword;
    //     if (keyword.length !== 0) {
    //         try {
    //             const response = await getSearchKeyword(keyword);
    //             setIsData(response?.data);
    //             setPopularPosts(response?.data.data.posts);
    //             setPopularSongs(response?.data.data.songs);
    //             setPopularPlace(response?.data.data.locations);
    //             setPopularPpler(response?.data.data.users);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // };

    const followHandler = async () => {
        try {
            const userIds = popularPpler.map((item: { userId: number }) => item.userId);
            setUserId(userIds);
            const response = await followUser(userIds);
            if (response.data.message === "팔로우 성공") {
                setFollow(true);
                toast.success("팔로우 성공", { position: "top-center" });
            } else {
                setFollow(false);
                toast.success("언팔로우 성공", { position: "top-center" });
            }
            console.log("sss", response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <StContainer>
            {popularPpler &&
                popularPpler.map((item: any) => (
                    <>
                        <StUserImage>
                            {item.userImage === null ? (
                                <Profile style={{ width: "62px", height: "62px", borderRadius: "100%", background: "#ececec" }} />
                            ) : (
                                <img
                                    src={item.userImage}
                                    alt="imagee"
                                />
                            )}
                        </StUserImage>
                        <StUserInfo>
                            <h3>{item.nickname}</h3>
                            <p>{item.introduce}</p>
                        </StUserInfo>
                        <StButton onClick={followHandler}>{follow === true ? "언팔로우" : "팔로우"}</StButton>
                    </>
                ))}
        </StContainer>
    );
};

export default Ppler;

const StContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 14px;
`;
const StUserImage = styled.div`
    margin-right: 12px;
    img {
        width: 62px;
        height: 62px;
        border-radius: 100%;
    }
`;
const StUserInfo = styled.div`
    width: 65%;
    h3 {
        width: 80%;
        color: #fafafa;
        font-size: 16px;
        font-weight: 600;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
    p {
        width: 80%;
        color: #a6a3af;
        font-size: 14px;
        font-weight: 500;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
    }
`;
const StButton = styled.button`
    color: #fafafa;
    display: flex;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    line-height: 100%;
    background: var(--main_C, linear-gradient(104deg, #c28fee 9.83%, #9782f4 89.15%));
    cursor: pointer;
`;
