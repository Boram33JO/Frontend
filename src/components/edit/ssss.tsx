// import React, { useState, useEffect } from "react";

// declare global {
//     interface Window {
//         kakao: any;
//     }
// }

// const EditMap: React.FC = () => {
//     const [state, setState] = useState({
//         center: { lat: 37.566826, lng: 126.9786567 },
//         isPanto: true,
//     });
//     const [searchLocation, setSearchLocation] = useState<string>("");
//     const [markers, setMarkers] = useState<any[]>([]);

//     useEffect(() => {
//         const mapContainer = document.getElementById("map"); // 지도를 표시할 div
//         const mapOption = {
//             center: new window.kakao.maps.LatLng(state.center.lat, state.center.lng), // 지도의 중심좌표
//             level: 3,
//         };

//         const map = new window.kakao.maps.Map(mapContainer, mapOption);

//         if (state.isPanto) {
//             map.panTo(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
//         } else {
//             map.setCenter(new window.kakao.maps.LatLng(state.center.lat, state.center.lng));
//         }
//     }, [state]);

//     onst searchMap = () => {
//         const ps = new window.kakao.maps.services.Places(); // 'window.' 추가
//         console.log(ps);
//         const placesSearchCB = function (data: any, status: any, pagination: any) {
//             if (status === window.kakao.maps.services.Status.OK) {
//                 const newSearch = data;
//                 console.log(newSearch);
//                 setState({
//                     center: { lat: newSearch.y, lng: newSearch.x },
//                     isPanto: true,
//                 });
//             }
//         };
//         ps.keywordSearch(searchLocation, placesSearchCB); // 검색어 변경
//     };

// // 장소 검색 객체를 생성합니다
// var ps = new kakao.maps.services.Places();

// // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
// var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// // 키워드로 장소를 검색합니다
// searchPlaces();

// // 키워드 검색을 요청하는 함수입니다
// function searchPlaces() {

//     var keyword = document.getElementById('keyword').value;

//     if (!keyword.replace(/^\s+|\s+$/g, '')) {
//         alert('키워드를 입력해주세요!');
//         return false;
//     }

//     // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
//     ps.keywordSearch( keyword, placesSearchCB);
// }

// // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//     if (status === kakao.maps.services.Status.OK) {

//         // 정상적으로 검색이 완료됐으면
//         // 검색 목록과 마커를 표출합니다
//         displayPlaces(data);

//         // 페이지 번호를 표출합니다
//         displayPagination(pagination);

//     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

//         alert('검색 결과가 존재하지 않습니다.');
//         return;

//     } else if (status === kakao.maps.services.Status.ERROR) {

//         alert('검색 결과 중 오류가 발생했습니다.');
//         return;

//     }
// }

// // 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {

//     var listEl = document.getElementById('placesList'),
//     menuEl = document.getElementById('menu_wrap'),
//     fragment = document.createDocumentFragment(),
//     bounds = new kakao.maps.LatLngBounds(),
//     listStr = '';

//     // 검색 결과 목록에 추가된 항목들을 제거합니다
//     removeAllChildNods(listEl);

//     // 지도에 표시되고 있는 마커를 제거합니다
//     removeMarker();

//     for ( var i=0; i<places.length; i++ ) {

//         // 마커를 생성하고 지도에 표시합니다
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
//             marker = addMarker(placePosition, i),
//             itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         bounds.extend(placePosition);

//         // 마커와 검색결과 항목에 mouseover 했을때
//         // 해당 장소에 인포윈도우에 장소명을 표시합니다
//         // mouseout 했을 때는 인포윈도우를 닫습니다
//         (function(marker, title) {
//             kakao.maps.event.addListener(marker, 'mouseover', function() {
//                 displayInfowindow(marker, title);
//             });

//             kakao.maps.event.addListener(marker, 'mouseout', function() {
//                 infowindow.close();
//             });

//             itemEl.onmouseover =  function () {
//                 displayInfowindow(marker, title);
//             };

//             itemEl.onmouseout =  function () {
//                 infowindow.close();
//             };
//         })(marker, places[i].place_name);

//         fragment.appendChild(itemEl);
//     }

//     // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//     listEl.appendChild(fragment);
//     menuEl.scrollTop = 0;

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
// }

