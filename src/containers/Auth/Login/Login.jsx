
import { useState } from "react"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import { onChange } from "../AuthFunction"


const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        username: {
            value: '',
            elementConfig: {
                placeholder: stringFa.username,
                type: 'text',
            },
            elementType: 'input',
            error: stringFa.username_error,
            isValid: true,
            validation: {
                isRequired: true,
                minLength: 3,
            },
            isFocused: false,
        },
        password: {
            value: '',
            elementConfig: {
                placeholder: stringFa.password,
                type: 'password',
            },
            elementType: 'input',
            error: stringFa.password_error,
            isValid: true,
            validation: {
                isRequired: true,
                minLength: 6,
            },
            isFocused: false,
        },
    })
    return (
        <div className='login-container'>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        value={v.value}
                        elementConfig={v.elementConfig}
                        elementType={v.elementType}
                        onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                    />)
            }
            <Button
                onClick={() => { }}
                ButtonStyle={{
                    fontSize: '1.2rem',
                    padding: '.4rem 4rem',
                    background: 'white',
                    color: 'black',
                }}
            >
                {stringFa.login}
            </Button>
            <p className='forgot-password'>{stringFa.forgot_password}</p>
            <p className='go-to-register'>{stringFa.not_registerd}<span>{stringFa.register}</span></p>
        </div>
    )
}

export default Login
