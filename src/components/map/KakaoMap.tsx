import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import { ReactComponent as ReSearchIcon } from "../../assets/images/research.svg";
import Categories from "../edit/Categories";
// import pinIcon from "../../assets/images/icon_pin_3x.png";
import pinIcon from "../../assets/images/floating_post.svg";
import pin_cafe from "../../assets/images/pin/01_cafe.svg";
import { CategoryPinImages } from "../../assets/images/pin/pin";

import pin_transport from "../../assets/images/pin/03_transport.svg";
import pin_library from "../../assets/images/pin/09_library.svg";
import SearchModal from "../edit/SearchModal";
import { debounce, throttle } from "../../utils/common";

import { postCategoryData } from "../../api/map";

interface Location {
    placeName: string;
    latitude: string;
    longitude: string;
}

interface KakaoProps {
    updatedPosition: Location[];
    setUpdatedPosition: React.Dispatch<React.SetStateAction<Location[]>>;
    isData: any;
    setIsData: any;
}

const KakaoMap: React.FC<KakaoProps> = ({ updatedPosition, setUpdatedPosition, isData, setIsData }) => {
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchLocationList, setSearchLocationList] = useState<any>([]);
    const [geoLatitude, setGeoLatitude] = useState<string>("");
    const [geoLongitude, setGeoLongitude] = useState<string>("");
    const [latitude, setLatitude] = useState<string>("37.566826");
    const [longitude, setLongitude] = useState<string>("126.9786567");
    const [address, setAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<any>({});
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const [modal, setModal] = useState(false);
    const [map, setMap] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const [level, setLevel] = useState();
    const [windowMap, setWindowMap] = useState<any>();
    const [circle, setCircle] = useState<any>(null);
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];

    // 지도에 핀 꽂기
    const addMarkersToMap = (map: any, positions: any[]) => {
        // 기존 마커들 제거
        for (const marker of markers) {
            marker.setMap(null);
        }

        // 새로운 마커들 추가
        const newMarkers = [];
        for (let i = 0; i < positions.length; i++) {
            const imageSize = new window.kakao.maps.Size(40, 40);
            const pinImage = CategoryPinImages[positions[i].category];
            const markerImage = new window.kakao.maps.MarkerImage(pinImage, imageSize, { offset: new window.kakao.maps.Point(19, 41) });
            const marker = new window.kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                title: `${positions[i].title} (${categories[positions[i].category - 1]})`,
                image: markerImage,
                clickable: true,
            });
            // marker.setMap(map);
            newMarkers.push(marker);
        }
        // console.log(newMarkers);
        setMarkers(newMarkers); // 새로운 마커들 저장
    };

    useEffect(() => {
        window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map");
            // console.log("지도 생성");

            // 지도 생성
            const map = new window.kakao.maps.Map(mapContainer, {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: level,
            });

            // mapRef.current = map; // Ref에 지도 인스턴스 저장

            setMap(map);
            setWindowMap(window.kakao.maps);

            // 영역 변경 이벤트 등록
            const boundsChangedHandler = throttle(() => {
                const bounds = map.getBounds();
                const swLatlng = bounds.getSouthWest();
                const neLatlng = bounds.getNorthEast();
                // console.log("바운드 변경");
                setLatitude(String((swLatlng.getLat() + neLatlng.getLat()) / 2));
                setLongitude(String((swLatlng.getLng() + neLatlng.getLng()) / 2));
            }, 500);

            // bounds_changed 이벤트 리스너 추가
            window.kakao.maps.event.addListener(map, "bounds_changed", boundsChangedHandler);

            // 줌 컨트롤 생성 및 지도에 추가
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

            // 줌 레벨 변경 시 이벤트 처리
            const zoomChangedHandler = () => {
                const level = map.getLevel();
                setLevel(level);
                // console.log("level", level);
            };
            window.kakao.maps.event.addListener(map, "zoom_changed", zoomChangedHandler);

            // cleanup function for unmounting
            return () => {
                window.kakao.maps.event.removeListener(map, "bounds_changed", boundsChangedHandler);
                window.kakao.maps.event.removeListener(map, "zoom_changed", zoomChangedHandler);
            };
        });
    }, []);

    function panTo() {
        var moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
        map.panTo(moveLatLon);
    }

    useEffect(() => {
        if (!map) {
            return;
        } else {
            mappingCategoryHandler(categoryNum);
            panTo();
        }
    }, [selectedLocation]);

    // 최초 GPS 위치 설정
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             function (position) {
    //                 const lat = String(position.coords.latitude);
    //                 const lng = String(position.coords.longitude);

    //                 console.log("lat,lng", lat, lng);
    //                 setLatitude(lat);
    //                 setLongitude(lng);
    //                 setGeoLatitude(lat);
    //                 setGeoLongitude(lng);
    //             },
    //             (error) => {
    //                 console.error("error", error);
    //             }
    //         );
    //     } else {
    //         console.error("해당 브라우저에서는 gps를 지원하지 않습니다.");
    //     }
    // }, []);

    const makeCircle = async () => {
        // 이미 그려진 원이 있다면 삭제
        if (circle) {
            circle.setMap(null);
        }
        let tempCircle = await new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(latitude, longitude),
            radius: 10000, // 반경 10km
            strokeOpacity: 0, // 선 불투명도 (0 : 투명)
            fillColor: "#7462E2", // 채우기 색깔
            fillOpacity: 0.2, // 채우기 불투명도
        });
        setCircle(tempCircle); // 현재 원을 circle에 할당
        tempCircle.setMap(map); // 현재 원 그리기
    };

    // 카테고리를 눌렀을 때, 데이터를 서버에 요청
    const mappingCategoryHandler = async (categoryNum: number) => {
        const latlng = { latitude, longitude };

        if (categoryNum === 0) {
            try {
                const response = await postCategoryData(latlng);
                // console.log("요청 보낼 좌표:", latlng);
                setIsData(response?.data);
                // console.log("받는 데이터", response?.data);

                const updatedPositions = response?.data.map((item: any) => ({
                    key: item.id,
                    category: item.category,
                    title: item.location.placeName,
                    latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
                }));
                setUpdatedPosition(updatedPositions);
                addMarkersToMap(map, updatedPositions);
                makeCircle();
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await postCategoryData(latlng);
                // console.log("category", response);
                setIsData(response?.data);
                // console.log("받는 데이터", response?.data);

                const updatedPositions = response?.data
                    .filter((item: any) => item.category === categoryNum)
                    .map((item: any) => ({
                        key: item.id,
                        category: item.category,
                        title: item.location.placeName,
                        latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
                    }));
                setUpdatedPosition(updatedPositions);
                addMarkersToMap(map, updatedPositions);
                makeCircle();
                // return response?.data;
            } catch (error) {
                console.error(error);
            }
        }
    };

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places();
        const placesSearchCB = function (data: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                setSearchLocationList(data);
                setLatitude(selectedLocation.y);
                setLongitude(selectedLocation.x);
            }
        };
        // console.log(latitude, longitude);
        ps.keywordSearch(searchLocation, placesSearchCB);
    };

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchLocation.trim().length === 0) {
            return alert("내용을 입력하세요");
        }
        setModal(true);
        searchMap();
        setSearchLocation("");
    };

    // console.log("isData", isData);

    return (
        <>
            <script></script>
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
                    <Categories
                        categoryNum={categoryNum}
                        setCategoryNum={setCategoryNum}
                        mappingCategoryHandler={mappingCategoryHandler}
                    />
                </StCategory>
                <StKakaoMapContainer>
                    <StKakaoMap id="map" />
                    <StReSearchButton onClick={debounce(() => mappingCategoryHandler(categoryNum), 300)}>
                        현재 위치에서 검색
                    </StReSearchButton>
                    <p id="result"></p>
                </StKakaoMapContainer>
            </StMapContainer>
        </>
    );
};

export default KakaoMap;

const StMapContainer = styled.div`
    height: auto;
`;

const StCategory = styled.div`
    margin: 16px 0 22px 0;
`;

const StSearchForm = styled.form`
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
    }
`;

const StKakaoMapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    display: flex;
    justify-content: center;
`;

const StKakaoMap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

const StReSearchButton = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    z-index: 2;
    bottom: 20px;

    border-radius: 20px;
    background-color: #484461;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.18);

    color: #fafafa;
    font-size: 16px;
    line-height: calc(100% + 6px);
    font-weight: 600;

    box-sizing: border-box;
    padding: 7px 14px;

    cursor: pointer;
`;
