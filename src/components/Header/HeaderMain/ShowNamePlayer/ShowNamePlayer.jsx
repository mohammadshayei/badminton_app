import React from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import './ShowNamePlayer.scss'
const ShowNamePlayer = ({ title }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div
            className='show-name-player-container'
            style={{
                background: `linear-gradient(150deg,${theme.primary_variant},${theme.primary})`,
            }}
        >
            <p style={{color:theme.on_primary}}>
                 نام بازیکن : {title}
            </p>
        </div>
    )
}

export default ShowNamePlayer
