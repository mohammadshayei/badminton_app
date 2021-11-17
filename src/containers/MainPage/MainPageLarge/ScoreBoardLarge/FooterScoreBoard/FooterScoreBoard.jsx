import React from 'react'
import { useTheme } from '../../../../../styles/ThemeProvider';
import './FooterScoreBoard.scss'
const FooterScoreBoard = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const data = [
        {
            scoreA: '21',
            scoreB: '18'
        },
        {
            scoreA: '13',
            scoreB: '21'
        },
        {
            scoreA: '',
            scoreB: ''
        }
    ]
    return (
        <div className='fotter-scoreboard'>
            {
                data.map(item => {
                    return (
                        <div className='fotter-scoreboard-item' style={{ backgroundColor: theme.background_color }} >
                            <p>
                                {item.scoreA} - {item.scoreB}
                            </p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default FooterScoreBoard
