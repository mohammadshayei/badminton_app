import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { searchUserByPhone, sendSms } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import TransparentButton from "../../../components/UI/Button/TransparentButton/TransparentButton";
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { useTheme } from "../../../styles/ThemeProvider";
import { onChange } from "../../../utils/authFunction";

const GetPhoneNumber = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [error, setError] = useState(null)
    const [dialog, setDialog] = useState(null)
    const [order, setOrder] = useState({
        phone: {
            value: '',
            elementType: 'input',
            elementConfig: {
                inputMode: "numeric",
                placeholder: stringFa.phone,
                type: 'text',
                pattern: "[0-9]+",
                maxLength: 11,
            },
            // validationMessage: stringFa.phone_error,
            invalid: false,
            validation: {
                isRequired: true,
                minLength: 11,
                maxLength: 11,
                isNumeric: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false

        },
    })
    let navigate = useNavigate();
    const themeState = useTheme();
    const theme = themeState.computedTheme;


    const generateCode = (length) => {
        var a =
            "1234567890".split(
                ""
            );
        var b = [];
        for (var i = 0; i < length; i++) {
            var j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    };
    const onClick = async () => {
        setError(null)
        setDialog(null)
        setIsLoading(true)
        let phoneExist = await searchUserByPhone(order.phone.value)
        if (phoneExist) {
            setError(stringFa.phone_exist)
            setIsLoading(false)
            return;
        }
        let code = generateCode(5)
        props.setCode(code)
        let smsSend = await sendSms(code, order.phone.value)
        if (smsSend) {
            setDialog(<ErrorDialog type="success">{stringFa.code_sent}</ErrorDialog>)
            navigate(`/signup?p=2&phone=${order.phone.value}`);
        }
        else {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        return () => {
        }
    }, [])
    const goToLogin = () => {
        navigate('/login')
    }
    return (
        <div className='section-container'
            style={{
                backgroundColor: theme.surface
            }}
        >
            {dialog}
            <div className="title-text"
                style={{ color: theme.primary }}
            >
                {stringFa.register_welcome_title}
            </div>
            <div className="error-text under-title"
                style={{
                    color: theme.error
                }}
            >
                {error}
            </div>
            {Object.entries(order).map(([k, v]) =>
                <CustomInput
                    key={k}
                    {...v}
                    inputStyle={{ direction: "ltr" }}
                    onChange={(e) => {
                        setError(null)
                        onChange(e.target.value, k, order, setOrder, setFormIsValid)
                    }}
                />)}
            <div className="buttons-wrapper">
                <Button
                    loading={isLoading}
                    onClick={onClick}
                    config={{ disabled: !formIsValid }}
                >
                    {stringFa.send_code}
                </Button>
                <TransparentButton
                    config={{ disabled: isLoading }}
                    onClick={goToLogin}
                >
                    {stringFa.cancel}
                </TransparentButton>
            </div>
        </div >
    )
}

export default GetPhoneNumber
