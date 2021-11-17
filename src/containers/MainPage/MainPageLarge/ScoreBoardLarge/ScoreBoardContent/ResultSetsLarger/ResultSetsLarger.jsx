import React from 'react'
import { useTheme } from '../../../../../../styles/ThemeProvider';
import './ResultSetsLarger.scss'
const ResultSetsLarger = () => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div className='result-sets-larger'>
            <div className="result-sets-larger-top-section">
                <div className="result-sets-larger-top-section-content"
                    style={{ backgroundColor: theme.background_color ,marginRight:'.5rem'}}>
                    <p>1</p>
                </div>
                <div className="result-sets-larger-top-section-content"
                    style={{ backgroundColor: theme.background_color }}>
                    <p>1</p>
                </div>
            </div>
            <div className="result-sets-larger-bot-section">
                <p style={{ color: theme.on_primary }}>بازی سوم</p>
                <p style={{ color: theme.on_primary }}>شماره زمین : 2</p>

            </div>
        </div>
    )
}

export default ResultSetsLarger
