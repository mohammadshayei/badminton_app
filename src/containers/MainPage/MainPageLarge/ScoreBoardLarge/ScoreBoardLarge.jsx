import React, { useEffect, useRef } from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import FooterScoreBoard from './FooterScoreBoard/FooterScoreBoard';
import PlayerBlockLarge from './PlayerBlockLarge/PlayerBlockLarge';
import ScoreBoardContentLarge from './ScoreBoardContent/ScoreBoardContentLarge';
import './ScoreBoardLarge.scss'
const ScoreBoardLarge = ({ setFooterHeight }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const ref = useRef()
    useEffect(() => {
        if (ref){
            console.log(ref.current.getBoundingClientRect().top + ref.current.getBoundingClientRect().height)
            console.log(ref.current.offsetTop)
            setFooterHeight( ref.current.getBoundingClientRect().height-17)
        }
    }, [ref])
    return (
        <div className='scoreboard-large-container' ref={ref} style={{
            background: `linear-gradient(150deg,${theme.primary_variant},${theme.primary})`,
        }}>
            <div className='scoreboard-large-top'>
                <PlayerBlockLarge />
                <ScoreBoardContentLarge />
                <PlayerBlockLarge />
            </div>
            <FooterScoreBoard />
        </div>
    )
}

export default ScoreBoardLarge
