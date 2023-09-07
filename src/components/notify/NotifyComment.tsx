import React from 'react'
import { styled } from 'styled-components'
import NotifyItem from './NotifyItem'
import NotifyEmpty from './NotifyEmpty';

interface Props {
    data: any;
}

const NotifyComment = ({ data }: Props) => {
    return (
        <Container>
            <TitleSection>
                <TitleLeft>
                    <H3>댓글 알림</H3>
                    <P>{data?.length}개</P>
                </TitleLeft>
                <P>
                    7일 후 자동 삭제됩니다.
                </P>
            </TitleSection>
            <NotifyList>
                {(data === undefined || data?.length === 0) ? <NotifyEmpty type="댓글" /> : (
                    data?.map((item: any) => {
                        return (
                            <NotifyItem
                                key={item.id}
                                type="comment"
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
                )}
            </NotifyList>
        </Container>
    )
}

export default NotifyComment

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