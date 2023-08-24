import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Categories from "../edit/Categories";
import pinIcon from "../../assets/images/icon_pin_3x.png";
import SearchModal from "../edit/SearchModal";

import axios from "axios";
import { postData } from "../../api/map";

interface Location {
    placeName: string;
    latitude: string;
    longitude: string;
}

interface KakaoProps {
    isData: Location[]; // 데이터 구조에 따라 변경
    setIsData: React.Dispatch<React.SetStateAction<Location[]>>; // 데이터 구조에 따라 변경
    latitude: string;
    setLatitude: (latitude: string) => void;
    longitude: string;
    setLongitude: (longitude: string) => void;
}

const KakaoMap: React.FC<KakaoProps> = ({ isData, setIsData, latitude, setLatitude, longitude, setLongitude }) => {
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchLocationList, setSearchLocationList] = useState<any>([]);
    const [address, setAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<any>({});
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const [modal, setModal] = useState(false);

    const [selectedMarker, setSelectedMarker] = useState(null);

    const addMarkersToMap = (map: any, positions: any[]) => {
        const imageSrc = pinIcon;
        for (let i = 0; i < positions.length; i++) {
            const imageSize = new window.kakao.maps.Size(36, 42);
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            const marker = new window.kakao.maps.Marker({
                map: map,
                // position: new window.kakao.maps.LatLng(isData[i]?.location?.latitude, isData[i]?.location?.longitude),
                position: positions[i].latlng,
                // title: isData[i]?.location?.placeName,
                title: positions[i].title,
                image: markerImage,
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        }
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
                },
                (error) => {
                    console.error("error", error);
                }
            );
        } else {
            console.error("해당 브라우저에서는 gps를 지원하지 않습니다.");
        }
    }, []);

    // 마커 데이터 업데이트
    useEffect(() => {
        mappingList().then((res) => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const map = new window.kakao.maps.Map(mapContainer, {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 3,
                });
                // 좌표로 이동
                map.panTo(new window.kakao.maps.LatLng(latitude, longitude));
                // 좌표에 있는 data로 markers에 넣을 배열 생성
                const position = res.map((item: any) => ({
                    title: item.location.placeName,
                    latlng: new window.kakao.maps.LatLng(item.location.latitude, item.location.longitude),
                }));
                // 마커 추가 로직 호출
                addMarkersToMap(map, position);
            });
        });
    }, [latitude, longitude]);

    const mappingList = async () => {
        const latlng = { latitude, longitude };
        try {
            const response = await postData(latlng);
            setIsData(response?.data.content);
            return response?.data.content;
        } catch (error) {
            console.error(error);
        }
    };

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places();
        const placesSearchCB = function (data: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                setSearchLocationList(data);
                setLatitude(selectedLocation.y); // 검색한 위치의 위도로 변경
                setLongitude(selectedLocation.x); // 검색한 위치의 경도로 변경
            }
        };
        ps.keywordSearch(searchLocation, placesSearchCB);
    };

    // console.log("이거 맞음", latitude, longitude);

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
                    />
                </StCategory>
                <StKakaoMap id="map" />
            </StMapContainer>
        </>
    );
};

export default KakaoMap;

const StMapContainer = styled.div`
    height: 548px;
`;

const StCategory = styled.div`
    margin: 16px 0 22px 0;
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
    }
`;

const StKakaoMap = styled.div`
    width: 347px;
    height: 308px;
    border-radius: 10px;
`;

// // positions 배열을 매핑하고 각 객체를 위치 정보로 업데이트합니다
// const updatedPositions = positions.map((position, index) => {
//     const locationInfo = response.locations[index]; // 해당 위치 정보 가져오기
//     if (locationInfo) {
//         const { latitude, longitude, placeName } = locationInfo;
//         return {
//             ...position,
//             latlng: new window.kakao.maps.LatLng(latitude, longitude), // LatLng 객체를 사용한다고 가정합니다
//             title: placeName,
//         };
//     }
//     return position; // 해당하는 위치 정보가 없으면 원래 객체를 그대로 유지합니다
// });

