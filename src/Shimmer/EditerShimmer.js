import React from 'react'

const EditerShimmer = () => {
    return (
        <div className='w-full flex flex-col md:flex-row p-4'>
            <div className='md:w-6/12 h-80 md:h-96 m-8 bg-slate-100 animate-pulse'></div>
            <div className='md:w-6/12 h-80 md:h-96 m-8 bg-slate-100 animate-pulse'></div>
        </div>
    )
}

export default EditerShimmer