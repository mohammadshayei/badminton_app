import React from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import FooterScoreBoard from './FooterScoreBoard/FooterScoreBoard';
import PlayerBlockLarge from './PlayerBlockLarge/PlayerBlockLarge';
import ScoreBoardContentLarge from './ScoreBoardContent/ScoreBoardContentLarge';
import './ScoreBoardLarge.scss'
const ScoreBoardLarge = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div className='scoreboard-large-container' style={{
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