// // 검색결과 항목을 Element로 반환하는 함수입니다
// function getListItem(index, places) {

//     var el = document.createElement('li'),
//     itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
//                 '<div class="info">' +
//                 '   <h5>' + places.place_name + '</h5>';

//     if (places.road_address_name) {
//         itemStr += '    <span>' + places.road_address_name + '</span>' +
//                     '   <span class="jibun gray">' +  places.address_name  + '</span>';
//     } else {
//         itemStr += '    <span>' +  places.address_name  + '</span>';
//     }

//       itemStr += '  <span class="tel">' + places.phone  + '</span>' +
//                 '</div>';

//     el.innerHTML = itemStr;
//     el.className = 'item';

//     return el;
// }

// // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
// function addMarker(position, idx, title) {
//     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//         imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//         imgOptions =  {
//             spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//             spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//             offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//         },
//         markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//             marker = new kakao.maps.Marker({
//             position: position, // 마커의 위치
//             image: markerImage
//         });

//     marker.setMap(map); // 지도 위에 마커를 표출합니다
//     markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//     return marker;
// }

// // 지도 위에 표시되고 있는 마커를 모두 제거합니다
// function removeMarker() {
//     for ( var i = 0; i < markers.length; i++ ) {
//         markers[i].setMap(null);
//     }
//     markers = [];
// }

// // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// function displayPagination(pagination) {
//     var paginationEl = document.getElementById('pagination'),
//         fragment = document.createDocumentFragment(),
//         i;

//     // 기존에 추가된 페이지번호를 삭제합니다
//     while (paginationEl.hasChildNodes()) {
//         paginationEl.removeChild (paginationEl.lastChild);
//     }

//     for (i=1; i<=pagination.last; i++) {
//         var el = document.createElement('a');
//         el.href = "#";
//         el.innerHTML = i;

//         if (i===pagination.current) {
//             el.className = 'on';
//         } else {
//             el.onclick = (function(i) {
//                 return function() {
//                     pagination.gotoPage(i);
//                 }
//             })(i);
//         }

//         fragment.appendChild(el);
//     }
//     paginationEl.appendChild(fragment);
// }

// // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// // 인포윈도우에 장소명을 표시합니다
// function displayInfowindow(marker, title) {
//     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//     infowindow.setContent(content);
//     infowindow.open(map, marker);
// }

//  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
// function removeAllChildNods(el) {
//     while (el.hasChildNodes()) {
//         el.removeChild (el.lastChild);
//     }
// }

// return (
//         <>

//        <div class="map_wrap">
//     <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>

//     <div id="menu_wrap" class="bg_white">
//         <div class="option">
//             <div>
//                 <form onsubmit="searchPlaces(); return false;">
//                     키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15">
//                     <button type="submit">검색하기</button>
//                 </form>
//             </div>
//         </div>
//         <div>
//         <ul id="placesList"></ul>
//         <div id="pagination"></div>
//     </div>
// </div>

//         </>
//     );

// }
// export default EditMap;

import React from "react";

const ssss = () => {
    return <div>ssss</div>;
};

export default ssss;


// import React, { useState, useEffect } from "react";

// declare global {
//     interface Window {
//         kakao: any;
//     }
// }

// const EditMap: React.FC = () => {
//     const [state, setState] = useState({
//         center: { latitude: 37.566826, longitude: 126.9786567 },
//         isPanto: true,
//     });
//     // const [address, setAddress] = useState("");
//     const [searchLocation, setSearchLocation] = useState<string>("");
//     // const [markers, setMarkers] = useState<any[]>([]);

//     useEffect(() => {
//         const mapContainer = document.getElementById("map"); // 지도를 표시할 div
//         const mapOption = {
//             center: new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude), // 지도의 중심좌표
//             level: 3,
//         };

//         const map = new window.kakao.maps.Map(mapContainer, mapOption);

//         if (state.isPanto) {
//             map.panTo(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
//         } else {
//             map.setCenter(new window.kakao.maps.LatLng(state.center.latitude, state.center.longitude));
//         }
//     }, [state]);

