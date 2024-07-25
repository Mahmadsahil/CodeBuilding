import React from 'react'
import DSShimmer from './DSShimmer'
import AlgoShimmer from './AlgoShimmer'

const array = [0, 1, 2, 3, 4, 5, 6, 7]

const AppShimmer = () => {
    return (
        <div className='w-full flex flex-col gap-14'>
            <div className="md:w-8/12 flex flex-wrap justify-center gap-5 my-2 md:my-0 mx-auto  mt-10 md:mt-14 ">
                {
                    array.map(item => <DSShimmer key={item}/>)
                }
            </div>

            <div className="md:w-8/12 flex flex-wrap justify-center gap-5 my-2 md:my-0 mx-auto  ">
                {
                    array.map(item => <AlgoShimmer key={item}/>)
                }
            </div>

        </div>
    )
}

export default AppShimmer