import React, { } from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../styles/ThemeProvider';
import './DetailScoreBoard.scss'
const ResultScoreBoard = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const detail = useSelector(state => state.detail)

    return (
        <div className="detail-scoreboard-wrapper"
            style={{
                height: detail.widthMode === 1 ? props.smallBoxSize : 'calc( 100% - 50px )',
                width: detail.widthMode === 1 ? 48 + props.boxSize : props.boxSize + 8,
                paddingTop: detail.widthMode === 1 ? '' : '.5rem',
                fontWeight: 'bold'


            }}>
            {
                detail.widthMode !== 1 && props.time &&
                <p className='detail-scoreboard-time'
                    style={{
                        textAlign: "center",
                        fontSize: "5rem",
                        lineHeight: "4rem",
                        color: "red"
                    }}>
                    {props.time}
                </p>

            }
            <div className="detail-scorebaord-container"
                style={{
                    flexDirection: detail.widthMode === 1 ? 'column' : 'row',
                }}
            >
                <div className="detail-scorebaord"
                    style={{
                        backgroundColor: theme.background_color,
                        height: props.smallBoxSize / 2,
                        width: props.smallBoxSize / 2,
                        maxWidth: props.boxSize / 2,
                        maxHeight: props.boxSize / 2,

                    }}>
                    <p>{props.teamAScore}</p>
                </div>
                <div className="detail-scorebaord"
                    style={{
                        backgroundColor: theme.background_color,
                        marginTop: ".2rem",
                        height: props.smallBoxSize / 2,
                        width: props.smallBoxSize / 2,
                        maxWidth: detail.widthMode !== 1 ? props.boxSize / 2 : '',
                        maxHeight: detail.widthMode !== 1 ? props.boxSize / 2 : '',
                        marginRight: detail.widthMode !== 1 ? '.5rem' : '',


                    }} >
                    <p>{props.teamBScore}</p>
                </div>
            </div>
            <div className="detail-scoreboard-content">
                {
                    detail.widthMode === 1 && props.time &&
                    <p className='detail-scoreboard-time'>
                        {props.time}
                    </p>

                }
                <p className='detail-scoreboard-title'
                    style={{ color: theme.on_primary }}>بازی سوم</p>
                <p className='detail-scoreboard-title' style={{ color: theme.on_primary }}>شماره زمین : 3</p>

            </div>
        </div >
    )
}

export default ResultScoreBoard
