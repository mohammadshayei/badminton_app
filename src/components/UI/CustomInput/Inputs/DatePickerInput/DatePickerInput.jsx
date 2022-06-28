import './DatePickerInput.scss'
import DatePicker, { } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useTheme } from '../../../../../styles/ThemeProvider'

const DatePickerInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='title-date-picker-container' >
            <p className='title-class-name'>{props.title}
                <span className="required"
                    style={{
                        color: theme.error
                    }}
                >
                    {(props.validation) && (props.validation.bdRequired && '*')}
                </span>
            </p>
            <DatePicker
                calendar={persian}
                locale={persian_fa}
                onChange={props.onChange}
                // fixMainPosition={true}
                portal
                placeholder='---- / -- / --'
                calendarPosition='top'
                value={props.value}
                minDate={props.elementConfig?.minDate ? props.elementConfig.minDate : ''}
                maxDate={props.elementConfig?.maxDate}
                inputClass='date-picker-container'
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: theme.darken_border_color,
                    outlineColor: theme.primary
                }}
            />
        </div>

    )
}

export default DatePickerInput
