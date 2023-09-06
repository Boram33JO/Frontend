import React from 'react'
import { styled } from 'styled-components'
import NotifyItem from './NotifyItem'

interface Props {
    data: any;
}

const NotifyWishlist = ({ data }: Props) => {
    return (
        <Container>
            <TitleSection>
                <TitleLeft>
                    <H3>좋아요 알림</H3>
                    <P>{data?.length}개</P>
                </TitleLeft>
                <P>
                    7일 후 자동 삭제됩니다.
                </P>
            </TitleSection>
            <NotifyList>
                {
                    data?.map((item: any) => {
                        return (
                            <NotifyItem
                                key={item.id}
                                type="like"
                                notifyId={item.id}
                                userId={item.userId}
                                postId={item.postId}
                                content={item.content}
                                nickname={item.nickname}
                                userImage={item.userImage}
                                createdAt={item.createdAt}
                                postTitle={item.postTitle}
                            />
                        )
                    })
                }
            </NotifyList>
        </Container>
    )
}

export default NotifyWishlist

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

    color: white;
    gap: 20px;
`

const TitleSection = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    width: 100%;
`

const TitleLeft = styled.div`
    display: flex;
    align-items: flex-end;

    gap: 4px;
`

const H3 = styled.h3`
    font-size: 20px;
    line-height: calc(150%);
    font-weight: 600;
`

const P = styled.p`
    color: #A19FAB;
    font-size: 14px;
    line-height: calc(150%);
    font-weight: 500;
`

const NotifyList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    gap: 20px;
`