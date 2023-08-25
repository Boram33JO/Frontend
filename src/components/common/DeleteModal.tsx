import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ReactComponent as Trash } from '../../assets/images/trash.svg'

interface Props {
    name: string;
    deleteToggle: React.Dispatch<React.SetStateAction<boolean>>;
    deleteButton: () => void;
}

const DeleteModal = ({ name, deleteToggle, deleteButton }: Props) => {
    return (
        <>
            <ModalBackground onClick={() => deleteToggle(false)} />
            <ModalContainer>
                <IconArea>
                    <StTrash />
                </IconArea>
                <MessageArea>
                    <P $size={"18px"}>{`정말 해당 ${name}을 삭제하시겠어요?`}</P>
                    <P $size={"14px"} $color={"#A6A3AF"}>{`삭제된 ${name}은 다시 복구할 수 없습니다.`}</P>
                </MessageArea>
                <DeleteButtonArea>
                    <DeleteModalButton onClick={() => deleteToggle(false)}>
                        취소
                    </DeleteModalButton>
                    <DeleteModalButton $delete={true} onClick={deleteButton}>
                        삭제
                    </DeleteModalButton>
                </DeleteButtonArea>
            </ModalContainer>
        </>
    )
}

export default DeleteModal

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
`

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 5;
    width: 320px;
    background-color: #2A282C;
    color: #FAFAFA;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    gap: 15px;
`

const IconArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 1px solid #544F5B;
    border-radius: 50%;
    background-color: #45424E;
`

const StTrash = styled(Trash)`
    width: 30px;
    height: 30px;
`

const MessageArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const P = styled.p< { $size?: string, $color?: string } >`
    color: ${props => props.$color ? props.$color : "#FAFAFA"};
    font-size: ${(props) => props.$size ? props.$size : "16px"};
    line-height: calc(100% + 6px);
    white-space: pre-wrap;
`

const DeleteButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 10px;
`

const DeleteModalButton = styled.div<{ $delete?: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    
    flex: 1 0 0;
    background: ${(props) => props.$delete ? "linear-gradient(135deg, #8084F4, #C48FED)" : "#45424E"};
    
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    color: ${(props) => props.$delete ? "#FAFAFA" : "#A6A3AF"};
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
`