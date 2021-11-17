import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../../../styles/ThemeProvider';
import './ScorePlaceLarger.scss'
import IMAGE from '../../../../../../assets/images/badminton_ball.png'
const ScorePlaceLarger = ({ color, score, isBall }) => {
    const [fontSize, setFontSize] = useState('')

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const setSize = () => {
        if (window.innerWidth < 1050) setFontSize('8rem')
        else if (window.innerWidth < 1366) setFontSize('12rem')
        else if (window.innerWidth < 1536) setFontSize('15rem')
        else if (window.innerWidth < 1920) setFontSize('17rem')
        else setFontSize('20rem')
    }

    useEffect(() => {
        setSize()
    }, [])
    window.addEventListener('resize', setSize)
    return (
        <div className='score-place-larger-container'
            style={{ backgroundColor: theme.background_color, color }}
        >
            <p style={{ fontSize }}>
                {score}
            </p>
            {
                isBall &&
                < img className='badminton-ball' src={IMAGE} alt="ball" />
            }
        </div>
    )
}

export default ScorePlaceLarger
