import React from 'react'
import './SwitchInput.scss'
import Switch from "react-switch";
import { useTheme } from '../../../../../styles/ThemeProvider';

const SwitchInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='switch-input-container'>
            <p className='switch-input-title'>{props.title}</p>
            <Switch
                onChange={props.onChange}
                checked={props.value}
                offColor='#999'
                onColor={theme.primary}
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={18}
                height={20}
                width={40}
            />
        </div>
    )
}

export default SwitchInput
