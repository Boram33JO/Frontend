// import React, { useState, useEffect } from "react";
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
//     const [state, setState] = useState({
//         center: { latitude: "37.566826", longitude: "126.9786567" },
//         isPanto: true,
//     });
//     const [searchLocation, setSearchLocation] = useState<string>("");
//     const [markers, setMarkers] = useState("");

//     useEffect(() => {
//         const mapContainer = document.getElementById("map"), // 지도를 표시할 div
//             mapOption = {
//                 center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//                 level: 3, // 지도의 확대 레벨
//             };

//         // 지도를 생성합니다
//         const map = new window.kakao.maps.Map(mapContainer, mapOption);

//         if (state.isPanto) {
//             map.panTo(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
//         } else {
//             map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
//         }
//     }, []);
//     const searchMap = () => {
//         const ps = new window.kakao.maps.services.Places();
//         const placesSearchCB = function (data: any, status: any, pagination: any) {
//             if (status === window.kakao.maps.services.Status.OK) {
//                 const newSearch = data;
//                 console.log(newSearch);
//                 const center = { latitude: newSearch.y, longitude: newSearch.x };
//                 setState({
//                     center: center,
//                     isPanto: true,
//                 });
//                 displayMarker(new window.kakao.maps.LatLng(center.latitude, center.longitude), newSearch.place_name);
//             }
//         };
//         ps.keywordSearch(searchLocation, placesSearchCB);
//     };

//     console.log(state);

//     // 지도에 마커와 인포윈도우를 표시하는 함수입니다
//     function displayMarker(locPosition: any, title: string) {
//         const mapContainer = document.getElementById("map");
//         const mapOption = {
//             center: locPosition,
//             level: 3,
//         };

//         const map = new window.kakao.maps.Map(mapContainer, mapOption);

//         const marker = new window.kakao.maps.Marker({
//             map: map,
//             position: locPosition,
//         });

//         const infowindow = new window.kakao.maps.InfoWindow({
//             content: title,
//             removable: true,
//         });

//         infowindow.open(map, marker);
//     }

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

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Category from "../common/Category";

declare global {
    interface Window {
        kakao: any;
    }
}

interface Place {
    x: string;
    y: string;
    place_name: string;
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
    setCategoryNum: React.Dispatch<React.SetStateAction<number>>;
}

const EditMap: React.FC<EditMapProps> = ({
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
    const [markers, setMarkers] = useState<any[]>([]);
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [map, setMap] = useState<any>(null);
    const [ps, setPs] = useState<any>(null);
    const [infowindow, setInfowindow] = useState<any>(null);

    useEffect(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
            level: 3,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(newMap);
        setPs(new window.kakao.maps.services.Places());
        setInfowindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
    }, []);

    const searchPlaces = () => {
        const keyword = searchLocation.trim();
        if (!keyword) {
            alert("키워드를 입력해주세요!");
            return;
        }

        ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data: Place[], status: string, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
            displayPagination(pagination);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
        }
    };

    const displayPlaces = (places: any[]) => {
        const placesList = document.getElementById("placesList");

        if (placesList) {
            removeAllChildNodes(placesList);
            removeMarkers();

            const bounds = new window.kakao.maps.LatLngBounds();

            places.forEach((place, index) => {
                const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
                const marker = addMarker(placePosition, index, place.place_name);
                const itemEl = getListItem(index, place);

                bounds.extend(placePosition);

                placesList.appendChild(itemEl);
            });

            map.setBounds(bounds);
        }
    };

    const addMarker = (position: any, idx: number, title: string) => {
        const markerImage = new window.kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
            new window.kakao.maps.Size(36, 37),
            {
                spriteSize: new window.kakao.maps.Size(36, 691),
                spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
                offset: new window.kakao.maps.Point(13, 37),
            }
        );

        const marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
        });

        marker.setMap(map);
        markers.push(marker);

        return marker;
    };

    const removeMarkers = () => {
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        setMarkers([]);
    };

    const displayPagination = (pagination: any) => {
        const paginationEl = document.getElementById("pagination");
        if (paginationEl) {
            removeAllChildNodes(paginationEl);
        }

        for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement("a");
            el.href = "#";
            el.innerHTML = i.toString();

            if (i === pagination.current) {
                el.className = "on";
            } else {
                el.onclick = () => {
                    pagination.gotoPage(i);
                };
            }

            paginationEl?.appendChild(el);
        }
    };

    const getListItem = (index: number, place: Place): HTMLLIElement => {
        const el = document.createElement("li");
        const itemStr = `<h5>${place.place_name}</h5>
          `;
        el.innerHTML = itemStr;
        // el.className = "item";
        console.log("dddd", el.innerHTML);

        return el;
    };

    const removeAllChildNodes = (parent: HTMLElement | null) => {
        if (parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = (event: React.FormEvent) => {
        event.preventDefault();
        searchPlaces();
    };

    return (
        <StMapContainer>
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
                    value={searchLocation}
                    id="keyword"
                />
            </StSearchForm>
            <StCategory>
                <Category
                    categoryNum={categoryNum}
                    setCategoryNum={setCategoryNum}
                />
            </StCategory>
            <StKakaoMap id="map" />
            <StLocationLists>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </StLocationLists>
        </StMapContainer>
    );
};

export default EditMap;

const StMapContainer = styled.div`
    height: 548px;
`;

const StKakaoMap = styled.div`
    width: 347px;
    height: 308px;
    border-radius: 10px;
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
        color: #fafafa;
        border: 1px solid #434047;
        background-color: #434047;
    }
    input:focus {
        outline: none;
        /* background-color: #434047; */
    }
`;

const StCategory = styled.div`
    margin: 16px 0 22px 0;
`;

const StLocationLists = styled.div`
    width: 345px;
    /*  */
    height: 100px;
    border: 1px solid #fff;
    background-color: #fff;
    padding-top: 10px;
`;

// const StMarker = styled.div`
//     width: 100px;
//     height: 100px;
//     border-radius: 100%;
// `;
