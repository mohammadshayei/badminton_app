import React from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../../styles/ThemeProvider';
import './ShowNamePlayer.scss'
const ShowNamePlayer = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const detail = useSelector(state => state.detail)
    return (
        <div
            className='show-name-player-container'
            style={{
                background: `linear-gradient(150deg,${theme.primary_variant},${theme.primary})`,
                width:'100px',
                height:'20px',

            }}
        >

        </div>
    )
}

export default ShowNamePlayer
