import React from 'react'

const DatePickerView = ({ onClick, value ,width}) => {
    return (
        <div className='date-picker-container' onClick={onClick} style={{width}} >
            <p className='title-date-picker'>{value ? value : '---- / -- / --'} </p>
        </div>
    )
}

export default DatePickerView
