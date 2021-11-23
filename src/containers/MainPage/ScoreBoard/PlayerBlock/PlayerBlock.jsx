import React, { useEffect, useRef, useState } from 'react'
import './PlayerBlock.scss'
import PROFILE_IMAGE from '../../../../assets/images/badminton_player.jfif'
import BALL_IMAGE from '../../../../assets/images/badminton_ball.png'
import RoundedIcon from '../../../../components/UI/Button/RoundedIcon/RoundedIcon'
import { useTheme } from '../../../../styles/ThemeProvider'
import { useSelector } from 'react-redux'

const PlayerBlock = (props) => {
    const [header, setHeader] = useState(false)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const scoreDivRef = useRef()
    const detail = useSelector(state => state.detail)
    useEffect(() => {
        if (detail.heightMode === 1) setHeader(true)
        else setHeader(false)
    }, [detail])
    return (
        <div className='player-block-container'
            style={{ flexDirection: props.isLeft ? 'row' : 'row-reverse' }}>
            <div className="player-block-action-container">
                {detail.widthMode > 2 &&
                    <img
                        style=
                        {{
                            width: props.imageSize,
                            height: props.imageSize
                        }}
                        className='player-block-image' src={PROFILE_IMAGE} alt="badminton player" />}

                <div className="player-block-icon-container"
                    style={{
                        height:
                            header ? scoreDivRef.current && scoreDivRef.current.clientHeight - 25 :
                                scoreDivRef.current && scoreDivRef.current.clientHeight,
                        paddingTop: header ? props.titleTop ? 25 : 0 : 0,
                        paddingBottom: header ? props.titleBottom ? 25 : 0 : 0,
                        display: detail.widthMode < 3 ? 'flex' : '',
                        flexDirection: detail.widthMode < 3 ? 'column' : '',
                        alignItems: detail.widthMode < 3 ? 'center' : '',
                        justifyContent: detail.widthMode < 3 ? 'center' : "",
                    }}>
                    {
                        detail.widthMode > 2 ?
                            <>
                                <div className="player-block-icon"
                                    style={{ justifyContent: 'space-around' }}>
                                    <RoundedIcon
                                        color='rgba(255, 255, 0,.8)'
                                        type='plus' />
                                    <RoundedIcon
                                        color='rgba(255, 0, 0,.6)'
                                        type='minus' />

                                </div>
                                <div className="player-block-icon" style={{ justifyContent: 'center' }}>
                                    <RoundedIcon
                                        color='rgba(0, 0, 0,.6)'
                                        type='whistle' />
                                </div>
                            </> :
                            <>
                                <RoundedIcon

                                    color='rgba(255, 255, 255,1)'
                                    style={{}}
                                    type='plus'
                                    size={!header ? '4rem' : '2rem'}
                                    fontSize={!header && '2.5rem'}

                                />
                                <RoundedIcon
                                    color='rgba(255, 255, 255,1)'
                                    style={{ marginTop: detail.widthMode < 3 ? '1rem' : '' }}
                                    type='minus'
                                    size={!header ? '4rem' : '2rem'}
                                    fontSize={!header && '2.5rem'}


                                />
                                <RoundedIcon
                                    color='rgba(255, 255, 255,1)'
                                    style={{ marginTop: detail.widthMode < 3 ? '1rem' : '' }}
                                    type='whistle'
                                    size={!header ? '4rem' : '2rem'}
                                    fontSize={!header && '2.5rem'}

                                />

                            </>
                    }
                </div>
            </div>
            <div className='score-place-and-title-container'
                style={{
                    marginRight: props.isLeft ? detail.widthMode < 3 ? '1rem' : 0 : 0,
                    marginLeft: !props.isLeft ? detail.widthMode < 3 ? '1rem' : 0 : 0

                }}
            >
                {
                    props.titleTop && <p className='score-place-title'
                        style={{ color: theme.on_primary, marginBottom: '.2rem' }}>{props.titleTop}</p>
                }
                <div className='score-place-container'
                    ref={scoreDivRef}
                    style={{
                        backgroundColor: theme.background_color,
                        color: props.scoreColor,
                        height: props.boxSize,
                        width: props.boxSize
                    }}
                >
                    <p
                        style={{ fontSize: props.fontSize }}
                    >
                        {props.score}
                    </p>
                    {
                        props.isBall &&
                        < img className='badminton-ball' src={BALL_IMAGE} alt="ball" />
                    }
                </div>
                {
                    props.titleBottom && <p className='score-place-title'
                        style={{ color: theme.on_primary, marginTop: '.2rem' }}>{props.titleBottom}</p>
                }
            </div>
        </div >
    )
}

export default PlayerBlock
