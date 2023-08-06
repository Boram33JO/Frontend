import React, { useState, useEffect } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

const EditMap: React.FC = () => {
    const [state, setState] = useState({
        center: { lat: 37.566826, lng: 126.9786567 },
        isPanto: true,
    });
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [markers, setMarkers] = useState<any[]>([]);

    useEffect(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
            center: new window.kakao.maps.LatLng(state.center.lat, state.center.lng), // 지도의 중심좌표
            level: 3,
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
        console.log(ps);
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

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = () => {
        searchMap();
    };

    return (
        <>
            <div
                id="map"
                style={{ width: "350px", height: "288px" }}
            />
            <input
                onChange={changeInputHandler}
                value={searchLocation}
            />
            <button onClick={searchLocationHandler}>검색</button>

            <div>
                <ul>
                    <li>
                        
                    </li>
                </ul>
            </div>
        </>
    );
};

export default EditMap;
