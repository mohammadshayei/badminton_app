import React from 'react'
import { useTheme } from '../../../../../styles/ThemeProvider';

const DatePickerView = ({ onClick, value, width }) => {

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div
            className='date-picker-container'
            onClick={onClick}
            style={{
                width,
                backgroundColor: theme.surface,
                color: theme.on_surface,
                borderColor: theme.darken_border_color,
            }}
        >
            <p className='title-date-picker'>{value ? value : '---- / -- / --'} </p>
        </div>
    )
}

export default DatePickerView
