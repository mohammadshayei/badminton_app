import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { searchRefereeByPhone, sendSms } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import Loading from "../../../components/UI/Loading/Loading"
import { onChange } from "../AuthFunction"

const GetPhoneNumber = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        phone: {
            value: '',
            elementType: 'input',
            elementConfig: {
                placeholder: stringFa.phone,
                type: 'text',
                pattern: "\d*",
                maxLength: 11,
            },
            validationMessage: stringFa.phone_error,
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
        props.setTokenId(generate_token(30))
        setIsLoading(true)
        let phoneExist = await searchRefereeByPhone(order.phone.value)

        if (phoneExist) {
            alert(stringFa.phone_exist)
            setIsLoading(false)
            return;
        }
        let code = generateCode(5)
        props.setCode(code)
        let smsSend = await sendSms(code, order.phone.value)
        if (smsSend) {
            alert(stringFa.code_sended)
            navigate(`/signup?p=2&phone=${order.phone.value}`);
        }
        else {
            alert(stringFa.error_occured)
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
        <div className='signup-container'>
            {
                isLoading ?
                    <Loading />
                    : <>
                        {
                            Object.entries(order).map(([k, v]) =>
                                <CustomInput
                                    key={k}
                                    {...v}
                                    onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                                />)
                        }
                        <Button
                            onClick={onClick}
                            ButtonStyle={{
                                fontSize: '1.2rem',
                                padding: '.4rem 4rem',
                                background: 'white',
                                color: 'black',
                            }}
                            config={
                                { disabled: !formIsValid }
                            }
                        >
                            {stringFa.send_code}
                        </Button>
                        <p className='go-to-login'>{stringFa.registered}<span onClick={goToLogin}>{stringFa.login}</span></p>
                    </>
            }

        </div >
    )
}

export default GetPhoneNumber
