import React from 'react'

const HeaderShimmer = () => {
    return (
        <div className='h-20 w-full flex justify-center items-center '>
            <div className='h-8 w-56 md:w-60 bg-slate-200 animate-pulse rounded-xl'></div>
        </div>
    )
}

export default HeaderShimmer