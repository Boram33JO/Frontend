import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/search.svg";
import Category from "../common/Category";
import pinIcon from "../../assets/images/icon_pin_3x.png";
import SearchModal from "../edit/SearchModal";

import axios from "axios";
import MyListItem from "../common/MyListItem";
import { Post } from "../../models/post";

//setAddress: (address: string) => void;
// setPlaceName: (placeName: string) => void;

const KakaoMap: React.FC = () => {
    const [latitude, setLatitude] = useState<string>("37.566826");
    const [longitude, setLongitude] = useState<string>("126.9786567");
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [searchLocationList, setSearchLocationList] = useState<any>([]);
    const [address, setAddress] = useState("");
    const [placeName, setPlaceName] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<any>({});
    const [categoryNum, setCategoryNum] = useState<number>(0);
    const [modal, setModal] = useState(false);
    const [positions, setPositions] = useState<any>([]);
    const [isData, setIsData] = useState<any>([]);
    //     {
    //         title: "스타벅스 강남R점",
    //         latlng: new window.kakao.maps.LatLng(37.4976744709989, 127.028443419181),
    //     },
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

    const addMarkersToMap = (map: any, positions: any[]) => {
        const imageSrc = pinIcon;

        for (let i = 0; i < positions.length; i++) {
            const imageSize = new window.kakao.maps.Size(36, 42);
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            const marker = new window.kakao.maps.Marker({
                map: map,
                position: positions[i].latlng,
                title: positions[i].title,
                image: markerImage,
            });
        }
    };

    const searchMap = () => {
        const ps = new window.kakao.maps.services.Places();
        const placesSearchCB = function (data: any, status: any, pagination: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                setSearchLocationList(data);
                setLatitude(selectedLocation.y); // 검색한 위치의 위도로 변경
                setLongitude(selectedLocation.x); // 검색한 위치의 경도로 변경
            }
        };
        ps.keywordSearch(searchLocation, placesSearchCB);
    };

    console.log("이거 맞음", latitude, longitude);

    // 로딩후 최초 1회 실행, 그때 GPS 받은 상태면 위도/경도를 GPS 위치로 설정
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("네비게이션");
                const lat = String(position.coords.latitude);
                const lng = String(position.coords.longitude);

                setLatitude(lat);
                setLongitude(lng);
            });
        }
        // mappingList();
    }, []);

    const mappingList = async () => {
        try {
            const response = await axios.post(`https://api.pple.today/api/posts/map?page=0&size=4`, {
                latitude,
                longitude,
            });
            setIsData(response.data.content);
            console.log("dididi", isData); // 업데이트 된 상태를 찍어보기
            console.log("성공", response);
        } catch (error) {
            console.error(error);
        }
    };

    console.log("isData", isData);
    console.log("length", Object.keys(isData).length);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_REST_API_KEY}&libraries=services&autoload=false`;
        document.head.appendChild(script);
        // console.log("검색어", Boolean(isSearch), isSearch);
        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);

                map.panTo(new window.kakao.maps.LatLng(latitude, longitude));

                // searchMap();
                addMarkersToMap(map, positions);
            });
        };
        mappingList();
    }, [latitude, longitude]);

    console.log("bbdd", selectedLocation);
    console.log("11", latitude);
    console.log("22", longitude);

    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchLocation.trim().length === 0) {
            return alert("내용을 입력하세요");
        }
        setModal(true);
        // setIsSearch(true);
        setSearchLocation("");
        searchMap();
    };

    return (
        <>
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
                    <Category
                        categoryNum={categoryNum}
                        setCategoryNum={setCategoryNum}
                    />
                </StCategory>
                <StKakaoMap id="map" />
            </StMapContainer>
            {/* <StLine /> */}
            <StListContainer>
                {isData.length === 0 ? (
                    <div>해당 위치에 포스팅이 없습니다. 다른 지역을 검색해보세요.</div>
                ) : (
                    isData.map((post: Post) => (
                        <MyListItem
                            key={post.postId}
                            post={post}
                        />
                    ))
                )}
            </StListContainer>
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

// const StLine = styled.div`
//     width: 390px;
//     height: 8px;
//     background: #242325;
// `;

const StListContainer = styled.div`
    width: 350px;
    height: 523px;
    /* padding: 0 20px; */
    background-color: beige;
    /* background-color: #141414; */
`;
