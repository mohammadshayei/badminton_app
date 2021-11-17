import React, { useEffect, useState } from 'react'
import './PlayerBlockLarge.scss'
import IMAGE from '../../../../../assets/images/badminton_player.jfif'
import RoundedIcon from '../../../../../components/UI/Button/RoundedIcon/RoundedIcon'
import { useTheme } from '../../../../../styles/ThemeProvider'

const PlayerBlockLarge = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [imageSize, setImageSize] = useState('')

    const setSize = () => {
        if (window.innerWidth < 1050) setImageSize('140px')
        else if (window.innerWidth < 1366) setImageSize('150px')
        else if (window.innerWidth < 1536) setImageSize('180px')
        else if (window.innerWidth < 1920) setImageSize('210px')
        else setImageSize('240px')
    }

    useEffect(() => {
        setSize()
    }, [])
    window.addEventListener('resize', setSize)
    return (
        <div className='player-block-larger-container'>
            <img
                style={{ width: imageSize, height: imageSize }}
                className='player-block-larger-container-image' src={IMAGE} alt="badminton player" />
            <div className="player-block-larger-icon-container">
                <div className="player-block-larger-icon-container-top-section">
                    <RoundedIcon color='rgba(255, 255, 0,.8)' type='plus' />
                    <RoundedIcon color='rgba(255, 0, 0,.6)' type='minus' />

                </div>
                <div className="player-block-larger-icon-container-bot-section">
                    <RoundedIcon color='rgba(0, 0, 0,.6)' type='whistle' />

                </div>
            </div>
            {/* <div className="player-block-larger-right-section">
                <div className="player-block-larger-right-section-content"
                    style={{ backgroundColor: theme.background_color, height: blockSize, width: blockSize }}>
                </div>
            </div> */}
        </div>
    )
}

export default PlayerBlockLarge
