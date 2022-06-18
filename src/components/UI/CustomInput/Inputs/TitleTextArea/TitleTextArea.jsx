import React from 'react'
import { useTheme } from '../../../../../styles/ThemeProvider';
import './TitleTextArea.scss'

const TitleTextArea = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='title-textarea-container' >
            <p className='title-class-name'>{props.title}
                <span className="required"
                    style={{
                        color: theme.error
                    }}
                >
                    {(props.validation) && (props.validation.required && '*')}
                </span>
            </p>
            <textarea
                className='title-textarea-element'
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

export default TitleTextArea
