
import './CustomInput.scss'
import DatePickerInput from './Inputs/DatePickerInput/DatePickerInput';
import MultiInputTitle from './Inputs/MultiInputTitle/MultiInputTitle';
import SwitchInput from './Inputs/SwitchInput/SwitchInput';
import TitleInput from './Inputs/TitleInput/TitleInput';
import TitleTextArea from './Inputs/TitleTextArea/TitleTextArea';
import UnderlineInput from './Inputs/UnderlineInput/UnderlineInput';
import DropDown from './Inputs/DropDown/DropDown';
import RadioImageButton from './Inputs/RadioImageButton/RadioImageButton';
import OTPInput from './Inputs/OTPInput/OTPInput';
import { useTheme } from '../../../styles/ThemeProvider';

const CustomInput = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    let inputElement = null;
    let validationMessage = null;
    const inputContainerClasses = ['input-container']
    if (props.invalid && props.shouldValidate && props.touched) {
        inputContainerClasses.push('invalid')
        validationMessage =
            <p
                className='validtaion-message'
                style={{
                    color: theme.error,
                    ...props.errorStyle
                }}
            >{props.validationMessage}</p>;
    } else {
        if (props.hint)
            validationMessage =
                <p
                    className='validtaion-message'
                    style={{
                        opacity: "0.5",
                        ...props.errorStyle
                    }}
                >{props.hint}</p>;
    }

    switch (props.elementType) {
        case (elementTypes.input):
            inputElement = <input
                className={`input-element ${props.inputClassName}`}
                {...props.elementConfig}
                value={props.value ? props.value : ''}
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: theme.darken_border_color,
                    outlineColor: theme.primary,
                    ...props.inputStyle
                }}
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
        case elementTypes.otp:
            inputElement = <OTPInput
                boxes={props.boxes}
                style={{
                    // background: themeState.isDark
                    //     ? theme.surface_1dp
                    //     : theme.surface,
                    // color: theme.on_background,
                    ...props.style,
                }}
                onChange={props.onChange}
                config={{ ...props.config }}
                isOk={props.isOk}
            />

            break;

        default:
            inputElement = <input
                className={`input-element ${props.inputClassName}`}
                {...props.elementConfig}
                value={props.value}
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: theme.darken_border_color,
                    outlineColor: theme.primary,
                    ...props.inputStyle
                }}
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
    radioImageButton: 'radioImageButton',
    otp: 'otp',

}
