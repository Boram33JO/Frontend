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
    width: 350px;
    height: 180px;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 18px 16px 28px 40px;
    background-color: #3b3a40;

    z-index: 10000;
`;

const StSearchLocation = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
    cursor: pointer;
`;

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
                    {searchLocationList.slice(0, 5).map((item: any, index: number) => (
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
