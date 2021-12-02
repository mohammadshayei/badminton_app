
import './CustomInput.scss'
import UnderlineInput from './Inputs/UnderlineInput/UnderlineInput';

const CustomInput = (props) => {


    let inputElement = null;
    let validationMessage = null;
    const inputClasses = ['input-element']
    const inputContainerClasses = ['input-container']
    if (props.invalid && props.shouldValidate && props.touched) {
        inputContainerClasses.push('invalid')
        validationMessage =
            <p
                className='validtaion-message'
                style={{ ...props.errorStyle }}
            >{props.validationMessage}</p>;
    }

    switch (props.elementType) {
        case (elementTypes.input):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value ? props.value : ''}
                style={{ ...props.inputStyle }}
                onChange={props.onChange}
            />
            break;
        case (elementTypes.underlineInput):
            inputElement = <UnderlineInput {...props} />
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                style={{ ...props.inputStyle }}
                onChange={props.onChange}
            />
            break;
    }

    return (
        <div className='input-container' style={{ ...props.inputContainer }}>
            {inputElement}
            {validationMessage}
        </div>
    )
};

export default CustomInput;
export const elementTypes = {
    input: 'input',
    underlineInput: 'underlineInput'
}
