import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Category from "../common/Category";
import pinIcon from "../../assets/images/icon_pin_3x.png";
import SearchModal from "./SearchModal";

declare global {
    interface Window {
        kakao: any;
    }
}

interface Place {
    x: string;
    y: string;
    place_name: string;
    address_name: string;
}

interface EditMapProps {
    address: string;
    placeName: string;
    latitude: string;
    longitude: string;
    categoryNum: number;
    isData: any;

    setAddress: (address: string) => void;
    setPlaceName: (placeName: string) => void;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setCategoryNum: React.Dispatch<React.SetStateAction<number>>;
    setIsData: any;
}

const EditMap: React.FC<EditMapProps> = ({
    address,
    placeName,
    latitude,
    longitude,
    categoryNum,
    isData,
    setAddress,
    setPlaceName,
    setLatitude,
    setLongitude,
    setCategoryNum,
    setIsData,
}) => {
    const [state, setState] = useState({
        center: { latitude, longitude },
        isPanto: true,
    });
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchLocationList, setSearchLocationList] = useState<any>([]);
    const [modal, setModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_REST_API_KEY}&libraries=services&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(function () {
                const mapContainer = document.getElementById("map"); // 지도를 표시할 div
                const mapOption = {
                    center: new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude), // 지도의 중심좌표
                    level: 3,
                };

                //     // 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
                // function setZoomable(zoomable: any) {
                //     // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
                //     map.setZoomable(zoomable);

                // // 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
                // function setDraggable(draggable: any) {
                //     // 마우스 드래그로 지도 이동 가능여부를 설정합니다
                //     map.setDraggable(draggable);
                // }

                const map = new window.kakao.maps.Map(mapContainer, mapOption);

                if (state.isPanto) {
                    map.panTo(new window.kakao.maps.LatLng(latitude, longitude));
                } else {
                    map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
                }

                // const imageSrc = pinIcon;
                const imageSize = new window.kakao.maps.Size(36, 42);
                const markerImage = new window.kakao.maps.MarkerImage(pinIcon, imageSize);

                // Create a marker for the map
                const markerPosition = new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage,
                });

                marker.setMap(map); // Add the marker to the map
            });
        };
    }, [state, latitude, longitude]);

    console.log("lat,lng", latitude, longitude);

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places();
        const placesSearchCB = function (data: any, status: any, pagination: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                setSearchLocationList(data);

                // setAddress(newSearch.address_name);
                // setPlaceName(newSearch.place_name);
                // setLatitude(newSearch.y);
                // setLongitude(newSearch.x);
                // setState({
                //     center: { latitude: newSearch.y, longitude: newSearch.x },
                //     isPanto: true,
                // });
            }
        };
        ps.keywordSearch(searchLocation, placesSearchCB);
        // console.log("state before setState", state);
    };

    console.log("1234", searchLocationList);

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchLocation.trim().length === 0) {
            return alert("내용을 입력하세요");
        }
        setModal(true);
        // setSearchLocation("");
        searchMap();
    };

    // console.log(isData);
    if (isData) {
        setAddress(isData.location.address);
        setPlaceName(isData.location.placeName);
        setLatitude(isData.location.latitude);
        setLongitude(isData.location.longitude);
        setCategoryNum(isData.location.category);
    }

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
            {modal && (
                <SearchModal
                    setModal={setModal}
                    searchLocationList={searchLocationList}
                    setAddress={setAddress}
                    setPlaceName={setPlaceName}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    setSelectedLocation={setSelectedLocation}
                />
            )}
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

// st chooseLocationHandler = () => {
//     console.log("fff", chooseLocation);

//     setAddress(chooseLocation.address_name);
//     setPlaceName(chooseLocation.place_name);
//     setLatitude(chooseLocation.y);
//     setLongitude(chooseLocation.x);
// };
