import React from 'react'

const Question = ({ question, difficulty, num }) => {

    return (
        <div className='w-full flex justify-between gap-2 my-2 px-4 py-2 border-b hover:bg-slate-100 cursor-pointer'>
            <div className='flex gap-1'>
                <p className=''>{num}.</p>
                <p className=''>{question}</p>
            </div>
            <p className={`font-normal
             ${difficulty === "easy" ? "text-green-600" :
                    difficulty === "medium" ? "text-orange-400" :
                        difficulty === "hard" ? "text-red-500" : ""}  `}>{difficulty}</p>
        </div>
    )
}

export default Question