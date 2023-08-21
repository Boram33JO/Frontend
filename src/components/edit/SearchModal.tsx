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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    z-index: 9999;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 85px;
    left: 11px;
    /* transform: translate(-50%, -50%); */
    width: 350px;
    height: 180px;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 18px 16px 28px 40px;
    background-color: #3b3a40;

    z-index: 10000;
`;

// const CloseButton = styled.button`
//     width: 40px;
//     height: 40px;
//     border-radius: 100%;
//     border: 1px solid rgb(221, 221, 221);
//     cursor: pointer;
//     margin-left: 200px;
// `;

const StSearchLocation = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
    cursor: pointer;
`;

const SearchModal: React.FC<SearchModalProps> = ({
    setModal,
    searchLocationList,
    setAddress,
    setPlaceName,
    setLatitude,
    setLongitude,
    setSelectedLocation,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        setModal(false);
    };

    // const chooseLocationHandler = () => {
    //     console.log("11122", searchLocationList);
    //     console.log("11122", searchLocationList.place_name);
    //     // searchLocationList
    // };

    const chooseLocationHandler = (index: number) => {
        const selectedItem = searchLocationList[index];
        // setSelectedLocation(selectedItem); // 선택한 항목 정보 저장
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
                {/* <CloseButton onClick={closeModal}>X</CloseButton>
                <p>닫기 버튼 1개가 있고, 외부 영역을 누르면 모달이 닫혀요.</p> */}
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
