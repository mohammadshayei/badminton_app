import './DatePickerInput.scss'
import DatePicker, { } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useTheme } from '../../../../../styles/ThemeProvider'
import { useState } from 'react'

const DatePickerInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [focus, setFocus] = useState(false);

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
                onClose={() => setFocus(false)}
                onOpen={() => setFocus(true)}
                calendar={persian}
                locale={persian_fa}
                {...props.elementConfig}
                onChange={props.onChange}
                // fixMainPosition={true}
                portal
                placeholder='---- / -- / --'
                calendarPosition='top'
                editable={false}
                value={props.value}
                minDate={props.elementConfig?.minDate ? props.elementConfig.minDate : ''}
                maxDate={props.elementConfig?.maxDate}
                inputClass='date-picker-container'
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: focus ? theme.primary : theme.darken_border_color,
                }}
            />
        </div>

    )
}

export default DatePickerInput
