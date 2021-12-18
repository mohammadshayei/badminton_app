import React from 'react'
import './TitleTextArea.scss'
const TitleTextArea = (props) => {
    return (
        <div className='title-textarea-container' >
            <p className='title-class-name'>{props.title}</p>
            <textarea 
                className='title-textarea-element'
                {...props.elementConfig}
                value={props.value ? props.value : ''}
                style={{ ...props.inputStyle }}
                onChange={props.onChange}
            />
        </div>
    )
}

export default TitleTextArea
