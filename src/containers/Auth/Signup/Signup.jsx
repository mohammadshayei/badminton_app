
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { registerReferee } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import ErrorDialog from "../../../components/UI/Error/ErrorDialog"
import * as actions from "../../../store/actions/auth";
import { onChange } from "../../../utils/authFunction"
import Loading from "../../../components/UI/Loading/Loading"


const Singup = ({ navigate, locaiton }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [dialog, setDialog] = useState(null)
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

    const dispatch = useDispatch();

    const searchParams = new URLSearchParams(locaiton.search);
    const phone = searchParams.get("phone");

    const authSuccess = (token, refereeId) => {
        dispatch(actions.authSuccess(token, refereeId));
    };
    const setRefereeData = (referee) => {
        dispatch(actions.setRefereeData(referee));
    };
    const authFail = (error) => {
        dispatch(actions.authFail(error));
    };

    const onClick = async () => {
        setDialog(null)
        setIsLoading(true)
        let result = await registerReferee(order.username.value, phone, order.nationalNumber.value, order.password.value)
        if (result.success) {
            setDialog(<ErrorDialog type="success">{stringFa.registered_successfully}</ErrorDialog>)
            localStorage.setItem("token", result.message.token);
            localStorage.setItem("refereeId", result.message.referee._id);
            authSuccess(result.message.token, result.message.referee._id)
            setRefereeData(result.message.referee)
        }
        else {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            authFail(stringFa.error_occured)
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
            {dialog}
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
                loading={isLoading}
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
            <p className='go-to-login'>{stringFa.registered}<span onClick={goToLogin}>{stringFa.login}</span></p>

        </div>
    )
}

export default Singup
