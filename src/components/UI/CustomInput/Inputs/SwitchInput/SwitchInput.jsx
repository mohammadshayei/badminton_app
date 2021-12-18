import React from 'react'
import './SwitchInput.scss'
import Switch from "react-switch";

const SwitchInput = (props) => {
    return (
        <div className='switch-input-container'>
            <p className='switch-input-title'>{props.title}</p>
            <Switch onChange={props.onChange} checked={props.value} />
        </div>
    )
}

export default SwitchInput
