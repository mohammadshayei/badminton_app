import { useState } from "react"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import { onChange } from "../../../utils/authFunction"

const GetPhoneNumber = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [error, setError] = useState(null)
    const [order, setOrder] = useState({
        code: {
            value: '',
            elementType: 'input',
            elementConfig: {
                placeholder: '',
                pattern: "\d*",
                maxLength: 5
            },
            validationMessage: stringFa.code_error,
            invalid: false,
            validation: {
                isRequired: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false
        },
    })
    let searchParams = new URLSearchParams(props.locaiton.search);

    const phone = searchParams.get("phone");

    const onClick = () => {
        setError(null)
        if (props.code === order.code.value)
            props.navigate(`?p=3&token=${props.tokenId}&phone=${phone}`);
        else {
            setError(stringFa.wrong_code)
        }
    }
    const goToLogin = () => {
        props.navigate('/login')
    }
    return (
        <div className='signup-container'>
            <p className='write-sended-code'>{stringFa.write_code}</p>
            {
                Object.entries(order).map(([k, v]) =>
                    <CustomInput
                        key={k}
                        {...v}
                        inputStyle={{
                            letterSpacing: '1rem',
                            direction: "ltr",
                            fontSize: '1.4rem',
                            paddingLeft: '120px',
                        }}
                        errorStyle={{
                            maxWidth: '400px',
                            minWidth: '250px',
                            width: '80%',
                            top: '3.2rem'

                        }}
                        onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                    />)
            }
            <div className="error-text">{error}</div>
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
                {stringFa.confirm}
            </Button>
            <p className='go-to-login'>{stringFa.registered}<span onClick={goToLogin}>{stringFa.login}</span></p>

        </div>
    )
}
export default GetPhoneNumber
