import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Categories from "../edit/Categories";
import { CategoryPinImages } from "../../assets/images/pin/pin";
import SearchModal from "../edit/SearchModal";
import clustererImage from "../../assets/images/clusterer.svg";
import { debounce, displayedAt, getProfileImage, throttle } from "../../utils/common";
import { postCategoryData } from "../../api/map";
import quavar from "../../assets/images/quavar_note2.svg";
import { Post } from "../../models/post";

interface Location {
    placeName: string;
    latitude: string;
    longitude: string;
}

interface KakaoProps {
    postList: Post[];
    setPostList: React.Dispatch<React.SetStateAction<Post[]>>;
    isData: any;
    setIsData: any;
}

const KakaoMap: React.FC<KakaoProps> = ({ postList, setPostList, isData, setIsData }) => {
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
    const [clusterer, setClusterer] = useState<any>();
    const categories = ["카페", "식당", "대중교통", "학교", "운동", "공원", "물가", "바다", "도서관", "문화공간", "레저", "기타"];
    const [fetching, setFetching] = useState<boolean>(false);

    // 지도에 핀 꽂기
    const addMarkersToMap = (map: any, positions: any[]) => {
        // 기존 마커들 제거
        for (const marker of markers) {
            marker.setMap(null);
        }

        // 기존 클러스터 제거
        if (clusterer) {
            clusterer.removeMarkers(markers);
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

            const overlayContent = `
            <a href="/detail/${positions[i].postId}">
                <div class="container">
                    <div class="overlay-top">
                        <div class="profile-section">
                            <img class="profile-image" src="${getProfileImage(positions[i].userImage)}" alt="userImage" />
                                <div class="profile-info">
                                    <div class="p1">${positions[i].nickname}</div>
                                        <div class="p2">${displayedAt(positions[i].createdAt)}</div>
                                    </div>
                                </div>
                            <div class="close-button" title="닫기"><div class="p2"></div></div>
                        </div>
                    <div class="overlay-bottom">
                        <div class="title-section">
                            <div class="p3">${positions[i].postTitle}</div>
                        </div>
                        <div class="song-section">
                            <img class="quavar" src="${quavar}" alt="quavar" />
                            <div class="p1">+${positions[i].songCount}</div>
                        </div>
                    </div>
                </div>
            </a>`;

            const customOverlay = new window.kakao.maps.CustomOverlay({
                position: positions[i].latlng,
                clickable: true,
                content: overlayContent,
                yAnchor: 1.5,
            });

            window.kakao.maps.event.addListener(map, "click", function () {
                customOverlay.setMap(null);
            });

            window.kakao.maps.event.addListener(marker, "click", function () {
                customOverlay.setMap(map);
            });

            newMarkers.push(marker);
        }

        // console.log(newMarkers);
        clusterer.addMarkers(newMarkers);
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
            const clusterer = new window.kakao.maps.MarkerClusterer({
                map: map,
                averageCenter: true,
                minLevel: 6,
                styles: [
                    {
                        width: "49px",
                        height: "54px",
                        background: `url(${clustererImage}) no-repeat`,
                        color: "#fff",
                        textAlign: "center",
                        lineHeight: "48px",
                    },
                ],
            });

            clusterer.setTexts((item: string) => {
                return `+${item}`;
            });

            setMap(map);
            setClusterer(clusterer);
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
            setFetching(true);
            return () => {
                window.kakao.maps.event.removeListener(map, "bounds_changed", boundsChangedHandler);
                window.kakao.maps.event.removeListener(map, "zoom_changed", zoomChangedHandler);
            };
        });
    }, []);

    useEffect(() => {
        if (fetching) {
            mappingCategoryHandler(categoryNum);
        }
    }, [fetching]);

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
    }, [selectedLocation, geoLatitude, geoLongitude]);

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
    console.log("lat1,lng1", latitude, longitude);
    console.log("lat2,lng2", geoLatitude, geoLongitude);

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
            fillOpacity: 0.15, // 채우기 불투명도
        });
        setCircle(tempCircle); // 현재 원을 circle에 할당
        tempCircle.setMap(map); // 현재 원 그리기
    };

    // 카테고리를 눌렀을 때, 데이터를 서버에 요청
    const mappingCategoryHandler = async (categoryNum: number) => {
        const latlng = { latitude, longitude };
        // const geoLatlng = { geoLatitude, geoLongitude };
        // if (geoLatlng || categoryNum === 0) {
        //     console.log("dnkbnfaknek");
        try {
            const response = await postCategoryData(latlng);
            console.log("요청 보낼 좌표:", latlng);
            setIsData(response?.data);
            console.log("받는 데이터", response);
            const updatedPositions = response?.data.map((item: any) => ({
                postId: item.postId,
                category: item.category,
                title: item.location.placeName,
                nickname: item.nickname,
                userImage: item.userImage,
                postTitle: item.postTitle,
                songCount: item.songs.length,
                createdAt: item.createdAt,
                latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
            }));
            setPostList(response?.data);
            addMarkersToMap(map, updatedPositions);
            makeCircle();
        } catch (error) {
            console.error(error);
        }
        // }
        // else {
        //     console.log("123");

        // try {
        // const response = await postCategoryData(latlng);
        // console.log("category", response);
        // console.log("1234");
        // setIsData(response?.data);
        // console.log("받는 데이터", response?.data);
        // const updatedPositions = response?.data
        //     .filter((item: any) => item.category === categoryNum)
        //     .map((item: any) => ({
        //         key: item.postId,
        //         category: item.category,
        //         title: item.location.placeName,
        //         nickname: item.nickname,
        //         userImage: item.userImage,
        //         postTitle: item.postTitle,
        //         songCount: item.songs.length,
        //         createdAt: item.createdAt,
        //         latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
        //     }));
        // setPostList(response?.data);
        // addMarkersToMap(map, updatedPositions);
        // makeCircle();
        // return response?.data;
        // } catch (error) {
        //     console.error(error);
        // }
        // }
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

    return (
        <>
            <link
                href="./style.css"
                rel="stylesheet"
                type="text/css"
            />
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
    font-size: 14px;
    line-height: calc(100% + 6px);
    font-weight: 500;

    box-sizing: border-box;
    padding: 8px 14px;

    cursor: pointer;
`;
