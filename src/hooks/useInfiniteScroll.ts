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

interface InfiniteScrollOptions<T> {
    initialData: T[];
    fetchUrl: string;
    id: string | undefined;
    pageSize: number;
}

const useInfiniteScroll = <T>({ initialData, fetchUrl, id, pageSize }: InfiniteScrollOptions<T>) => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState<T[]>(initialData);
    const [isFetching, setFetching] = useState(true);
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
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setFetching(true)
            }
        }
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

export default useInfiniteScroll