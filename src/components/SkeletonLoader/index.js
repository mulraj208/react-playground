import React from 'react';
import './style.css';

function SkeletonLoader() {
    const noOfSkeleton = Array(10).fill();

    return (
        <>
            {noOfSkeleton.map((item, index) => (
                <div key={`skeleton-${index}`} className="skeleton-post py-2 px-4 text-left flex items-center border-b">
                    <div className="flex flex-col h-full w-full pr-5">
                        <div className="line mt-3 rounded-lg h-5"/>
                    </div>
                    <div className="avatar ml-auto article-image w-12 h-12 border-radius-50-percent"/>
                </div>
            ))}
        </>
    )
}

export default SkeletonLoader;