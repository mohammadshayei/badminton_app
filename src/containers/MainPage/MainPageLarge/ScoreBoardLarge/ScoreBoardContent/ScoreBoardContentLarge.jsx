import React, { useEffect, useRef, useState } from 'react'
import ResultSetsLarger from './ResultSetsLarger/ResultSetsLarger';
import './ScoreBoardContentLarge.scss'
import ScorePlaceLarger from './ScorePlaceLarger/ScorePlaceLarger';
const ScoreBoardContentLarge = () => {
    const [innerWidth, setInnerWidth] = useState(0)

    const ref = useRef()
    useEffect(() => {
        setInnerWidth(ref.current.clientWidth)
    }, [ref])
    window.addEventListener('resize', () => { if (ref.current) setInnerWidth(ref.current.clientWidth) })

    return (
        <div className='scoreboard-content' ref={ref}>
            <div className='scoreboard-content-top-setcion'
                style={{ height: window.innerWidth < 1100 ? 0.32 * innerWidth : 0.28 * innerWidth }}
            >
                <div className='scoreboard-content-block-container'>
                    <ScorePlaceLarger score={8} color='blue' isBall={true} />
                </div>
                <div className='scoreboard-content-block-container'>
                    <ResultSetsLarger />
                </div>
                <div className='scoreboard-content-block-container'>
                    <ScorePlaceLarger score={6} color='black' />
                </div>
            </div>

        </div>
    )
}

export default ScoreBoardContentLarge
