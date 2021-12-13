import React from 'react'
import './TitleInput.scss'
const TitleInput = (props) => {
    return (
        <div className='title-input-container' >
            <p className='title-class-name'>{props.title}</p>
            <input
                className='title-input-element'
                {...props.elementConfig}
                value={props.value ? props.value : ''}
                style={{ ...props.inputStyle }}
                onChange={props.onChange}
            />
        </div>
    )
}

export default TitleInput
