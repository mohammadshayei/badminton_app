
import { useCallback, useState } from "react"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import * as authActions from "../../../store/actions/auth";
import { baseUrl } from "../../../constants/Config"
import { useDispatch, useSelector } from "react-redux"
import { onChange } from "../../../utils/authFunction"
import { useTheme } from "../../../styles/ThemeProvider";
import { IoClose } from "react-icons/io5";
import TransparentButton from "../../../components/UI/Button/TransparentButton/TransparentButton";

const Login = ({ navigate }) => {
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
    const dispatch = useDispatch();
    const auth = (input, password, url) => {
        dispatch(authActions.auth(input, password, url));
    };
    const { error, loading } = useSelector(state => state.auth)


    const loginHandler = useCallback(() => {
        auth(
            order.input.value,
            order.password.value,
            `${baseUrl}api/login_user`
        );
    }, []);
    const goToSingup = () => {
        navigate('/signup')
    }
    const forgotPassword = () => {
        navigate(`/login?type=f`);
    }
    return (
        <form className='section-container'
            style={{
                backgroundColor: theme.surface
            }}
            onSubmit={(e) => {
                loginHandler()
                e.preventDefault()
            }}
        >
            <div className="go-to-tournament"
                onClick={() => navigate('/tournaments')}
            >
                <IoClose style={{ color: 'black' }} />
            </div>
            <div className="title-text-login"
                style={{ color: theme.primary }}
            >
                {stringFa.login_welcome_title}
            </div>
            <div className="error-text under-title-login"
                style={{ color: theme.error }}
            >{error}</div>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        onChange={(e) => onChange(e.target.value, k, order, setOrder, setFormIsValid)}
                    />)
            }
            <p className='forgot-password' onClick={forgotPassword}>{stringFa.forgot_password}</p>
            <Button
                loading={loading}
                ButtonStyle={{
                    padding: '.5em 2.5em',
                }}
            >
                {stringFa.login}
            </Button>
            <p className='go-to' >
                {stringFa.not_registerd}
                <span onClick={goToSingup}
                    style={{ color: theme.primary }}
                >{stringFa.register}</span>
            </p>
        </form >
    )
}

export default Login
