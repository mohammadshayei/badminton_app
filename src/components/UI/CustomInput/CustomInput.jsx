
import './CustomInput.scss'
import DatePickerInput from './Inputs/DatePickerInput/DatePickerInput';
import MultiInputTitle from './Inputs/MultiInputTitle/MultiInputTitle';
import SwitchInput from './Inputs/SwitchInput/SwitchInput';
import TitleInput from './Inputs/TitleInput/TitleInput';
import TitleTextArea from './Inputs/TitleTextArea/TitleTextArea';
import UnderlineInput from './Inputs/UnderlineInput/UnderlineInput';
import DropDown from './Inputs/DropDown/DropDown';
import RadioImageButton from './Inputs/RadioImageButton/RadioImageButton';

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
        case (elementTypes.titleInput):
            inputElement = <TitleInput {...props} />
            break;
        case (elementTypes.datePicker):
            inputElement = <DatePickerInput {...props} />
            break;
        case (elementTypes.switchInput):
            inputElement = <SwitchInput {...props} />
            break;
        case (elementTypes.titleTextarea):
            inputElement = <TitleTextArea {...props} />
            break;
        case (elementTypes.multiInputTitle):
            inputElement = <MultiInputTitle {...props} />
            break;
        case (elementTypes.dropDown):
            inputElement = <DropDown {...props} />
            break;
        case (elementTypes.radioImageButton):
            inputElement = <RadioImageButton {...props} />
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
    underlineInput: 'underlineInput',
    titleInput: 'titleInput',
    datePicker: 'datePicker',
    switchInput: 'switchInput',
    titleTextarea: 'titleTextarea',
    multiInputTitle: 'multiInputTitle',
    dropDown: 'dropDown',
    radioImageButton: 'radioImageButton'
}
