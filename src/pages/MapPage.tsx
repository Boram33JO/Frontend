import React from "react";
import styled from "styled-components";

import KakaoMap from "../components/map/KakaoMap";

const MapPage = () => {
    return (
        <MapContainer>
            <h1>지도</h1>
            <KakaoMap />
            
        </MapContainer>
    );
};

export default MapPage;

export const MapContainer = styled.div`
    width: 390px;
    height: 844px;
`;
