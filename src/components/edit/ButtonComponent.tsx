import React from "react";
import styled from "styled-components";

interface Props {
    children: string;
    onClick?: () => void;
    style?: React.CSSProperties; // 스타일 속성 추가
}

const ButtonComponent: React.FC<Props> = ({ children, onClick, style }) => {
    return (
        <StButton
            onClick={onClick}
            style={style}
        >
            {children}
        </StButton>
    );
};

export default ButtonComponent;

const StButton = styled.button`
    width: 100%;
    height: 44px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;
