import React, { useEffect, useRef, useState } from 'react'
import './DatePickerInput.scss'
import DatePicker, { } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePickerView from './DatePickerView'
const DatePickerInput = (props) => {
    const ref = useRef()
    const [width, setWidth] = useState(0)
    useEffect(() => {
        if (ref.current) setWidth(ref.current.clientWidth)
    }, [ref])
    return (
        <div className='title-date-picker-container' ref={ref}>
            <p className='title-class-name'>{props.title}</p>
            <DatePicker
                calendar={persian}
                locale={persian_fa}
                onChange={props.onChange}
                value={props.value}
                render={(value, openCalendar) => {
                    return (
                        <DatePickerView
                            width={width}
                            onClick={openCalendar}
                            value={value} />
                    )
                }}
            />
        </div>

    )
}

export default DatePickerInput
