// import React, { useState, useEffect } from "react";

// declare global {
//     interface Window {
//         kakao: any;
//     }
// }

// interface EditPageProps {
//     address: string;
//     placeName: string;
//     latitude: string;
//     longitude: string;
//     setAddress: (address: string) => void;
//     setPlaceName: (placeName: string) => void;
//     setLatitude: (latitude: string) => void;
//     setLongitude: (longitude: string) => void;
//     slideIndex: number;
// }

// const EditMap: React.FC<EditPageProps> = ({
//     address,
//     placeName,
//     latitude,
//     longitude,
//     setAddress,
//     setPlaceName,
//     setLatitude,
//     setLongitude,
//     slideIndex,
// }) => {
//     // const [state, setState] = useState({
//     // center: { latitude: 37.566826, longitude: 126.9786567 },
//     // isPanto: true,
//     // });
//     // const [searchLocation, setSearchLocation] = useState<string>("");

//     return (
//         <>
//             <form
//             // onSubmit={searchLocationHandler}
//             >
//                 <img
//                     src="https://img.freepik.com/premium-vector/search-icon-magnifying-glass-symbol-outline-icon_543062-139.jpg?w=2000"
//                     alt="검색"
//                     style={{ width: "24px", height: "24px" }}
//                 />
//                 <input
//                 // onChange={changeInputHandler}
//                 // value={searchLocation}
//                 />
//             </form>
//             <div
//                 id="map"
//                 style={{ width: "350px", height: "288px" }}
//             />
//         </>
//     );
// };

// export default EditMap;

import React from "react";
import ButtonComponent from "./ButtonComponent";
import styled from "styled-components";

// interface EditPageProps {
//     // slideIndex: number;
//     // onClickNextButtonHandler: any;
//     // onClickBeforeButtonHandler: any;
// }
// interface props {
//     slideIndex: number;
// }

const EditMap: React.FC = () => {
    return (
        <div style={{ color: "white" }}>
            {/* <StButtons>
                <ButtonComponent onClick={onClickBeforeButtonHandler}>이전</ButtonComponent>
                <ButtonComponent onClick={onClickNextButtonHandler}>다음</ButtonComponent>
            </StButtons> */}
            이ㅡ니ㅡ치느잎츠밍
        </div>
    );
};

export default EditMap;

const StButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
