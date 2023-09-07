import React from 'react'
import { styled } from 'styled-components';
import { ReactComponent as TitleSVG } from "../../assets/images/login_signup_profile/icon_title.svg";
import { useMutation, useQueryClient } from 'react-query';
import { deleteNotification } from '../../api/notify';
import { toast } from 'react-hot-toast';
import { displayedAt, getProfileImage } from '../../utils/common';
import { useNavigate } from 'react-router-dom';

interface Props {
    type?: string;
    notifyId: number;
    userId?: number;
    postId?: number;
    nickname?: string;
    userImage?: string;
    createdAt: string;
    content?: string;
    postTitle?: string;
}

const NotifyItem = ({ type, userId, postId, notifyId, nickname, userImage, createdAt, content, postTitle }: Props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const clickListItem = () => {
        type === "follow" ? navigate(`/profile/${userId}`) : navigate(`/detail/${postId}`);
    }

    const clickCheckButton = () => {
        commentMutation.mutate();
    }

    const commentMutation = useMutation(() => deleteNotification(notifyId), {
        onSuccess: () => {
            queryClient.invalidateQueries("notify");
            toast.success('알림 확인 완료');
        },
        onError: () => {
            toast.error('알림 확인 실패');
        }
    });

    return (
        <Container>
            <InnerContainer onClick={clickListItem}>
                <UserThumbnail $src={getProfileImage(userImage)} />
                <NotifyContent>
                    <NotifyTop>
                        <StP>{type === "comment" ? `${content}` : `${nickname}`}</StP>
                    </NotifyTop>
                    <NotifyBottom>
                        {type === "comment" && (
                            <>
                                <StP $color="#A19FAB">by. {nickname}</StP>
                                <Divider />
                            </>
                        )}
                        {type === "wishlist" && (
                            <>
                                <TitleSVG />
                                <StP $color="#A19FAB">{postTitle}</StP>
                                <Divider />
                            </>
                        )}
                        <StP $color="#A19FAB">{displayedAt(createdAt)}</StP>
                    </NotifyBottom>
                </NotifyContent>
            </InnerContainer>
            <CheckButton onClick={clickCheckButton}>확인</CheckButton>
        </Container>
    )
}

export default NotifyItem

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    gap: 10px;
    cursor: pointer;
`

const UserThumbnail = styled.div<{ $src?: string }>`
    width: 48px;
    height: 48px;
    background: url(${(props) => props.$src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #ECECEC;
    border-radius: 50%;
`

const NotifyContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`

const NotifyTop = styled.div`
    
`

const NotifyBottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

const StP = styled.p<{ $color?: string }>`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: pre-line;
    overflow: hidden;

    color: ${(props) => props.$color || "#FAFAFA"};
    font-size: 16px;
    font-weight: 500;
    line-height: calc(150%);
`

const CheckButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    height: 100%;
    color: #FAFAFA;
    font-size: 14px;
    font-weight: 600;
    line-height: calc(150%);
    box-sizing: border-box;
    padding: 5px;
    cursor: pointer;
`

const Divider = styled.div`
    height: 14px;
    width: 1.5px;
    border-radius: 1.5px;
    background-color: #A19FAB;
    padding: 0;
`