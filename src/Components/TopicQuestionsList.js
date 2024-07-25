import React, { useState } from 'react'
import Question from './Question';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuestion } from '../Store/QuetionsSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import nullImage from "../Utils/Images/null.png"

const TopicQuestionsList = () => {
    const TopicDetails = useSelector(state => state.Questions );
    const { questions } = TopicDetails;
    const [questionsList, setQuestionsList] = useState(questions.questions )
    const [difficulty, setDifficulty] = useState('')

    const dispatch = useDispatch();
    const handleSelect = (e) => {
        const value = e.target.value;
        setDifficulty(value)
        if (value === "all") {
            return setQuestionsList(questions.questions)
        }

        const data = questions.questions.filter(question => question.difficulty === value);
        setQuestionsList(data)
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setTimeout(() => {
            const data = questions.questions.filter(data => data.question.toLowerCase().includes(value.toLowerCase()));
            setQuestionsList(data)
        }, 1000);
    }

    const handleQuestionClick = (item) => {
        dispatch(addQuestion(item))
    }

    if (TopicDetails.questions.questions.length === 0) {
        return (<div className='h-screen w-full flex justify-center items-center'>
            <LazyLoadImage className='w-64' src={nullImage} effect='blur' alt='null image' />
        </div>)
    }

    return (
        <>
            <div className='w-full flex flex-col items-center'>

                <header className='w-40 text-2xl p-2 my-4 text-center text-slate-600'>{questions.topic}</header>

                <form className='w-10/12 md:w-10/12 flex justify-between gap-2 shadow px-4 py-2'>
                    <div className='flex items-center gap-2 text-sm md:text-base'>
                        Difficulty :
                        <select className='text-slate-600 bg-slate-50 border text-sm md:text-base'
                            onChange={handleSelect}
                            value={difficulty}
                        >
                            <option value="all" className='font-normal'>All</option>
                            <option value="easy" className='font-normal text-green-600'>Easy</option>
                            <option value="medium" className='font-normal text-orange-600'>Medium</option>
                            <option value="hard" className='font-normal text-red-600'>Hard</option>
                        </select>
                    </div>
                    <input className='w-6/12 md:w-4/12 text-sm md:text-base px-2 py-1 border bg-slate-50' type='text' placeholder='Search..' onChange={handleSearch} />
                </form>

                <div className='w-11/12 md:w-10/12 my-2 '>
                    {questionsList.map((item, idx) => (
                        <Link key={item.difficulty + idx} to={"/editor"} onClick={() => handleQuestionClick(item)}>
                            <Question question={item.question} difficulty={item.difficulty} num={idx + 1} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TopicQuestionsList