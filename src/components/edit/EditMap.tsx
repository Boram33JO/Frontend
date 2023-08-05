import React, { useState, useEffect } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

const Kakao: React.FC = () => {
    const [state, setState] = useState({
        // 위도(latitude) = y와 경도(longitude) = x
        center: { lat: 37.566826, lng: 126.9786567 },
        isPanto: true,
    });
    const [searchLocation, setSearchLocation] = useState<string>("");

    useEffect(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
            center: new window.kakao.maps.LatLng(state.center.lat, state.center.lng), // 지도의 중심좌표
            level: 4,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        if (state.isPanto) {
            map.panTo(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
        } else {
            map.setCenter(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
        }
    }, [state]);

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places(); // 'window.' 추가
        const placesSearchCB = function (data: any, status: any, pagination: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                const newSearch = data;
                console.log(newSearch);
                setState({
                    center: { lat: newSearch.y, lng: newSearch.x },
                    isPanto: true,
                });
            }
        };
        ps.keywordSearch(searchLocation, placesSearchCB); // 검색어 변경
    };

    // // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    // function displayMarker(locPosition: any, message: string, map: any) {
    //     // 마커를 생성합니다
    //     const marker = new window.kakao.maps.Marker({
    //         map: map,
    //         position: locPosition,
    //     });

    //     const iwContent = message; // 인포윈도우에 표시할 내용
    //     const iwRemoveable = true;

    //     // 인포윈도우를 생성합니다
    //     const infowindow = new window.kakao.maps.InfoWindow({
    //         content: iwContent,
    //         removable: iwRemoveable,
    //     });

    //     // 인포윈도우를 마커위에 표시합니다
    //     infowindow.open(map, marker);

    //     // 지도 중심좌표를 접속위치로 변경합니다
    //     map.setCenter(locPosition);
    // }

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchMap();
    };

    return (
        <>
            <form onSubmit={searchLocationHandler}>
                <input
                    onChange={changeInputHandler}
                    value={searchLocation}
                />
                <button>검색</button>
            </form>
            <div
                id="map"
                style={{ width: "350px", height: "288px" }}
            />
        </>
    );
};

export default Kakao;
