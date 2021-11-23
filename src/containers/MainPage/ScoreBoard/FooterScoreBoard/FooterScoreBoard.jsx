import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../styles/ThemeProvider';
import './FooterScoreBoard.scss'
const FooterScoreBoard = (props) => {
    const detail = useSelector(state => state.detail)

    const [data, _] = useState(
        [
            {
                id: 1,
                teamA: '11',
                teamB: '21',
                finished: true
            },
            {
                id: 2,
                teamA: '21',
                teamB: '15',
                finished: true

            },
            {
                id: 3,
                teamA: '0',
                teamB: '0',
                finished: false
            }
        ])
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div
            className="footer-scoreboard-container"
            style={{
                maxWidth: detail.widthMode === 1 && 1.5 * props.boxSize,
                width: '100%',
                height: 45,
            }}

        >
            {
                data.map(item => {
                    return (
                        <div
                            key={item.id}
                            className="footer-scoreboard-item"
                            style={{
                                backgroundColor: theme.background_color,
                                width: detail.widthMode === 1 ? '33%' : '150px',
                                margin: detail.widthMode > 1 ? '0rem .3rem' : '0',
                            }}
                        >
                            {
                                item.finished ?
                                    <p
                                        style={{
                                            // fontSize: sizeMode === 2 && '2.7rem',
                                        }}
                                    >
                                        <span>{item.teamA}</span>-<span>{item.teamB}</span></p>
                                    : null
                            }
                        </div>
                    )
                })
            }
        </div >
    )

}

export default FooterScoreBoard
