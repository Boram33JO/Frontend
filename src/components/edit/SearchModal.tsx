import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as UnionIcon } from "../../assets/images/Union.svg";

interface SearchModalProps {
    setModal: (value: boolean) => void;
    searchLocationList: any;
    setAddress: any;
    setPlaceName: any;
    setLatitude: any;
    setLongitude: any;
    setSelectedLocation: any;
}

const SearchModal: React.FC<SearchModalProps> = ({
    // selectedLocation,
    setModal,
    searchLocationList,
    setAddress,
    setPlaceName,
    setLatitude,
    setLongitude,
    setSelectedLocation,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const chooseLocationHandler = (index: number) => {
        const selectedItem = searchLocationList[index];
        setSelectedLocation(selectedItem); // 선택한 항목 정보 저장
        setAddress(selectedItem.address_name);
        setPlaceName(selectedItem.place_name);
        setLatitude(selectedItem.y);
        setLongitude(selectedItem.x);
        setModal(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModal(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setModal]);

    return (
        <StModalOverlay>
            <ModalContainer ref={modalRef}>
                <div style={{ color: "white" }}>
                    {searchLocationList.map((item: any, index: number) => (
                        <StSearchLocation
                            key={index}
                            onClick={() => chooseLocationHandler(index)}
                        >
                            <div>{item.place_name}</div>
                            <div>
                                <UnionIcon style={{ color: "#6B6770" }} />
                            </div>
                        </StSearchLocation>
                    ))}
                </div>
            </ModalContainer>
        </StModalOverlay>
    );
};

export default SearchModal;

const StModalOverlay = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 12px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    z-index: 9999;
`;

const ModalContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 180px;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 18px 16px 18px 40px;
    background-color: #3b3a40;
    z-index: 10000;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 4px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #dddddd;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #3a3a3a;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:decrement {
        height: 10px;
    }
`;

const StSearchLocation = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
    cursor: pointer;
`;
