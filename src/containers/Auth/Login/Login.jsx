
import { useCallback, useEffect, useState } from "react"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import * as authActions from "../../../store/actions/auth";
import { baseUrl } from "../../../constants/Config"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../components/UI/Loading/Loading"
import { useNavigate } from "react-router-dom";
import { onChange } from "../../../utils/authFunction"

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        input: {
            value: '',
            elementConfig: {
                placeholder: stringFa.phone_or_nationalnumber,
                type: 'text',
            },
            elementType: 'input',
            validationMessage: stringFa.phone_or_nationalnumber_error,
            invalid: false,
            validation: {
                isRequired: true,
                minLength: 10,
            },
            shouldValidate: true,
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
            invalid: false,
            validation: {
                isRequired: true,
                minLength: 6,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false
        },
    })
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const auth = (input, password, url) => {
        dispatch(authActions.auth(input, password, url));
    };
    const loading = useSelector(state => state.auth.loading)
    let error = useSelector(state => state.auth.error)


    const loginHandler = useCallback(() => {
        auth(
            order.input.value,
            order.password.value,
            `${baseUrl}api/login_referee`
        );
    }, []);
    const goToSingup = () => {
        navigate('/signup')
    }

    return (
        <div className='login-container'>
            {loading ? <Loading /> :
                <>
                    <div className="error-text">{error}</div>
                    {
                        Object.entries(order).map(([k, v]) =>
                            <CustomInput
                                key={k}
                                {...v}
                                onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                                errorStyle={{
                                    maxWidth: '400px',
                                    minWidth: '250px',
                                    width:'80%'
                                }}
                            />)
                    }
                    <Button
                        onClick={loginHandler}
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
                        {stringFa.login}
                    </Button>
                    <p className='forgot-password'>{stringFa.forgot_password}</p>
                    <p className='go-to-register' >
                        {stringFa.not_registerd}<span onClick={goToSingup}>{stringFa.register}</span></p>
                </>
            }
        </div>
    )
}

export default Login
