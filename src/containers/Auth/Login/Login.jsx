
import { useCallback, useState } from "react"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import * as authActions from "../../../store/actions/auth";
import { baseUrl } from "../../../constants/Config"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { onChange } from "../../../utils/authFunction"
import { useTheme } from "../../../styles/ThemeProvider";

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        input: {
            value: '',
            elementConfig: {
                placeholder: stringFa.phone_or_nationalnumber,
                type: 'text',
            },
            title: stringFa.username,
            elementType: 'titleInput',
            inputContainer: {
                paddingBottom: "0.5rem"
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
        password: {
            value: '',
            elementConfig: {
                placeholder: stringFa.password,
                type: 'password',
            },
            title: stringFa.password,
            elementType: 'titleInput',
            inputContainer: {
                paddingBottom: "0.2rem"
            },
            validationMessage: stringFa.password_error,
            invalid: false,
            validation: {
                isRequired: true,
                minLength: 6,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false
        },
    })

    const themeState = useTheme();
    const theme = themeState.computedTheme;
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
    const forgotPassword = () => {
        navigate(`/login?type=f`);
    }
    return (
        <div className='login-container'
            style={{
                backgroundColor: theme.surface
            }}
        >
            <div className="title-text"
                style={{ color: theme.primary }}
            >
                {stringFa.welcome}
            </div>
            <div className="error-text"
                style={{ color: theme.error }}
            >{error}</div>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                    />)
            }
            <p className='forgot-password' onClick={forgotPassword}>{stringFa.forgot_password}</p>
            <Button
                loading={loading}
                onClick={loginHandler}
                ButtonStyle={{
                    padding: '.5em 2.5em',
                }}
                config={
                    { disabled: !formIsValid }
                }
            >
                {stringFa.login}
            </Button>
            <p className='go-to-register' >
                {stringFa.not_registerd}
                <span onClick={goToSingup}
                    style={{ color: theme.primary }}
                >{stringFa.register}</span>
            </p>
        </div>
    )
}

export default Login
