// import React, { useState } from "react";

// import styled from "styled-components";
// import { ReactComponent as Search } from "../../assets/images/search.svg";
// import Category from "../common/Category";

// declare global {
//     interface Window {
//         kakao: any;
//     }
// }

// interface EditMapProps {
//     address: string;
//     placeName: string;
//     latitude: string;
//     longitude: string;
//     categoryNum: number;

//     setAddress: (address: string) => void;
//     setPlaceName: (placeName: string) => void;
//     setLatitude: (latitude: string) => void;
//     setLongitude: (longitude: string) => void;
//     setCategoryNum: React.Dispatch<React.SetStateAction<number>>; // Update the type here
// }

// const EditMap: React.FC<EditMapProps> = ({
//     address,
//     placeName,
//     latitude,
//     longitude,
//     categoryNum,
//     setAddress,
//     setPlaceName,
//     setLatitude,
//     setLongitude,
//     setCategoryNum,
// }) => {
//     const [searchLocation, setSearchLocation] = useState<string>("");

//     const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchLocation(event.target.value);
//     };

//     const searchLocationHandler = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         // searchLocation("");
//         console.log("wow");
//     };
//     return (
//         <>
//             <StSearchForm onSubmit={searchLocationHandler}>
//                 <div>
//                     <Search style={{ width: "16px", height: "16px", marginLeft: "16px", marginRight: "12px" }} />
//                 </div>
//                 <input
//                     placeholder="장소를 입력해보세요"
//                     onChange={changeInputHandler}
//                     value={searchLocation}
//                 />
//             </StSearchForm>
//             <StCategory>
//                 <Category
//                     categoryNum={categoryNum}
//                     setCategoryNum={setCategoryNum}
//                 />
//             </StCategory>
//             <div
//                 id="map"
//                 style={{ width: "350px", height: "288px" }}
//             />
//         </>
//     );
// };

// export default EditMap;

// const StSearchForm = styled.form`
//     width: 346px;
//     height: 40px;
//     border: 1px solid #434047;
//     background-color: #434047;
//     border-radius: 999px;

//     display: flex;
//     flex-direction: row;
//     align-items: center;

//     input {
//         width: 270px;
//         height: 16px;
//         border: 1px solid #434047;
//         background-color: #434047;
//     }
//     input:focus {
//         outline: none;
//     }
// `;

// const StCategory = styled.div`
//     margin: 16px 0 22px 0;
// `;

// import React, { useState, useEffect } from "react";
// import Categories from "../edit/Categories";

// declare global {
//     interface Window {
//         kakao: any;
//     }
// }

// interface EditMapProps {
//     address: string;
//     placeName: string;
//     latitude: string;
//     longitude: string;
//     categoryNum: number;

//     setAddress: (address: string) => void;
//     setPlaceName: (placeName: string) => void;
//     setLatitude: (latitude: string) => void;
//     setLongitude: (longitude: string) => void;
//     setCategoryNum: React.Dispatch<React.SetStateAction<number>>; // Update the type here
// }

// const EditMap: React.FC<EditMapProps> = ({
//     address,
//     placeName,
//     latitude,
//     longitude,
//     categoryNum,
//     setAddress,
//     setPlaceName,
//     setLatitude,
//     setLongitude,
//     setCategoryNum,
// }) => {
//     const [state, setState] = useState({
//         center: { latitude: 37.566826, longitude: 126.9786567 },
//         isPanto: true,
//     });

//     const [searchLocation, setSearchLocation] = useState<string>("");

//     const placesSearchCB = function (data: any, status: any, pagination: any) {
//         if (status === window.kakao.maps.services.Status.OK) {
//             const newSearch = data[0];
//             console.log("newSearch", newSearch);
//             setAddress(newSearch.address_name);
//             setPlaceName(newSearch.place_name);
//             setState({
//                 center: { latitude: newSearch.y, longitude: newSearch.x },
//                 isPanto: true,
//             });
//         }
//     };

