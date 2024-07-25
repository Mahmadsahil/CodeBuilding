import React from 'react'

const QuestionsListShimmer = () => {
const array=[0,1,2,3,4,5,6,7]
    return (
        <>
            <div className='w-full'>
                <div className='w-10/12 h-8 bg-slate-100 mx-auto animate-pulse mt-28'></div>
                {
                    array.map(item => (
                        <div className='w-8/12 h-4 bg-slate-100 mx-auto animate-pulse my-8'></div>
                    ))
                }
            </div>
        </>
    )
}

export default QuestionsListShimmer