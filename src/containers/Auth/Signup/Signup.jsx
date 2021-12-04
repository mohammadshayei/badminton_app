
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { registerReferee } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import { onChange } from "../AuthFunction"
import * as actions from "../../../store/actions/auth";


const Singup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        username: {
            value: '',
            elementConfig: {
                placeholder: stringFa.username,
                type: 'text',
            },
            elementType: 'input',
            validationMessage: stringFa.username_error,
            invalid: true,
            shouldValidate: true,

            validation: {
                isRequired: true,
                minLength: 3,
            },
            isFocused: false,
            touched: false

        },
        nationalNumber: {
            value: '',
            elementConfig: {
                placeholder: stringFa.national_number,
                type: 'text',
                maxLength: 10,
            },
            elementType: 'input',
            validationMessage: stringFa.national_number_error,
            invalid: true,
            shouldValidate: true,

            validation: {
                isRequired: true,
                minLength: 10,
                maxLength: 10
            },
            isFocused: false,
            touched: false

        },
        password: {
            value: '',
            elementConfig: {
                placeholder: stringFa.password,
                type: 'password',
            },
            elementType: 'input',
            validationMessage: stringFa.password_error,
            invalid: true,
            shouldValidate: true,

            validation: {
                isRequired: true,
                minLength: 6,
            },
            isFocused: false,
            touched: false

        },
    })

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const locaiton = useLocation();
    const searchParams = new URLSearchParams(locaiton.search);
    const phone = searchParams.get("phone");

    const authSuccess = (token, refereeId) => {
        dispatch(actions.authSuccess(token, refereeId));
    };
    const authFail = (error) => {
        dispatch(actions.authFail(error));
    };

    const onClick = async () => {
        setIsLoading(true)
        let result = await registerReferee(order.username.value, phone, order.nationalNumber.value, order.password.value)
        if (result.success) {
            alert(stringFa.registered_successfully)
            localStorage.setItem("token", result.message.token);
            localStorage.setItem("refereeId", result.message.referee._id);
            authSuccess(result.message.token, result.message.referee._id)
        }
        else {
            alert(stringFa.error_occured)
            authFail(stringFa.error_occured)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        return () => {
        }
    }, [])
    return (
        <div className='signup-container'>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        inputStyle={{
                            letterSpacing: k === 'password' && v.value.length > 0 ? '.4rem' : "",
                        }}
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
                {stringFa.register}
            </Button>

            <p className='go-to-login'>{stringFa.registered}<span>{stringFa.login}</span></p>
        </div>
    )
}

export default Singup
