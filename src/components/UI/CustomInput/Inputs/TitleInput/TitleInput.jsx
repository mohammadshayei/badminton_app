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
                {
                    //props.status ===0 requrest time -- 1->valid result -- 2->invaid result
                    props.checkNeeded &&
                    <span>loading...</span>
                }
                {
                    props.status === 1 && <span>valid</span>
                }
                {
                    props.status === 2 && <span>invalid</span>
                }
            </p>
            <input
                className='input-element'
                {...props.elementConfig}
                value={props.value ? props.value : ''}
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: theme.darken_border_color,
                    outlineColor: theme.primary,
                    ...props.inputStyle
                }}
                onChange={props.onChange}
                onBlur={props.onExit}
            />
        </div>
    )
}

export default TitleInput
