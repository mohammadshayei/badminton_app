import { useState } from 'react';
import { useTheme } from '../../../../../styles/ThemeProvider';
import './MultiInputTitle.scss'

const MultiInputTitle = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [focus, setFocus] = useState(false);

    return (
        <div className='multi-input-title-wrapper'>
            <p className='title-class-name'>{props.title}
                <span className="required"
                    style={{
                        color: theme.error
                    }}
                >
                    {(props.validation) && (props.validation.required && '*')}
                </span>
            </p>
            <div className="input-box-warpper"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: focus ? theme.primary : theme.darken_border_color,
                }}
            >
                {
                    props.count > 0 && [...new Array(props.count)].map((_, index) => (
                        <div className='box-wrapper' key={index}>
                            <input
                                type="text"
                                value={props.value[index]}
                                onChange={(e) => {
                                    props.onChange(e, index)
                                }}
                            />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default MultiInputTitle
