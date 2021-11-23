import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../styles/ThemeProvider';
import FooterScoreBoard from './FooterScoreBoard/FooterScoreBoard';
import PlayerBlock from './PlayerBlock/PlayerBlock';
import DetailScoreBoard from './DetailScoreBoard/DetailScoreBoard';
import './ScoreBoard.scss'
import { useSelector } from 'react-redux';
const ScoreBoard = (props) => {
    const [imageSize, setImageSize] = useState('')
    const [fontSize, setFontSize] = useState('')
    const [boxSize, setBoxSize] = useState('')
    const [smallBoxSize, setSmallBoxSize] = useState('')

    const detail = useSelector(state => state.detail)

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const setSize = () => {
        if (!detail.widthMode || !detail.heightMode) return

        if (window.innerWidth < 280) {
            setFontSize('5rem')
            if (detail.widthMode === 1)
                setBoxSize((window.innerHeight - 150) / 2.75)
            else
                setBoxSize((window.innerWidth - 150) / 2.75)
            setSmallBoxSize(`${(window.innerHeight - 150) * (3 / 11)}`)

        }
        else if (window.innerWidth < 340) {
            setImageSize('140px')
            setFontSize('7rem')
            if (detail.widthMode === 1)
                setBoxSize((window.innerHeight - 150) / 2.75)
            else
                setBoxSize((window.innerWidth - 150) / 2.75)
            setSmallBoxSize(`${(window.innerHeight - 150) * (3 / 11)}`)

        }
        else if (window.innerWidth < 440) {
            setFontSize('8rem')
            if (detail.widthMode === 1)
                setBoxSize((window.innerHeight - 150) / 2.75)
            else
                setBoxSize((window.innerWidth - 150) / 2.75)

            setSmallBoxSize(`${(window.innerHeight - 150) * (3 / 11)}`)
        }
        else if (window.innerWidth < 600) {
            setFontSize('9rem')
            if (detail.widthMode === 1)
                setBoxSize((window.innerHeight - 150) / 2.75)
            else
                setBoxSize((window.innerWidth - 150) / 2.75)

            setSmallBoxSize(`${(window.innerHeight - 150) * (3 / 11)}`)

        }
        else if (window.innerWidth < 900) {
            setImageSize('180px')
            setFontSize('8rem')
            if (detail.heightMode === 1) {
                setBoxSize((window.innerWidth - 150) / 3.25)
                setSmallBoxSize(`${(window.innerWidth - 150) * (4 / 11)}`)
            }
            else {
                setBoxSize((window.innerWidth - 150) / 2.75)
                setSmallBoxSize(`${(window.innerWidth - 150) * (3 / 11)}`)
            }


        }
        else {
            setImageSize('240px')
            setFontSize('10rem')
            if (detail.heightMode === 1) {
                setBoxSize((window.innerWidth - 150) / 3.4)

            } else {

                setBoxSize((window.innerWidth - 150) / 2.75)
            }
            setSmallBoxSize(`${(window.innerHeight - 150) * (3 / 11)}`)

        }

    }
    useEffect(() => {
        setSize()
    }, [detail])
    window.addEventListener('resize', setSize)
    return (
        <div
            className='scoreboard-container'
            style={{
                backgroundColor: theme.primary,
                flexDirection: detail.widthMode === 1 ? 'column' : "row",
                alignItems: detail.widthMode !== 1 ? 'flex-start' : 'center',
                justifyContent: detail.widthMode !== 1 ? 'center' : "",
                paddingTop: detail.widthMode !== 1 ? '1rem' : '0',
            }}
        >
            <PlayerBlock
                imageSize={imageSize}
                fontSize={fontSize}
                boxSize={boxSize}
                titleTop={props.header && 'بازیکن شماره 1'}
                score='11'
                scoreColor='blue'
                isBall={true}
                isLeft={detail.widthMode > 1}
            />
            <DetailScoreBoard
                boxSize={boxSize}
                smallBoxSize={smallBoxSize}
                time='09:21' teamBScore={0} teamAScore={1} />
            <PlayerBlock
                imageSize={imageSize}
                fontSize={fontSize}
                boxSize={boxSize}
                titleBottom={props.header && detail.widthMode === 1 && 'بازیکن شماره 2'}
                titleTop={props.header && detail.widthMode > 1 && 'بازیکن شماره 2'}
                score='20'
                scoreColor='black'
                isBall={false}
                isLeft={false}
            />
            <FooterScoreBoard boxSize={boxSize} />

        </div>
    )
}

export default ScoreBoard
