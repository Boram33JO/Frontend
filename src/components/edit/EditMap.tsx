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
        window.kakao.maps.load(function () {
            const mapContainer = document.getElementById("map"); // 지도를 표시할 div
            const mapOption = {
                center: new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude), // 지도의 중심좌표
                level: 3,
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            if (state.isPanto) {
                map.panTo(new window.kakao.maps.LatLng(latitude, longitude));
            } else {
                map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
            }

            const imageSize = new window.kakao.maps.Size(36, 42);
            const markerImage = new window.kakao.maps.MarkerImage(pinIcon, imageSize);

            const markerPosition = new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
            });

            marker.setMap(map); // Add the marker to the map
        });
    }, [state, latitude, longitude]);

    useEffect(() => {
        if (isData) {
            setAddress(isData.location.address);
            setPlaceName(isData.location.placeName);
            setLatitude(isData.location.latitude);
            setLongitude(isData.location.longitude);
        }
    }, [isData]);

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places();
        const placesSearchCB = function (data: any, status: any, pagination: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                setSearchLocationList(data);
            }
        };
        ps.keywordSearch(searchLocation, placesSearchCB);
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSearchLocation(newValue);
        setPlaceName(newValue); // searchLocation 값을 placeName으로 설정
    };

    // const handleCategoryChange = (newCategoryNum: number) => {
    //     setCategoryNum(newCategoryNum); // categoryNum 값을 변경하고 저장
    // };

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchLocation.trim().length === 0) {
            return alert("내용을 입력하세요");
        }
        setModal(true);
        setSearchLocation("");
        searchMap();
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
                {!isData ? (
                    <input
                        placeholder="장소를 입력해보세요"
                        onChange={changeInputHandler}
                        value={searchLocation}
                        id="keyword"
                    />
                ) : (
                    <input
                        placeholder="장소를 입력해보세요"
                        onChange={changeInputHandler}
                        value={placeName || ""}
                        id="keyword"
                    />
                )}
            </StSearchForm>
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
            <StCategory>
                <Category
                    categoryNum={categoryNum}
                    setCategoryNum={setCategoryNum}
                />
            </StCategory>
            <StKakaoMapContainer>
                <StKakaoMap id="map" />
            </StKakaoMapContainer>
        </StMapContainer>
    );
};

export default EditMap;

const StMapContainer = styled.div`
    height: auto;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

const StCategory = styled.div`
    margin: 16px 0 22px 0;
`;

const StSearchForm = styled.form`
    max-width: 460px;
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

const StKakaoMapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
`;

const StKakaoMap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