//     const searchMap = () => {
//         const ps = new window.kakao.maps.services.Places(); // 'window.' 추가
//         const placesSearchCB = function (data: any, status: any, pagination: any) {
//             if (status === window.kakao.maps.services.Status.OK) {

//                 // const newSearch = data;
//                 // console.log(newSearch);

//                 // setAddress(newSearch.address_name);
//                 // console.log("address", address);
//                 // setState({
//                 //     center: { latitude: newSearch.y, longitude: newSearch.x },
//                 //     isPanto: true,
//                 // });
//             }
//         };
//         ps.keywordSearch(searchLocation, placesSearchCB); // 검색어 변경
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
//             <div
//                 id="map"
//                 style={{ width: "350px", height: "288px" }}
//             />
//             <form onSubmit={searchLocationHandler}>
//                 <input
//                     onChange={changeInputHandler}
//                     value={searchLocation}
//                 />
//                 <button>검색</button>
//             </form>
//         </>
//     );
// };

// export default EditMap;

// import React from 'react'

// const EditMap = () => {
//   return (
//     <div>EditMap</div>
//   )
// }

// export default EditMap

// import { useEffect, useState } from 'react';

// import markerRunning from '../../image/marker/marker_running.png';

// const { kakao } = window;

// export default function CreateKakaoMap({ register }) {
//   const [isLatLng, setLatLng] = useState(
//     '37.65673759424988, 126.76579874369969'
//   );

//   const mapscript = () => {
//     const container = document.getElementById('map');
//     const options = {
//       center: new kakao.maps.LatLng(37.65673759424988, 126.76579874369969),
//       level: 5,
//     };
//     const map = new kakao.maps.Map(container, options);

//     // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
//     if (navigator.geolocation) {
//       // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//       navigator.geolocation.getCurrentPosition(function (position) {
//         const lat = position.coords.latitude, // 위도
//           lon = position.coords.longitude; // 경도

//         const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
//           message = '<div style="padding:5px;">클릭으로 위치 설정하기</div>'; // 인포윈도우에 표시될 내용입니다

//         // 마커와 인포윈도우를 표시합니다
//         displayMarker(locPosition, message);
//       });
//     } else {
//       // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

//       const locPosition = new kakao.maps.LatLng(
//           37.65673759424988,
//           126.76579874369969
//         ),
//         message = 'geolocation을 사용할수 없어요..';

//       displayMarker(locPosition, message);
//     }

//     /**마커 설정 */
//     const imageSrc = markerRunning,
//       imageSize = new kakao.maps.Size(64, 69),
//       imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

//     const markerImage = new kakao.maps.MarkerImage(
//       imageSrc,
//       imageSize,
//       imageOption
//     );

//     // 지도에 마커와 인포윈도우를 표시하는 함수입니다
//     function displayMarker(locPosition, message) {
//       // 마커를 생성합니다
//       const marker = new kakao.maps.Marker({
//         map: map,
//         position: locPosition,
//         image: markerImage,
//       });

//       const iwContent = message, // 인포윈도우에 표시할 내용
//         iwRemoveable = true;

//       // 인포윈도우를 생성합니다
//       const infowindow = new kakao.maps.InfoWindow({
//         content: iwContent,
//         removable: iwRemoveable,
//       });

//       // 지도 중심좌표를 접속위치로 변경합니다
//       map.setCenter(locPosition);

//       // 지도에 클릭 이벤트를 등록합니다
//       // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
//       kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
//         // 클릭한 위도, 경도 정보를 가져옵니다
//         const latlng = mouseEvent.latLng;
//         setLatLng(latlng);

//         // 마커 위치를 클릭한 위치로 옮깁니다
//         marker.setPosition(latlng);
//       });

//       // 인포윈도우를 마커위에 표시합니다
//       infowindow.open(map, marker);
//     }
//   };

//   useEffect(() => {
//     mapscript();
//   }, []);

//   return (
//     <>
//       <div
//         id="map"
//         style={{
//           width: '500px',
//           height: '500px',
//         }}
//       ></div>
//       <input {...register('mapValue')} value={isLatLng} hidden />
//     </>
//   );
// }

// import React from 'react'

// const EditMap = () => {
//   return (
//     <div>EditMap</div>
//   )
// }

// export default EditMap
