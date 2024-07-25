import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import logo from "../Utils/Images/logo.png"

const Header = () => {
    return (
        <div className='h-20 w-full shadow flex items-center justify-center'>
            <LazyLoadImage className='w-52 md:w-64 ' src={logo} alt="logo" effect="blur"/>
        </div >
    )
}

export default Header