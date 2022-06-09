import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { saveTempCode, sendSms } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import Loading from "../../../components/UI/Loading/Loading"
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
            },
            elementType: 'input',
            inputStyle: {
                fontSize: "0.9rem",
                padding: "0.5rem 1rem",
            },
            inputContainer: {
                marginBottom: "0.8rem"
            },
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
            setDialog(<ErrorDialog type="error">{result.result.message}</ErrorDialog>)
            setIsLoading(false)
            return;
        }
        let smsSend = await sendSms(code, result.result.phone)
        if (smsSend) {
            setDialog(<ErrorDialog type="success">{stringFa.code_sended}</ErrorDialog>)
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
    return (
        <div className='login-container'>
            {dialog}
            <div className="error-text">{error}</div>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                    />)
            }
            <Button
                loading={isLoading}
                onClick={onClick}
                ButtonStyle={{
                    background: isLoading ? 'gray' : 'white',
                    color: 'black',
                }}
                config={
                    { disabled: !formIsValid }
                }
            >
                {stringFa.send_code}
            </Button>
            <p className='go-to-register' >
                {stringFa.not_registerd}<span onClick={goToSingup}>{stringFa.register}</span></p>
        </div >
    )
}

export default GetInfo
