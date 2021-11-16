import React from 'react'
import { useSelector } from 'react-redux';
import './MainPage.scss'
const MainPage = () => {
    const detail = useSelector((state) => state.detail);
    console.log(detail)
    return (
        <div>
            mainpage
        </div>
    )
}

export default MainPage
