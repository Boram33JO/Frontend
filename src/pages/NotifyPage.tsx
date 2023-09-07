import React, { useEffect, useRef, useState } from 'react'
import { EventSourcePolyfill } from "event-source-polyfill";
import { getNotification } from '../api/notify';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config/configStore';
import NotifyWishlist from '../components/notify/NotifyWishlist';
import NotifyNavbar from '../components/notify/NotifyNavbar';
import NotifyComment from '../components/notify/NotifyComment';
import NotifyFollow from '../components/notify/NotifyFollow';
import { toast } from 'react-hot-toast';


const NotifyPage = () => {
    const queryClient = useQueryClient();
    const sse = useRef<EventSourcePolyfill | null>(null);
    const [page, setPage] = useState<number>(0);
    const loginUser = useSelector((state: RootState) => state.user);
    const [comments, setComments] = useState<any>();
    const [wishlists, setWishlists] = useState<any>();
    const [follows, setFollows] = useState<any>();
    const { data, isLoading, isError, } = useQuery("notifications", getNotification,
        {
            refetchOnWindowFocus: false,
            enabled: loginUser.isLogin,
            onSuccess: (data) => {
                const tempWishlists = data.notificationResponses.filter((item: any) => {
                    return item.notificationType === "WISHLIST"
                })
                const tempComments = data.notificationResponses.filter((item: any) => {
                    return item.notificationType === "COMMENT"
                })
                const tempFollows = data.notificationResponses.filter((item: any) => {
                    return item.notificationType === "FOLLOW"
                })
                setWishlists(tempWishlists);
                setComments(tempComments);
                setFollows(tempFollows);
            }
        }
    );

    return (
        <>
            <NotifyNavbar page={page} setPage={setPage} />
            {page === 0 && <NotifyWishlist data={wishlists} />}
            {page === 1 && <NotifyComment data={comments} />}
            {page === 2 && <NotifyFollow data={follows} />}
        </>
    )
}

export default NotifyPage