import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createUser } from "../../../api/auth"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import ErrorDialog from "../../../components/UI/Error/ErrorDialog"
import * as actions from "../../../store/actions/auth";
import { useTheme } from "../../../styles/ThemeProvider"
import { onChange } from "../../../utils/authFunction"


const Singup = ({ locaiton, navigate }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formIsValid, setFormIsValid] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [order, setOrder] = useState({
        username: {
            value: '',
            title: stringFa.username,
            elementConfig: {
                placeholder: stringFa.username,
                type: 'text',
            },
            elementType: 'titleInput',
            validationMessage: stringFa.username_error,
            invalid: true,
            shouldValidate: true,
            validation: {
                isRequired: true,
                minLength: 3,
            },
            isFocused: false,
            touched: false,
            hint: stringFa.username_error
        },
        nationalNumberSingup: {
            value: '',
            title: stringFa.national_number,
            elementConfig: {
                placeholder: stringFa.national_number,
                type: 'text',
                maxLength: 10,
                autoComplete: "off"
            },
            elementType: 'titleInput',
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
        passwordSingup: {
            value: '',
            title: stringFa.password,
            elementConfig: {
                placeholder: stringFa.password,
                type: 'password',
                autoComplete: "new-password"
            },
            elementType: 'titleInput',
            validationMessage: stringFa.password_error,
            invalid: true,
            shouldValidate: true,
            validation: {
                isRequired: true,
                minLength: 6,
            },
            isFocused: false,
            touched: false,
            hint: stringFa.password_error
        },
    })

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const dispatch = useDispatch();

    const searchParams = new URLSearchParams(locaiton.search);
    const phone = searchParams.get("phone");

    const authSuccess = (token,) => {
        dispatch(actions.authSuccess(token));
    };
    const setUserData = (user) => {
        dispatch(actions.setUserData(user));
    };
    const authFail = (error) => {
        dispatch(actions.authFail(error));
    };

    const onClick = async () => {
        setDialog(null)
        setIsLoading(true)
        let result = await createUser(order.username.value, phone, order.nationalNumberSingup.value, order.passwordSingup.value)
        if (result.success) {
            setDialog(<ErrorDialog type="success">{stringFa.registered_successfully}</ErrorDialog>)
            localStorage.setItem("a1", result.result.token);
            authSuccess(result.result.token)
            setUserData(result.result.user)
        }
        else {
            setDialog(<ErrorDialog type="error">{result.result.message}</ErrorDialog>)
            authFail(result.result.message)
        }
        setIsLoading(false)
    }
    const goToLogin = () => {
        navigate('/login')
    }
    return (
        <div className='section-container sign-up'
            style={{
                backgroundColor: theme.surface
            }}
        >
            {dialog}
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        inputStyle={{
                            letterSpacing: k === 'password' && v.value.length > 0 ? '.4rem' : "",
                        }}
                        onChange={(e) => onChange(e.target.value, k, order, setOrder, setFormIsValid)}
                    />
                )
            }
            <Button
                loading={isLoading}
                onClick={onClick}
                config={{ disabled: !formIsValid }}
                ButtonStyle={{ marginTop: "1rem" }}
            >
                {stringFa.register}
            </Button>
            <p className='go-to'>
                {stringFa.registered}
                <span onClick={goToLogin}
                    style={{ color: theme.primary }}
                >
                    {stringFa.login}
                </span>
            </p>
        </div>
    )
}

export default Singup
