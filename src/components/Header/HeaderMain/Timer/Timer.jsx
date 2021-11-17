import React, { useState } from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import './Timer.scss'
const Timer = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [date, setDate] = useState(new Date())
    setInterval(() => {
        setDate(new Date())
    }, 1000);
    return (
        <div className='timer-container'>
            <p style={{color:theme.primary}}>
                {date.getHours() } : {date.getMinutes()}
            </p>
        </div>
    )
}

export default Timer
