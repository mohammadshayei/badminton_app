import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { stringFa } from "../../../assets/strings/stringFaCollection"
import Button from "../../../components/UI/Button/Button"
import CustomInput from "../../../components/UI/CustomInput/CustomInput"
import { onChange } from "../AuthFunction"

const GetPhoneNumber = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
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
    const locaiton = useLocation();
    const searchParams = new URLSearchParams(locaiton.search);
    let navigate = useNavigate();

    const phone = searchParams.get("phone");

    const onClick = () => {
        if (props.code === order.code.value)
            navigate(`?p=3&token=${props.tokenId}&phone=${phone}`);
        else {
            alert(stringFa.wrong_code)
        }
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
                            paddingLeft:'calc( 50% - 6rem )',
                        }}
                        errorStyle={{
                            top: '3.2rem'
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
                {stringFa.confirm}
            </Button>
        </div>
    )
}
export default GetPhoneNumber
