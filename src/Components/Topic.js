import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Topic = ({ topicName, imageSrc, size }) => {
    return (
        <div className="relative flex justify-center items-center cursor-pointer hover:scale-105 transition ease">
            <LazyLoadImage key={topicName} className={`${size} rounded-xl object-cover`} effect="blur" src={imageSrc} alt="topic bg" />
            <p className="absolute text-center text-xl md:text-2xl font-semibold text-white" >{topicName}</p>
        </div>
    )
}

export default Topic