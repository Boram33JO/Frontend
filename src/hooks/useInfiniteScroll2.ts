import { useCallback, useEffect, useState } from 'react'
import instance from '../api/common';

export interface PaginationResponse<T> {
    content: T[];
    number: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    last: boolean;
    first: boolean;
}

interface InfiniteScrollOptions {
    fetchUrl: string;
    id: string | undefined;
    pageSize: number;
}

// Throttle 함수
const throttle = (handler: (...args: any[]) => void, timeout = 300) => {
    let invokedTime: number
    let timer: number
    return function (this: any, ...args: any[]) {
        if (!invokedTime) {
            handler.apply(this, args)
            invokedTime = Date.now()
        } else {
            clearTimeout(timer)
            timer = window.setTimeout(() => {
                if (Date.now() - invokedTime >= timeout) {
                    handler.apply(this, args)
                    invokedTime = Date.now()
                }
            }, Math.max(timeout - (Date.now() - invokedTime), 0))
        }
    }
}

const useInfiniteScroll2 = <T>({ fetchUrl, id, pageSize }: InfiniteScrollOptions) => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState<T[]>([]);
    const [isFetching, setFetching] = useState(false);
    const [hasNextPage, setNextPage] = useState(true);

    const fetchData = useCallback(async () => {
        const { data } = await instance.get<PaginationResponse<T>>(fetchUrl, {
            params: { page, size: pageSize },
        })
        setData(prevData => prevData.concat(data.content));
        setPage(data.number + 1);
        setNextPage(!data.last);
        setFetching(false);
    }, [fetchUrl, page, pageSize])

    useEffect(() => {
        const handleScroll = throttle(() => {
            const { scrollTop, offsetHeight } = document.documentElement
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setFetching(true)
            }
        })
        setFetching(true)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isFetching && hasNextPage) fetchData()
        else if (!hasNextPage) setFetching(false)
    }, [isFetching])

    useEffect(() => {
        setFetching(true);
        setNextPage(true);
        setData([]);
        setPage(0);
    }, [id])

    return { data, isFetching }
}

export default useInfiniteScroll2