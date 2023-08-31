import ListItemSkeleton from "../common/ListItemSkeleton";

const LoadingSkeleton = () => {
    const dummy = Array.from({ length: 10 }, (_, i) => i);

    return (
        <>
            {dummy.map((_, index) => {
                return <ListItemSkeleton key={index} />
            })}
        </>
    )
}

export default LoadingSkeleton