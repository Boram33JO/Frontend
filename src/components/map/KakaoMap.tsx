import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";

import styled from "styled-components";
import Category from "../common/Category";
// import ListItem from "../common/ListItem";
// import axios from "axios";

declare global {
    interface Window {
        kakao: any;
    }
}

const Kakao: React.FC = () => {
    const [state, setState] = useState({
        center: { lat: 37.566826, lng: 126.9786567 },
        isPanto: true,
    });
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [categoryNum, setCategoryNum] = useState<number>(0);

    useEffect(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
            center: new window.kakao.maps.LatLng(state.center.lat, state.center.lng), // 지도의 중심좌표
            level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude; // 위도
                const lng = position.coords.longitude; // 경도
                // console.log("lat", lat);
                // console.log("lng", lng);

                const locPosition = new window.kakao.maps.LatLng(lat, lng); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message, map);
                setLatitude(lat);
                setLongitude(lng);
                // console.log("lat", latitude);
                // console.log("lng", longitude);
            });
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
            const message = "geolocation을 사용할수 없어요..";

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message, map);
        }

        if (state.isPanto) {
            map.panTo(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
        } else {
            map.setCenter(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
        }
    }, []);

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places(); // 'window.' 추가
        const placesSearchCB = function (data: any, status: any, pagination: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                const newSearch = data[0];
                // console.log(newSearch);
                setState({
                    center: { lat: newSearch.y, lng: newSearch.x },
                    isPanto: true,
                });
            }
        };
        ps.keywordSearch(searchLocation, placesSearchCB); // 검색어 변경
    };

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition: any, message: string, map: any) {
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
        });

        const iwContent = message; // 인포윈도우에 표시할 내용
        const iwRemoveable = true;

        // 인포윈도우를 생성합니다
        const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
        });

        // 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
    }

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = () => {
        searchMap();
    };
    const category = categoryNum + 1;
    // console.log(category);

    // useEffect(() => {
    //     const searchLocation = async () => {
    //         try {
    //             const data = { latitude, longitude }; // Define your latitude and longitude values

    //             const response = await axios.post(`/api/posts/area`, data, {
    //                 headers: {
    //                     AccessToken:
    //                         "Bearer",
    //                     RefreshToken:
    //                         "Bearer",
    //                 },
    //             });

    //             console.log("Response:", response.data); // Print the response data
    //         } catch (error) {
    //             console.log("Error:", error);
    //         }
    //     };

    //     searchLocation(); // Call the async function immediately
    // }, []);

    return (
        <>
            <StContainer>
                <StSearchForm onSubmit={searchLocationHandler}>
                    <div>
                        <SearchIcon
                            style={{
                                width: "16px",
                                height: "16px",
                                marginLeft: "16px",
                                marginRight: "12px",
                            }}
                        />
                    </div>
                    <input
                        placeholder="장소를 입력해보세요"
                        onChange={changeInputHandler}
                        id="keyword"
                    />
                </StSearchForm>
                <Category
                    categoryNum={categoryNum}
                    setCategoryNum={setCategoryNum}
                />
                <StKakaoMap id="map" />
            </StContainer>
            <StLine />
            <StContainer>{/* <ListItem post={post: Post} /> */}</StContainer>
        </>
    );
};

export default Kakao;

const StSearchForm = styled.form`
    width: 346px;
    height: 40px;
    border: 1px solid #434047;
    background-color: #434047;
    border-radius: 999px;
    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 16px 0 20px 0;

    input {
        width: 270px;
        height: 16px;
        color: #fafafa;
        border: 1px solid #434047;
        background-color: #434047;
    }
    input:focus {
        outline: none;
    }
`;

const StLine = styled.div`
    width: 390px;
    height: 8px;
    background: #242325;
`;

const StContainer = styled.div`
    padding: 0 20px;
    width: 350px;
`;

const StKakaoMap = styled.div`
    width: 350px;
    height: 308px;
    border-radius: 10px;
    margin: 22px 0 97px 0;
`;
