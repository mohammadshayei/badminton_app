import React from 'react'
import { useTheme } from '../../../../../styles/ThemeProvider';
import './TitleInput.scss'

const TitleInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='title-input-container' style={{ ...props.inputContainer }}>
            <p className='title-class-name'>{props.title}
                <span className="required"
                    style={{
                        color: theme.error
                    }}
                >
                    {(props.validation) && (props.validation.required && '*')}
                </span>
            </p>
            <input
                className='input-element'
                {...props.elementConfig}
                value={props.value ? props.value : ''}
                style={{
                    backgroundColor: theme.border_color,
                    color: theme.on_background,
                    ...props.inputStyle
                }}
                onChange={props.onChange}
            />
        </div>
    )
}

export default TitleInput