// // 이제 updatedPositions는 업데이트된 위치 정보가 포함된 새 배열입니다
// setPositions(updatedPositions);
// setPositions()

//     {
//         title: "스타벅스 청담스타R점",
//         latlng: new window.kakao.maps.LatLng(37.5252051860766, 127.041816506596),
//     },
//     {
//         title: "스타벅스 청담사거리점",
//         latlng: new window.kakao.maps.LatLng(37.523735555011335, 127.046872393057),
//     },
//     {
//         title: "스타벅스 수서역R점",
//         latlng: new window.kakao.maps.LatLng(37.48800665367514, 127.10297988971773),
//     },
//     {
//         title: "스타벅스 신사역점",
//         latlng: new window.kakao.maps.LatLng(37.51622596162784, 127.0207677490634),
//     },
//     {
//         title: "스타벅스 스타필드코엑스몰 R점",
//         latlng: new window.kakao.maps.LatLng(37.50979926297963, 127.06163058645485),
//     },
//     {
//         title: "스타벅스 강남대로점",
//         latlng: new window.kakao.maps.LatLng(37.5032649716005, 127.025559367137),
//     },
//     {
//         title: "스타벅스 압구정로데오역점",
//         latlng: new window.kakao.maps.LatLng(37.5265751539424, 127.040541168059),
//     },
//     {
//         title: "스타벅스 선릉역점",
//         latlng: new window.kakao.maps.LatLng(37.5038956552172, 127.04859034788),
//     },

//     {
//         title: "스타벅스 양재강남빌딩R점",
//         latlng: new window.kakao.maps.LatLng(37.48516628428305, 127.03646645149259),
//     },
//     {
//         title: "스타벅스 선릉세화빌딩점",
//         latlng: new window.kakao.maps.LatLng(37.5037864222678, 127.051223136165),
//     },
//     {
//         title: "스타벅스 강남비젼타워점",
//         latlng: new window.kakao.maps.LatLng(37.49649026006633, 127.0296167853337),
//     },
//     {
//         title: "스타벅스 강남구청역점",
//         latlng: new window.kakao.maps.LatLng(37.5167215373803, 127.041264296462),
//     },
//     {
//         title: "스타벅스 청담점",
//         latlng: new window.kakao.maps.LatLng(37.5243543810765, 127.051585624477),
//     },
//     {
//         title: "스타벅스 포이점",
//         latlng: new window.kakao.maps.LatLng(37.4778218663276, 127.045145597366),
//     },
// ]);

// const addMarkersToMap = (map: any, positions: any[]) => {
//     const imageSrc = pinIcon;

//     for (let i = 0; i < positions.length; i++) {
//         const imageSize = new window.kakao.maps.Size(36, 42);
//         const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

//         const marker = new window.kakao.maps.Marker({
//             map: map,
//                         position: new window.kakao.maps.LatLng(positions[i].latitude, positions[i].longitude),

//             title: positions[i].title,
//             image: markerImage,
//         });
//     }
//     positions.forEach((el) => {
//         // 마커를 생성합니다
//         new window.kakao.maps.Marker({
//           //마커가 표시 될 지도
//           map: map,
//           //마커가 표시 될 위치
//           position: new window.kakao.maps.LatLng(el.lat, el.lng),
//           //마커에 hover시 나타날 title
//           title: el.title,
//         });
//       });
//     };

// };

// const addMarkersToMap = (map: any, positions: any[]) => {
//     positions.forEach((el) => {
//         // el.latlng에 있는 위도와 경도 정보를 가져와서 마커를 생성합니다
//         new window.kakao.maps.Marker({
//             // 마커가 표시될 지도
//             map: map,
//             // 마커가 표시될 위치
//             position: el.latlng,
//             // 마커에 hover 시 나타날 title
//             title: el.title,
//         });
//     });
// };
