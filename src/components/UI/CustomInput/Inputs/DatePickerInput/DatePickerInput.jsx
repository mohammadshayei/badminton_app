import React, { useEffect, useRef, useState } from 'react'
import './DatePickerInput.scss'
import DatePicker, { } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePickerView from './DatePickerView'
import { useTheme } from '../../../../../styles/ThemeProvider'

const DatePickerInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const ref = useRef()
    const [width, setWidth] = useState(0)
    useEffect(() => {
        if (ref.current) setWidth(ref.current.clientWidth)
    }, [ref])
    return (
        <div className='title-date-picker-container' ref={ref}>
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
                // calendarPosition='top'
                // fixMainPosition ={true}
                value={props.value}
                render={(value, openCalendar) => {
                    return (
                        <DatePickerView
                            width={width}
                            onClick={openCalendar}
                            value={value}

                        />
                    )
                }}
            />
        </div>

    )
}

export default DatePickerInput
