import React from "react";
import styled from "styled-components";
import { ReactComponent as CafeIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as RestaurantIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as PublicTransportIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as SchoolIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as ExerciseIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as ParkIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as WaterIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as OceanIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as LibraryIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as CulturePlaceIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as LeisureIcon } from "../../assets/images/category/03_cafe.svg";
import { ReactComponent as EtcIcon } from "../../assets/images/category/03_cafe.svg";

const PopularPlace = () => {
    const IconLists = [
        CafeIcon,
        RestaurantIcon,
        PublicTransportIcon,
        SchoolIcon,
        ExerciseIcon,
        ParkIcon,
        WaterIcon,
        OceanIcon,
        LibraryIcon,
        CulturePlaceIcon,
        LeisureIcon,
        EtcIcon,
    ];

    return (
        <StPlacelogo>
            <CafeIcon
                width={16}
                height={16}
            />
            <span>placename</span>
        </StPlacelogo>
    );
};

export default PopularPlace;

const StPlacelogo = styled.div`
    box-sizing: border-box;
    padding: 10px 14px;
    text-align: start;

    border-radius: 25px;
    background: #3b3a40;
    span {
        color: #eae9f4;
        font-size: 16px;
        font-weight: 500;
        line-height: 100%;
    }
`;
