import React, { useState } from "react";

import styled from "styled-components";

import SearchSong from "../components/edit/SearchSong";
import EditMap from "../components/edit/EditMap";
import ButtonComponent from "../components/edit/ButtonComponent";

import axios from "axios";
import FormArea from "../components/edit/FormArea";

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

const EditPage = () => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [inputForm, setInputForm] = useState<InputForm>({ postTitle: "", content: "" });
    const [chooseSongList, setChooseSongList] = useState<Array<ChooseSongListType>>([]);
    const [address, setAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [categoryNum, setCategoryNum] = useState<number>(1);
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

    // 클릭 시 슬라이드 번호 이동
    const NextButtonHandler = () => {
        if (slideIndex === 0) {
            goToSlide(slideIndex + 1);
        } else if (slideIndex === 2) {
            // 업로드
            // return alert("마지막");
            onClickPost();
        }
        goToSlide(slideIndex + 1);
    };

    const BeforeButtonHandler = () => {
        if (slideIndex === 0) {
            return;
        } else if (slideIndex === 2) {
            goToSlide(slideIndex - 1);
        }
        goToSlide(slideIndex - 1);
    };

    const onClickPost = async () => {
        try {
            const response = await axios.post(`http://43.201.22.74/api/posts`, data, {
                headers: {
                    AccessToken:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MTIzNEB0ZXN0LmNvbSIsImV4cCI6MTY5MjIwMTI1NiwiaWF0IjoxNjkyMTk3NjU2fQ.RLLqO8hHPa5EuroSqU1-3m_ph_WJDX7H4KZYMXUqIFg",
                    RefreshToken:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTIxOTc2NTYsInN1YiI6InRlc3QxMjM0QHRlc3QuY29tIiwiZXhwIjoxNjkzNDA3MjU2fQ.mm8Wmhq84PAlAaYVVgzqqmYHiguAhW8M_yXO1D8GifQ",
                },
            });
            console.log("성공", response);
        } catch (error) {
            console.log(error);
        }
    };

    // 슬라이드 이동
    const goToSlide = (index: number) => {
        setSlideIndex(index);
    };

    return (
        <>
            <StContainer>
                <StSlides style={{ transform: `translateX(-${slideIndex * 375}px)` }}>
                    {/* 1 */}
                    <StSlide>
                        <h1>어디로 설정할까요?</h1>
                        <EditMap
                            address={address}
                            placeName={placeName}
                            latitude={latitude}
                            longitude={longitude}
                            categoryNum={categoryNum} // Pass categoryNum prop
                            setAddress={setAddress}
                            setPlaceName={setPlaceName}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                            setCategoryNum={setCategoryNum} // Pass setCategoryNum prop
                        />
                    </StSlide>
                    {/* 2 */}
                    <StSlide>
                        <h1>어떤 음악을 추천할까요?</h1>
                        <SearchSong
                            chooseSongList={chooseSongList}
                            setChooseSongList={setChooseSongList}
                        />
                    </StSlide>
                    {/* 3 */}
                    <StSlide>
                        <h1>지금의 감성을 기록하세요.</h1>
                        <FormArea
                            inputForm={inputForm}
                            setInputForm={setInputForm}
                            chooseSongList={chooseSongList}
                            setChooseSongList={setChooseSongList}
                            categoryNum={categoryNum}
                            placeName={placeName}
                        />
                    </StSlide>
                </StSlides>
            </StContainer>
            <StButtons>
                <ButtonComponent
                    style={{
                        color: "#7D778A",
                        background: "#45424E",
                    }}
                    onClick={BeforeButtonHandler}
                    // disabled={slideIndex === 0}
                >
                    이전
                </ButtonComponent>
                {slideIndex === 2 ? (
                    <ButtonComponent
                        style={{
                            color: "#FAFAFA",
                            background: "linear-gradient(135deg, #8084f3 0%, #c48fed 100%)",
                        }}
                        onClick={onClickPost}
                    >
                        {slideIndex === 2 ? "완료" : "다음"}
                    </ButtonComponent>
                ) : (
                    <ButtonComponent
                        style={{
                            color: "#FAFAFA",
                            background: "linear-gradient(135deg, #8084f3 0%, #c48fed 100%)",
                        }}
                        onClick={NextButtonHandler}
                    >
                        {slideIndex === 2 ? "완료" : "다음"}
                    </ButtonComponent>
                )}
            </StButtons>
        </>
    );
};

export default EditPage;

const StContainer = styled.div`
    width: 350px;
    height: 549px;
    padding: 0 10px;
    margin-top: 47px;
    overflow: hidden;
`;

const StSlides = styled.div`
    display: flex;
    flex-direction: row;
    transition: transform 0.5s ease;
    min-width: 1120px;
    height: 500px;
`;

const StSlide = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 350px;
    height: 500px;
    h1 {
        font-size: 20px;
        color: #fafafa;
        margin-bottom: 16px;
    }
`;

const StButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px 126px 20px;
`;
