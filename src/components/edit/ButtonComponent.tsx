import React from "react";
import styled from "styled-components";

interface Props {
    children: string;
    onClick?: () => void; // onClick 프로퍼티 타입 설정
}

const ButtonComponent: React.FC<Props> = ({ children, onClick }) => {
    return <StButton onClick={onClick}>{children}</StButton>;
};

export default ButtonComponent;

const StButton = styled.button`
    width: 168px;
    height: 44px;
    border-radius: 6px;
    border: none;
`;
