import Skeleton from 'react-loading-skeleton';

export const ColorMarkerSkeleton = () => {
    return (
        <div>
            <Skeleton width={window.innerWidth <= 768 ? 16 : 22}
                height={window.innerWidth <= 768 ? 16 : 22} />
        </div>
    )
}

