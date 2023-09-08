import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as LikeIcon } from "../../assets/images/icon_like.svg";
import { ReactComponent as MusicIcon } from "../../assets/images/music_icon.svg";
import { ReactComponent as Icon } from "../../assets/images/I.svg";
import { ReactComponent as Profile } from "../../assets/images/default_profile.svg";
import { useNavigate } from "react-router-dom";
import { displayedAt } from "../../utils/common";

interface SearchProps {
    topPost: any;
    setTopPost: any;
    randomColorChange: any;
}

const RecommendedPosting: React.FC<SearchProps> = ({ topPost, setTopPost, randomColorChange }) => {
    const [randomColors, setRandomColors] = useState<string[]>([]);
    const navigate = useNavigate();

    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

    useEffect(() => {
        const colors = [
            "#7178BA",
            "#7197BA",
            "#776BC0",
            "#C57E56",
            "#87B499",
            "#D38D8D",
            "#2E4491",
            "#33837E",
            "#DC7D94",
            "#D57070",
            "#5292A7",
        ];
        const getRandomColor = () => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            return colors[randomIndex];
        };

        setRandomColors(topPost.slice(0, 3).map(() => getRandomColor()));
    }, [randomColorChange]);

    return (
        <>
            {topPost.slice(0, 3).map((item: any, index: number) => (
                <StPostingContainer
                    key={item.postId}
                    style={{ background: randomColors[index] }}
                    onClick={() => navigate(`/detail/${item.postId}`)}
                >
                    <StProfileContainer>
                        <StProfile>
                            {item.userImage ? (
                                <img
                                    src={item.userImage}
                                    alt="프로필 이미지"
                                />
                            ) : (
                                <Profile style={{ width: "32px", height: "32px", borderRadius: "100px" }} />
                            )}
                            <StUserInfo>
                                <div>{item.nickname}</div>
                                <span>{displayedAt(item.createdAt)}</span>
                            </StUserInfo>
                        </StProfile>
                        <StCategory>{categories[item.category - 1]}</StCategory>
                    </StProfileContainer>
                    <StComment>{item.content}</StComment>
                    <StContentContainer>
                        <StIcons>
                            <LikeIcon style={{ width: "14px", height: "12px", marginRight: "2px" }} />
                            <span>{item.wishlistCount}</span>
                            <Icon style={{ margin: "0 10px" }} />
                            <MusicIcon style={{ width: "14px", height: "14px", marginRight: "2px" }} />
                            <span>+{item.songs.length}</span>
                        </StIcons>
                    </StContentContainer>
                </StPostingContainer>
            ))}
        </>
    );
};

export default RecommendedPosting;

const StPostingContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 126px;
    background: #7178ba;
    border-radius: 6px;
    padding: 14px;
    margin-bottom: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
`;

const StProfileContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StProfile = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: 8.5px;
    }
`;

const StUserInfo = styled.div`
    div {
        color: #fafafa;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
    }
    span {
        color: #dadada;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
    }
`;

const StCategory = styled.div`
    color: #fafafa;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    line-height: 100%;
`;

const StContentContainer = styled.div``;

const StIcons = styled.div`
    display: flex;
    align-items: center;
    span {
        color: #fafafa;
        font-size: 14px;
        font-weight: 600;
        line-height: 100%;
    }
`;

const StComment = styled.div`
    width: 80%;
    color: #fafafa;
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;
