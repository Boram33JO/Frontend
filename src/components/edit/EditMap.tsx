import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Category from "./Category";
import pinIcon from "../../assets/images/icon_pin_3x.png";

import { ReactComponent as Pin } from "../../assets/images/icon_pin_map.svg";

import SearchModal from "./SearchModal";
import { toast } from "react-hot-toast";

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

    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

    type MapRefType = {
        map: any;
        marker: any;
    } | null;

    const mapRef = useRef<MapRefType>(null); // 지도 객체와 마커 객체를 저장할 ref 생성

    useEffect(() => {
        window.kakao.maps.load(function () {
            const mapContainer = document.getElementById("map");
            const mapOption = {
                center: new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude),
                level: 3,
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            const imageSize = new window.kakao.maps.Size(36, 42);
            const markerImage = new window.kakao.maps.MarkerImage(pinIcon, imageSize);

            const markerPosition = new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));

            // 마커를 생성하고 이미지를 설정합니다
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
            });

            // 만들어진 마커 객체를 지도에 추가합니다.
            marker.setMap(map);

            // 클릭 이벤트 리스너 등록
            window.kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
                // 클릭한 위치의 위경도 정보 가져오기
                var latlng = mouseEvent.latLng;

                setState((prevState) => ({
                    ...prevState,
                    center: { latitude: latlng.getLat(), longitude: latlng.getLng() },
                }));

                setLatitude(latlng.getLat());
                setLongitude(latlng.getLng());

                // 지오코더 인스턴스 생성
                var geocoder = new window.kakao.maps.services.Geocoder();

                var coord2AddressCallbackFunc = function (result: any, status: any) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setSearchLocation(result[0].address.address_name);
                    }
                };

                geocoder.coord2Address(latlng.getLng(), latlng.getLat(), coord2AddressCallbackFunc);
            });

            // 만들어진 지도와 마커 객체를 ref에 저장
            mapRef.current = { map, marker };
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            if (state.isPanto) {
                mapRef.current.map.panTo(new window.kakao.maps.LatLng(latitude, longitude));
            } else {
                mapRef.current.map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
            }

            // 새로운 위경도로 마커표시 이동
            mapRef.current.marker.setPosition(new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude)));
        }
    }, [latitude, longitude]);

    useEffect(() => {
        if (isData) {
            setAddress(isData.location.address);
            setPlaceName(isData.location.placeName);
            setLatitude(isData.location.latitude);
            setLongitude(isData.location.longitude);
            setCategoryNum(isData.category);
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
        setPlaceName(newValue);
    };

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchLocation.trim().length === 0) {
            return toast.error("내용을 입력하세요", { position: "top-center" });
        }
        setModal(true);
        searchMap();
        setSearchLocation("");
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
                            marginRight: "8px",
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
                        value={placeName || searchLocation || ""}
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
                <div id="clickLatlng"></div>
            </StKakaoMapContainer>
            <StLocation>
                <div>
                    <Pin style={{ marginRight: "8px" }} />
                    {placeName}
                </div>
                <button>{categories[categoryNum]}</button>
            </StLocation>
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
    box-sizing: border-box;
    border-radius: 999px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    input {
        width: 85%;
        height: 20px;
        font-size: 16px;
        line-height: 100%;
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

const StLocation = styled.div`
    width: 100%;
    height: auto;
    border-radius: 6px;
    background: #434047;
    box-sizing: border-box;
    color: #f1f1f1;
    padding: 10px 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    button {
        height: 26px;
        color: #fafafa;
        display: flex;
        border-radius: 999px;
        padding: 6px 16px;
        justify-content: center;
        align-items: center;
    }
`;
