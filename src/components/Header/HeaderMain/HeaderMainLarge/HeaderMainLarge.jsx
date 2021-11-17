import React from 'react'
import './HeaderMainLarge.scss'
import ShowNamePlayer from '../ShowNamePlayer/ShowNamePlayer'
import Timer from '../Timer/Timer'
const HeaderMainLarge = () => {
    return (
        <div className='header-main-large-container'>
            <ShowNamePlayer title='شماره 1' />
            <Timer  />
            <ShowNamePlayer  title='شماره 1'/>

        </div>
    )
}

export default HeaderMainLarge
