import React, { useState } from "react";

import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/images/search.svg";
import Category from "../common/Category";

declare global {
    interface Window {
        kakao: any;
    }
}

interface EditMapProps {
    address: string;
    placeName: string;
    latitude: string;
    longitude: string;
    categoryNum: number;

    setAddress: (address: string) => void;
    setPlaceName: (placeName: string) => void;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setCategoryNum: React.Dispatch<React.SetStateAction<number>>; // Update the type here
}

const EditMap: React.FC<EditMapProps> = ({
    address,
    placeName,
    latitude,
    longitude,
    categoryNum,
    setAddress,
    setPlaceName,
    setLatitude,
    setLongitude,
    setCategoryNum,
}) => {
    const [searchLocation, setSearchLocation] = useState<string>("");
    // const [state, setState] = useState({
    // center: { latitude: 37.566826, longitude: 126.9786567 },
    // isPanto: true,
    // });
    // const [searchLocation, setSearchLocation] = useState<string>("");
    const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
    };

    const searchLocationHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // searchLocation("");
        console.log("wow");
    };
    return (
        <>
            <StSearchForm onSubmit={searchLocationHandler}>
                <div>
                    <Search style={{ width: "16px", height: "16px", marginLeft: "16px", marginRight: "12px" }} />
                </div>
                <input
                    placeholder="장소를 입력해보세요"
                    onChange={changeInputHandler}
                    value={searchLocation}
                />
            </StSearchForm>
            <StCategory>
                <Category
                    categoryNum={categoryNum}
                    setCategoryNum={setCategoryNum}
                />
            </StCategory>
            <div
                id="map"
                style={{ width: "350px", height: "288px" }}
            />
        </>
    );
};

export default EditMap;

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
        border: 1px solid #434047;
        background-color: #434047;
    }
    input:focus {
        outline: none;
    }
`;

const StCategory = styled.div`
    margin: 16px 0 22px 0;
`;
