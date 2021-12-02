import React from 'react'
import LOGO from '../../../assets/images/logo.png'
import LOGO_TYPE from '../../../assets/images/logo_type.png'
const HeaderAuth = () => {
    return (
        <div className='header-auth-container'>
            <img className='logo' src={LOGO} alt="logo" />
            <img className='logo-type' src={LOGO_TYPE} alt="logo type" />
        </div>
    )
}

export default HeaderAuth