//     useEffect(() => {
//         const mapContainer = document.getElementById("map");
//         const mapOption = {
//             center: new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude),
//             level: 3,
//         };

//         const map = new window.kakao.maps.Map(mapContainer, mapOption);

//         if (state.isPanto) {
//             map.panTo(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
//         } else {
//             map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
//         }

//         const ps = new window.kakao.maps.services.Places();
//         ps.keywordSearch(searchLocation, placesSearchCB);
//     }, [state, searchLocation]);

//     const searchMap = () => {
//         console.log("state", state);
//         console.log("address", address);
//         console.log("placeName", placeName);
//         localStorage.setItem("latitude", String(state.center.latitude));
//         localStorage.setItem("longitude", String(state.center.longitude));
//         localStorage.setItem("address", address);
//         localStorage.setItem("placeName", placeName);
//     };

//     const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchLocation(event.target.value);
//     };

//     const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if (searchLocation.trim().length === 0) {
//             return alert("내용을 입력하세요");
//         }
//         setSearchLocation("");
//         searchMap();
//     };

//     return (
//         <>
//             <form onSubmit={searchLocationHandler}>
//                 <img
//                     src="https://img.freepik.com/premium-vector/search-icon-magnifying-glass-symbol-outline-icon_543062-139.jpg?w=2000"
//                     alt="검색"
//                     style={{ width: "24px", height: "24px" }}
//                 />
//                 <input
//                     onChange={changeInputHandler}
//                     value={searchLocation}
//                 />
//             </form>
//             {/* <Categories /> */}
//             <div
//                 id="map"
//                 style={{ width: "350px", height: "288px" }}
//             />
//         </>
//     );
// };

// export default EditMap;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import Category from "../common/Category";

declare global {
    interface Window {
        kakao: any;
    }
}

interface EditMapProps {
    address: string;
    placeName: string;
    latitude: string;
    longitude: string;
    categoryNum: number;

    setAddress: (address: string) => void;
    setPlaceName: (placeName: string) => void;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setCategoryNum: React.Dispatch<React.SetStateAction<number>>; // Update the type here
}

const Kakao: React.FC<EditMapProps> = ({
    address,
    placeName,
    latitude,
    longitude,
    categoryNum,
    setAddress,
    setPlaceName,
    setLatitude,
    setLongitude,
    setCategoryNum,
}) => {
    const [state, setState] = useState({
        center: { lat: 37.566826, lng: 126.9786567 },
        isPanto: true,
    });
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [marker, setMarker] = useState([]);

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

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchMap();
    };

    return (
        <>
            <StSearchForm onSubmit={searchLocationHandler}>
                <div>
                    <Search style={{ width: "16px", height: "16px", marginLeft: "16px", marginRight: "12px" }} />
                </div>
                <input
                    placeholder="장소를 입력해보세요"
                    onChange={changeInputHandler}
                    value={searchLocation}
                />
            </StSearchForm>
            <StCategory>
                <Category
                    categoryNum={categoryNum}
                    setCategoryNum={setCategoryNum}
                />
            </StCategory>
            <StKakaoMap id="map" />
            <StMarker id="marker" />
        </>
    );
};

export default Kakao;

const StKakaoMap = styled.div`
    width: 347px;
    height: 308px;
    border-radius: 10px;
    /* z-index: auto; */
`;

const StSearchForm = styled.form`
    width: 346px;
    height: 40px;
    border: 1px solid #434047;
    background-color: #434047;
    border-radius: 999px;
    display: flex;
    flex-direction: row;
    align-items: center;
    input {
        width: 270px;
        height: 16px;
        border: 1px solid #434047;
        background-color: #434047;
    }
    input:focus {
        outline: none;
    }
`;

const StCategory = styled.div`
    margin: 16px 0 22px 0;
`;

const StMarker = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100%;
`;
