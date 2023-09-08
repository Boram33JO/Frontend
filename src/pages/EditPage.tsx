import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchSong from "../components/edit/SearchSong";
import EditMap from "../components/edit/EditMap";
import FormArea from "../components/edit/FormArea";
import { postData, putData } from "../api/edit";
import { getDetailedPost } from "../api/post";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config/configStore";

interface InputForm {
    postTitle: string;
    content: string;
}

interface ChooseSongListType {
    album: string;
    artistName: string;
    audioUrl: string;
    externalUrl: string;
    songNum: string;
    songTitle: string;
    thumbnail: string;
}

interface Song {
    songNum: string;
    artistName: string;
    songTitle: string;
    album: string;
    thumbnail: string;
    externalUrl: string;
    audioUrl: string;
}

interface IsData {
    latitude: number;
    longitude: number;
    address: string;
    songs: Song[];
    category: number;
    content: string;
    postTitle: string;
    placeName: string;
}

const EditPage = () => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [inputForm, setInputForm] = useState<InputForm>({ postTitle: "", content: "" });
    const [chooseSongList, setChooseSongList] = useState<Array<ChooseSongListType>>([]);
    const [address, setAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [latitude, setLatitude] = useState("37.566826");
    const [longitude, setLongitude] = useState("126.9786567");
    const [categoryNum, setCategoryNum] = useState<any>();
    const loginUser = useSelector((state: RootState) => state.user);
    const { postId } = useParams<{ postId: string }>();

    const [isData, setIsData] = useState<IsData | null>(null);

    const category = categoryNum + 1;

    const data = {
        latitude,
        longitude,
        address,
        songs: chooseSongList,
        category: category,
        content: inputForm.content,
        postTitle: inputForm.postTitle,
        placeName,
    };

    const navigate = useNavigate();

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            scrollRef.current.scrollTop = clientHeight - scrollHeight;
        }
    };

    useEffect(() => {
        const fixPostData = async () => {
            const response = await getDetailedPost(postId);
            if (response.data.userId !== loginUser.userId) {
                navigate("/");
                return toast.error("잘못된 접근입니다.");
            }
            setIsData(response.data);
        };

        if (postId) {
            fixPostData();
        }
    }, [postId]);

    const getErrorMessage = () => {
        if (slideIndex === 0 && !address) {
            return "주소를 입력해주세요.";
        }
        if (slideIndex === 0 && !category) {
            return "카테고리를 선택해주세요.";
        }

        if (slideIndex === 1 && chooseSongList.length === 0) {
            return "노래를 선택해주세요.";
        }

        return null;
    };

    const NextButtonHandler = () => {
        const errorMessage = getErrorMessage();

        if (errorMessage) {
            toast.error(errorMessage);
        } else {
            if (slideIndex === 2) {
                scrollToTop();
            }
            goToSlide(slideIndex + 1);
        }
    };

    const BeforeButtonHandler = () => {
        if (slideIndex === 0) {
            return;
        } else if (slideIndex === 2) {
            goToSlide(slideIndex - 1);
            scrollToTop();
        }
        goToSlide(slideIndex - 1);
    };

    const postMutation = useMutation((data: any) => postData(data), {
        onSuccess: (response) => {
            const postId = response.data.data.postId;
            toast.success("게시물이 등록되었습니다");
            navigate(`/detail/${postId}`);
        },
        onError: () => {
            toast.error("게시물 등록에 실패하였습니다");
        },
    });

    const updateMutation = useMutation((data: any) => putData(data, postId), {
        onSuccess: () => {
            toast.success("게시물이 수정이 완료되었습니다");
            navigate(`/detail/${postId}`);
        },
        onError: () => {
            toast.error("게시물 수정에 실패하였습니다");
        },
    });

    const onClickPost = async () => {
        if (data.songs?.length === 0) return toast.error("노래를 선택해주세요.");
        if (inputForm.postTitle.length === 0) return toast.error("제목은 필수입니다.");
        if (inputForm.content.length === 0) return toast.error("내용은 필수입니다.");
        if (inputForm.postTitle.length > 20) return toast.error("제목은 20자 이하여야 합니다.");
        if (inputForm.content.length > 500) return toast.error("내용은 500자 이하여야 합니다.");
        if (!isData) {
            postMutation.mutate(data);
        } else {
            updateMutation.mutate(data);
        }
    };

    // 슬라이드 이동
    const goToSlide = (index: number) => {
        setSlideIndex(index);
    };

    return (
        <StContainer ref={scrollToTop}>
            <StInnerContainer>
                <StSlideContainer>
                    <StSlides style={{ transform: `translateX(-${slideIndex}00%)` }}>
                        {/* 1 */}
                        <StSlide $position={"0%"}>
                            <h1>어디로 설정할까요?</h1>
                            <EditMap
                                address={address}
                                placeName={placeName}
                                latitude={latitude}
                                longitude={longitude}
                                categoryNum={categoryNum}
                                isData={isData}
                                setAddress={setAddress}
                                setPlaceName={setPlaceName}
                                setLatitude={setLatitude}
                                setLongitude={setLongitude}
                                setCategoryNum={setCategoryNum}
                                setIsData={setIsData}
                            />
                        </StSlide>
                        {/* 2 */}
                        <StSlide $position={"100%"}>
                            <h1>어떤 음악을 추천할까요?</h1>
                            <SearchSong
                                chooseSongList={chooseSongList}
                                setChooseSongList={setChooseSongList}
                                isData={isData}
                                setIsData={setIsData}
                            />
                        </StSlide>
                        {/* 3 */}
                        <StSlide $position={"200%"}>
                            <h1>지금의 감성을 기록하세요.</h1>
                            <FormArea
                                inputForm={inputForm}
                                setInputForm={setInputForm}
                                chooseSongList={chooseSongList}
                                setChooseSongList={setChooseSongList}
                                categoryNum={categoryNum}
                                placeName={placeName}
                                isData={isData}
                                setIsData={setIsData}
                            />
                        </StSlide>
                    </StSlides>
                </StSlideContainer>
            </StInnerContainer>
            <StButtonContainer>
                <StButton
                    $next={false}
                    onClick={BeforeButtonHandler}
                >
                    이전
                </StButton>
                <StButton
                    $next={true}
                    onClick={slideIndex === 2 ? onClickPost : NextButtonHandler}
                >
                    {slideIndex === 2 ? "완료" : "다음"}
                </StButton>
            </StButtonContainer>
        </StContainer>
    );
};

export default EditPage;

const StContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
`;

const StInnerContainer = styled.div`
    width: 100%;
    overflow: hidden;
`;

const StSlideContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const StSlides = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 160%;
    transition: transform 0.5s ease;
`;

const StSlide = styled.div<{ $position: string }>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: ${(props) => props.$position};
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    h1 {
        font-size: 20px;
        color: #fafafa;
        margin-bottom: 16px;
        padding: 0 10px;
    }
`;

const StButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 14px;
    padding: 0 10px;
`;

const StButton = styled.button<{ $next: boolean }>`
    width: 100%;
    height: 44px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: ${({ $next }) => ($next ? "#FAFAFA" : "#7D778A")};
    background: ${({ $next }) => ($next ? "linear-gradient(135deg, #8084f3 0%, #c48fed 100%)" : "#45424E")};
`;
