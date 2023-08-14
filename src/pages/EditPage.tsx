import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const EditPage = () => {
    const [inputForm, setInputForm] = useState<InputForm>({ postTitle: "", content: "" });
    const [slideIndex, setSlideIndex] = useState<number>(0);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     // 뒤로가기 이벤트 감지 시 슬라이드 이동
    //     const handlePopstate = () => {
    //         if (slideIndex > 0) {
    //             goToSlide(slideIndex - 1);
    //         } else {
    //             navigate("/"); // 더 이상 뒤로 갈 슬라이드가 없으면 홈으로 이동
    //         }
    //     };

    //     window.addEventListener("popstate", handlePopstate);

    //     return () => {
    //         window.removeEventListener("popstate", handlePopstate);
    //     };
    // }, [slideIndex, navigate]);

    // 클릭 시 슬라이드 번호 이동
    const onClickNextButtonHandler = () => {
        if (slideIndex === 0) {
            goToSlide(slideIndex + 1);
        } else if (slideIndex === 2) {
            // 업로드
            return alert("마지막");
        }
        goToSlide(slideIndex + 1);
    };

    const onClickBeforeButtonHandler = () => {
        if (slideIndex === 0) {
            return;
        } else if (slideIndex === 2) {
            goToSlide(slideIndex - 1);
        }
        goToSlide(slideIndex - 1);
    };

    // // 슬라이드 이동
    // const goToSlide = (index: number) => {
    //     setSlideIndex(index);
    //     // 슬라이드 이동 시 페이지 히스토리에 상태 저장
    //     window.history.pushState(null, "", `?slide=${index}`);
    // };

    // 슬라이드 이동
    const goToSlide = (index: number) => {
        setSlideIndex(index);
    };

    return (
        <>
            <StContainer>
                <StSlides>
                    {slideIndex === 0 && (
                        <>
                            <h1>어디로 설정할까요?</h1>
                            <EditMap />
                        </>
                    )}
                    {slideIndex === 1 && (
                        <>
                            <h1>어떤 음악을 추천할까요?</h1>

                            <SearchSong />
                        </>
                    )}
                    {slideIndex === 2 && (
                        <>
                            <h1>지금의 감성을 기록하세요.</h1>

                            <FormArea
                                inputForm={inputForm}
                                setInputForm={setInputForm}
                            />
                        </>
                    )}
                </StSlides>
                <StButtons>
                    <ButtonComponent
                        onClick={onClickBeforeButtonHandler}
                        // disabled={slideIndex === 0}
                    >
                        이전
                    </ButtonComponent>
                    <ButtonComponent onClick={onClickNextButtonHandler}>{slideIndex === 2 ? "완료" : "다음"}</ButtonComponent>
                </StButtons>
            </StContainer>
        </>
    );
};

export default EditPage;

const StContainer = styled.div`
    width: 350px;
    height: 709px;
    padding: 20px;
    margin-top: 47px;
    overflow: hidden;
    /* div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        justify-content: space-between;
    } */

    h1 {
        font-size: 20px;
        color: #fafafa;
    }
`;

const StSlides = styled.div`
    /* display: flex; // 이 부분이 추가된 부분입니다. */
    transition: transform 0.5s ease;
    /* width: 100%; // 추가: 내용을 가로로 나열하기 위해 width를 100%로 설정 */
    height: 579px;
`;

const StButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

// style={{ transform: `translateX(-${slideIndex * 0}px)` }}

// const StFormArea = styled.div`
//     width: 350px;
//     height: 222px;
//     border: 1px solid #434047;
//     background-color: #434047;
//     border-radius: 6px;
//     /* div{
//         display: flex;
//     } */

//     input {
//         width: 345px;
//         height: 26px;
//         border: none;
//         border: 1px solid #434047;
//         background-color: #434047;
//         color: #d9d8df;
//     }
//     input:focus {
//         outline: none;
//     }
//     textarea {
//         width: 345px;
//         height: 150px;
//         border: none;
//         resize: none;
//         border: 1px solid #434047;
//         background-color: #434047;
//         color: #d9d8df;
//     }
//     textarea:focus {
//         outline: none;
//     }
// `;

// const onClickUpload = async () => {
//     try {
//         const data = {
//             latitude: localStorage.getItem("latitude"),
//             longitude: localStorage.getItem("longitude"),
//             address: localStorage.getItem("address"),
//             songs: localStorage.getItem("songs"),
//             category: localStorage.getItem("category"),
//             content: localStorage.getItem("content"),
//             postTitle: localStorage.getItem("postTitle"),
//             placeName: localStorage.getItem("placeName"),
//         };
//         console.log("data", data);
//         const response = await axios.post("http://43.201.22.74/api/posts", data);
//         console.log("성공:", response);
//         alert("업로드 완료");
//     } catch (error) {
//         alert("게시물 업로드 중에 오류가 발생했습니다.");
//         console.error("에러:", error);
//     } finally {
//         setInputForm({ postTitle: "", content: "" });
//         localStorage.removeItem("latitude");
//         localStorage.removeItem("longitude");
//         localStorage.removeItem("address");
//         localStorage.removeItem("songs");
//         localStorage.removeItem("category");
//         localStorage.removeItem("content");
//         localStorage.removeItem("postTitle");
//         localStorage.removeItem("placeName");
//     }
// };

// import React, { useState } from "react";
// import styled from "styled-components";

