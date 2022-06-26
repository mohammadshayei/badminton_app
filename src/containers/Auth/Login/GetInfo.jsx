import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { saveTempCode, sendSms } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import TransparentButton from "../../../components/UI/Button/TransparentButton/TransparentButton";
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { useTheme } from "../../../styles/ThemeProvider";
import { onChange } from "../../../utils/authFunction";

const GetInfo = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [error, setError] = useState(null)
    const [dialog, setDialog] = useState(null)
    const [order, setOrder] = useState({
        input: {
            value: '',
            elementConfig: {
                placeholder: stringFa.phone_or_nationalnumber,
                type: 'text',
                autoFocus: true,
                maxLength: 11
            },
            elementType: 'input',
            validationMessage: stringFa.phone_or_nationalnumber_error,
            invalid: false,
            validation: {
                isRequired: true,
                minLength: 10,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false
        },
    })
    let navigate = useNavigate();
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const generate_token = (length) => {
        var a =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
                ""
            );
        var b = [];
        for (var i = 0; i < length; i++) {
            var j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    };
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
        let code = generateCode(5)
        props.setCode(code)
        let result = await saveTempCode({ input: order.input.value, code })
        if (!result.success) {
            setError(result.result.message)
            setIsLoading(false)
            return;
        }
        let smsSend = await sendSms(code, result.result.phone)
        if (smsSend) {
            setDialog(<ErrorDialog type="success">{stringFa.code_sent}</ErrorDialog>)
            navigate(`/login?type=v&phone=${result.result.phone}`);
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
    const goToSingup = () => {
        navigate('/signup')
    }
    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <div className='section-container'
            style={{
                backgroundColor: theme.surface,
                color: theme.on_surface,
                paddingTop: "4rem",
            }}
        >
            {dialog}
            <div className="error-text"
                style={{
                    color: theme.error
                }}
            >
                {error}
            </div>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        inputStyle={{ direction: "ltr" }}
                        onChange={(e) => onChange(e.target.value, k, order, setOrder, setFormIsValid)}
                    />)
            }
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
                    {stringFa.back}
                </TransparentButton>
            </div>
            <p className='go-to from-get-info'>
                {stringFa.not_registerd}
                <span onClick={goToSingup}
                    style={{ color: theme.primary }}
                >
                    {stringFa.register}
                </span>
            </p>
        </div >
    )
}

export default GetInfo
