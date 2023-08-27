import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Categories from "../edit/Categories";
import pinIcon from "../../assets/images/icon_pin_3x.png";
import SearchModal from "../edit/SearchModal";

import { postData, postCategoryData } from "../../api/map";

interface Location {
    placeName: string;
    latitude: string;
    longitude: string;
}

interface KakaoProps {
    updatedPosition: Location[];
    setUpdatedPosition: React.Dispatch<React.SetStateAction<Location[]>>;
}

const KakaoMap: React.FC<KakaoProps> = ({ updatedPosition, setUpdatedPosition }) => {
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
    // const [testMapContainer, setTestMapContainer] = useState<any>();
    const [map, setMap] = useState<any>(null);
    const [isData, setIsData] = useState<any>([]);
    const [markers, setMarkers] = useState<any[]>([]);
    const [level, setLevel] = useState();

    // 지도에 핀 꽂기
    const addMarkersToMap = (map: any, positions: any[]) => {
        // 기존 마커들 제거
        for (const marker of markers) {
            marker.setMap(null);
        }

        // 새로운 마커들 추가
        const imageSrc = pinIcon;
        const newMarkers = [];
        for (let i = 0; i < positions.length; i++) {
            const imageSize = new window.kakao.maps.Size(36, 42);
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
            const marker = new window.kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                title: positions[i].title,
                image: markerImage,
            });
            // marker.setMap(map);
            newMarkers.push(marker);
        }
        setMarkers(newMarkers); // 새로운 마커들 저장
    };

    // 최초 GPS 위치 설정
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = String(position.coords.latitude);
                    const lng = String(position.coords.longitude);
                    setLatitude(lat);
                    setLongitude(lng);
                    setGeoLatitude(lat);
                    setGeoLongitude(lng);
                },
                (error) => {
                    console.error("error", error);
                }
            );
        } else {
            console.error("해당 브라우저에서는 gps를 지원하지 않습니다.");
        }
    }, []);

    console.log("111", latitude, longitude);
    console.log("2222", geoLatitude, geoLongitude);

    // useEffect(() => {
    //     window.kakao.maps.load(() => {
    //         const mapContainer = document.getElementById("map");
    //         const map = new window.kakao.maps.Map(mapContainer, {
    //             center: new window.kakao.maps.LatLng(latitude, longitude),
    //             level: 3,
    //         });
    //         setMap(map);
    //     });
    // }, [latitude, longitude]);

    useEffect(() => {
        window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map");

            // 지도 생성
            const map = new window.kakao.maps.Map(mapContainer, {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: level,
            });

            let swLatlng, neLatlng; // 변수 선언

            // 영역 변경 이벤트 등록
            window.kakao.maps.event.addListener(map, "bounds_changed", function () {
                const bounds = map.getBounds();
                swLatlng = bounds.getSouthWest();
                neLatlng = bounds.getNorthEast();

                setLatitude(swLatlng.getLat());
                setLongitude(neLatlng.getLng());
            });
            console.log(latitude);
            console.log(longitude);

            // 줌 컨트롤 생성 및 지도에 추가
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

            // 줌 레벨 변경 시 이벤트 처리
            window.kakao.maps.event.addListener(map, "zoom_changed", function () {
                const level = map.getLevel();
                setLevel(level);
                console.log("level", level);
            });
            setMap(map);
        });
    }, [latitude, longitude]);

    // useEffect(() => {
    //     testMap?.panTo(new window.kakao.maps.LatLng(latitude, longitude));
    // }, [latitude, longitude])

    // 마커 데이터 업데이트
    // useEffect(() => {
    //     mappingList().then((res) => {
    //         const position = res.map((item: any, index: number) => ({
    //             key: index,
    //             title: item.location.placeName,
    //             latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
    //         }));
    //         console.log(position);
    //         // 마커 추가 로직 호출
    //         addMarkersToMap(testMap, position);
    //         if (testMap === null) {
    //             return;
    //         }
    //     });
    // }, [latitude, longitude, geoLatitude, geoLongitude]);

    // const mappingList = async () => {
    //     const latlng = { latitude, longitude };
    //     try {
    //         const response = await postData(latlng);
    //         setIsData(response?.data.content);
    //         return response?.data.content;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const mappingCategoryHandler = async (categoryNum: number) => {
        console.log("categoryId", categoryNum);
        const latlng = { latitude, longitude };
        try {
            const response = await postCategoryData(latlng, categoryNum);
            console.log("category", response);
            setIsData(response?.data);
            console.log("받는 데이터", response?.data);

            const updatedPositions = response?.data
                .filter((item: any) => item.category === categoryNum)
                .map((item: any) => ({
                    key: item.id,
                    title: item.location.placeName,
                    latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
                }));
            setUpdatedPosition(updatedPositions);
            addMarkersToMap(map, updatedPositions);

            // return response?.data;
        } catch (error) {
            console.error(error);
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
        console.log(latitude, longitude);
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
        setSearchLocation("");
        searchMap();
    };

    console.log("isData", isData);

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
`;

const StKakaoMap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