// import SearchSong from "../components/edit/SearchSong";
// import EditMap from "../components/edit/EditMap";
// import FormArea from "../components/edit/FormArea";
// import ButtonComponent from "../components/edit/ButtonComponent";

// const StContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 100%;
//     overflow: hidden;
// `;

// const StSlides = styled.div`
//     display: flex;
//     width: 100%;
//     transition: transform 0.5s ease-in-out;
// `;

// const StSlide = styled.div`
//     width: 100%;
//     flex-shrink: 0;
// `;

// interface InputForm {
//     postTitle: string;
//     content: string;
// }

// const EditPage = () => {
//     const [slideIndex, setSlideIndex] = useState(0);
//     const [inputForm, setInputForm] = useState<InputForm>({ postTitle: "", content: "" });

//     const slides = [
//         <EditMap />,
//         <SearchSong />,
//         <FormArea
//             inputForm={inputForm}
//             setInputForm={setInputForm}
//             // slideIndex={slideIndex}
//         />,
//     ];

//     const onClickNextButtonHandler = () => {
//         if (slideIndex < slides.length - 1) {
//             goToSlide(slideIndex + 1);
//         }
//     };

//     const onClickBeforeButtonHandler = () => {
//         if (slideIndex > 0) {
//             goToSlide(slideIndex - 1);
//         }
//     };

//     const goToSlide = (index: any) => {
//         setSlideIndex(index);
//     };

//     return (
//         <>
//             <StContainer>
//                 <StSlides
//                     style={{
//                         transform: `translateX(-${slideIndex * 95}%)`,
//                         // display: "flex",
//                     }}
//                 >
//                     {slides.map((slide, index) => (
//                         <StSlide key={index}>{slide}</StSlide>
//                     ))}
//                 </StSlides>
//                 <ButtonComponent
//                     onClick={onClickBeforeButtonHandler}
//                     // disabled={slideIndex === 0}
//                 >
//                     이전
//                 </ButtonComponent>
//                 <ButtonComponent
//                     onClick={onClickNextButtonHandler}
//                     // disabled={slideIndex === slides.length - 1}
//                 >
//                     {slideIndex === slides.length - 1 ? "완료" : "다음"}
//                 </ButtonComponent>
//             </StContainer>
//         </>
//     );
// };

// export default EditPage;

// const EditPage = () => {
//     // const navigate = useNavigate();
//     // const params = useParams();
//     // const pageNum = params.pageId;

//     const [inputForm, setInputForm] = useState<InputForm>({ postTitle: "", content: "" });
//     // const [chooseSongList, setChooseSongList] = useState<Array<ChooseSongListType>>([]);
//     const [slideIndex, setSlideIndex] = useState<number>(0);

//     console.log("나난", inputForm);

//     // useNavigate
//     // const navigate = useNavigate();

//     // useEffect(() => {
//     //     // 뒤로가기 이벤트 감지 시 슬라이드 이동
//     //     const handlePopstate = () => {
//     //         if (slideIndex > 0) {
//     //             goToSlide(slideIndex - 1);
//     //         } else {
//     //             navigate("/"); // 더 이상 뒤로 갈 슬라이드가 없으면 홈으로 이동
//     //         }
//     //     };

//     //     window.addEventListener("popstate", handlePopstate);

//     //     return () => {
//     //         window.removeEventListener("popstate", handlePopstate);
//     //     };
//     // }, [slideIndex, navigate]);

//     // 클릭 시 슬라이드 번호 이동
//     const onClickNextButtonHandler = () => {
//         if (slideIndex === 0) {
//             goToSlide(slideIndex + 1);
//         } else {
//             if (slideIndex === 2) {
//                 // 업로드
//             }
//             goToSlide(slideIndex + 1);
//         }
//     };

//     const onClickBeforeButtonHandler = () => {
//         if (slideIndex === 0) {
//             return;
//         } else {
//             if (slideIndex === 2) {
//                 goToSlide(slideIndex - 1);
//             }
//             goToSlide(slideIndex - 1);
//         }
//     };

// const EditMap = () => <StSlide>Slide 1 Content</StSlide>;
// const SearchSong = () => <StSlide>Slide 2 Content</StSlide>;
// const FormArea = () => <StSlide>Slide 3 Content</StSlide>;

// {/* <StSlides style={{ transform: `translateX(-${slideIndex * 390}px)` }}>
//                     {/* <h1>어디로 설정할까요?</h1> */}
//                     <EditMap
//                         slideIndex={slideIndex}
//                         // onClickNextButtonHandler={onClickNextButtonHandler}
//                         // onClickBeforeButtonHandler={onClickBeforeButtonHandler}
//                     />

//                 </StSlides>
//                 <StSlides>
//                     {/* <h1>어떤 음악을 추천할까요?</h1> */}
//                     <SearchSong
//                         // chooseSongList={chooseSongList}
//                         // setChooseSongList={setChooseSongList}
//                         slideIndex={slideIndex}
//                         // onClickNextButtonHandler={onClickNextButtonHandler}
//                         // onClickBeforeButtonHandler={onClickBeforeButtonHandler}
//                     />
//                 </StSlides>
//                 <StSlides>
//                     {/* <h1>지금의 감성을 기록하세요.</h1> */}
//                     <FormArea
//                         inputForm={inputForm}
//                         setInputForm={setInputForm}
//                         slideIndex={slideIndex}
//                         // onClickNextButtonHandler={onClickNextButtonHandler}
//                         // onClickBeforeButtonHandler={onClickBeforeButtonHandler}
//                     />
//                 </StSlides>
