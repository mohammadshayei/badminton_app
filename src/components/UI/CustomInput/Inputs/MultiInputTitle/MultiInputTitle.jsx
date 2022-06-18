import { useTheme } from '../../../../../styles/ThemeProvider';
import './MultiInputTitle.scss'

const MultiInputTitle = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

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
                style={{
                    backgroundColor: theme.border_color,
                    color: theme.on_background,
                }}
            >
                {
                    props.count > 0 && [...new Array(parseInt(props.count))].map((_, index) => (
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
