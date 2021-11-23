import React, { useEffect, useState } from 'react'
import './MainPage.scss'
import { useTheme } from '../../styles/ThemeProvider';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import { useSelector } from 'react-redux';
import FooterMainPage from './FooterMainPage/FooterMainPage'
import HeaderMainPage from './HeaderMainPage/HeaderMainPage';
const MainPage = () => {
    const [clicked, setClicked] = useState(false)
    const [screenOrientation, setScreenOrientation] = useState('portrait')
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const menuButonClickHandler = () => setClicked(!clicked);
    const detail = useSelector(state => state.detail)
    const isPortraitMode = () => {
        return screenOrientation === 'portrait';
    }
    const setScreenOrientationFunciton = () => {
        if (window.matchMedia("(orientation: portrait)").matches) {
            setScreenOrientation('landscape')
        }
        else if (window.matchMedia("(orientation: landscape)").matches) {
            setScreenOrientation('portrate')
        }
    }
    useEffect(() => {
        window.addEventListener('orientationchange', setScreenOrientationFunciton);
    }, [])
    useEffect(() => {
        // console.log(screenOrientation)
    }, [screenOrientation])
    if(detail.widthMode !== 1 && detail.heightMode > 1)console.log('real?')
    console.log(detail.widthMode)
    return (
        <div
            className='main-page-container'
            style={{ backgroundColor: theme.background_color }}
        >
            <div className='menu-icon' onClick={menuButonClickHandler}>
                <i style={{ color: theme.on_primary }}
                    className={clicked ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            {
                detail.widthMode !== 1 && detail.heightMode > 1 && <HeaderMainPage />

            }
            <ScoreBoard header={detail.heightMode === 1} isVertical={detail.widthMode === 1} />
            {
                detail.heightMode === 3 && <FooterMainPage />
            }

        </div>
    )
}

export default MainPage
