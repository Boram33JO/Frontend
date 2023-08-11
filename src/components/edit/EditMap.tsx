import React, { useState, useEffect } from "react";
import Categories from "../edit/Categories";

declare global {
    interface Window {
        kakao: any;
    }
}

const EditMap: React.FC = () => {
    const [state, setState] = useState({
        center: { latitude: 37.566826, longitude: 126.9786567 },
        isPanto: true,
    });
    const [address, setAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [searchLocation, setSearchLocation] = useState<string>("");

    const placesSearchCB = function (data: any, status: any, pagination: any) {
        if (status === window.kakao.maps.services.Status.OK) {
            const newSearch = data[0];
            console.log("newSearch", newSearch);
            setAddress(newSearch.address_name);
            setPlaceName(newSearch.place_name);
            setState({
                center: { latitude: newSearch.y, longitude: newSearch.x },
                isPanto: true,
            });
        }
    };

    useEffect(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
            center: new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude),
            level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        if (state.isPanto) {
            map.panTo(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
        } else {
            map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
        }

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(searchLocation, placesSearchCB);
    }, [state, searchLocation]);

    const searchMap = () => {
        console.log("state", state);
        console.log("address", address);
        console.log("placeName", placeName);
        localStorage.setItem("latitude", String(state.center.latitude));
        localStorage.setItem("longitude", String(state.center.longitude));
        localStorage.setItem("address", address);
        localStorage.setItem("placeName", placeName);
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchLocation.trim().length === 0) {
            return alert("내용을 입력하세요");
        }
        setSearchLocation("");
        searchMap();
    };

    return (
        <>
            <form onSubmit={searchLocationHandler}>
                <img
                    src="https://img.freepik.com/premium-vector/search-icon-magnifying-glass-symbol-outline-icon_543062-139.jpg?w=2000"
                    alt="검색"
                    style={{ width: "24px", height: "24px" }}
                />
                <input
                    onChange={changeInputHandler}
                    value={searchLocation}
                />
            </form>
            <Categories />
            <div
                id="map"
                style={{ width: "350px", height: "288px" }}
            />
        </>
    );
};

export default EditMap;
