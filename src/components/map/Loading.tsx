import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";
import { ReactComponent as Pple } from "../../assets/images/spinn_2.svg";

const StLoadinContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    align-content: space-around;
    /* background-color: #141414; */
    background: rgba(20, 20, 20, 0.9);
`;

function Loading() {
    return (
        <StLoadinContainer>
            <div>
                <Pple
                    width={100}
                    height={100}
                />
                <BeatLoader
                    color="#CEC5EF"
                    size={15}
                    margin={9}
                />
                {/* <p>현재 위치를 찾고 있어요</p> */}
            </div>
        </StLoadinContainer>
    );
}

export default Loading;
