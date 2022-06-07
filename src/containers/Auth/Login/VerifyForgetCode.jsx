import { useState } from "react";
import "./VerifyForgetCode.scss";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import Button from "../../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { validateTempCode } from "../../../api/auth";
import * as authActions from "../../../store/actions/auth"
import { useDispatch } from "react-redux";

const VerifyForgetCode = (props) => {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState(null)
    const [dialog, setDialog] = useState(null)
    const navigate = useNavigate()

    const maxLength = 5;
    const dispatch = useDispatch()
    const onChange = (value) => {
        setValue(value);
        setCount(maxLength - value.length);
        setInvalid(false)
    };
    const onClickButtonContinueHandler = async () => {



        setError(null)
        setDialog(null)
        setLoading(true)
        let result = await validateTempCode({ phone: props.phone, code: value })
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.result.message}</ErrorDialog>)
            setLoading(false)
            return;
        }
        localStorage.setItem("token", result.result.token);
        localStorage.setItem("refereeId", result.result.referee._id);
        dispatch(authActions.authSuccess(result.result.token, result.result.referee._id));
        dispatch(authActions.setRefereeData(result.result.referee))

        if (true) {
            setDialog(<ErrorDialog type="success">{stringFa.code_sended}</ErrorDialog>)
            navigate(`/login?type=v&phone=${result.result.phone}`);
        }
        else {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setLoading(false)
    };
    const goToSingup = () => {
        navigate('/signup')
    }
    return (
        <form onSubmit={(e) => {
            onClickButtonContinueHandler()
            e.preventDefault()
        }} className="verify-code-wrapper">
            <div className="header-verify-contianer">
                <IoIosCheckmarkCircleOutline className="verify-check-icon"
                    //   color={theme.primary}
                    size="4rem" />
                <p>لطفا کد ارسال شده را وارد کنید</p>
            </div>
            <CustomInput
                elementType="otp"
                boxes={5}
                onChange={onChange}
                inputContainer={{
                    direction: "ltr"
                }}
                config={{ autoFocus: true }}
                messageError={stringFa.invalid_code}
                isOk={!invalid}
                inputError={{ left: "50%", transform: "translate(-50%,0.5rem)" }}
            />
            <div className={`button-verify-container ${invalid && "invalid"}`}>
                <Button
                    ButtonStyle={{
                        fontSize: '1.2rem',
                        padding: '.4rem 4rem',
                        background: 'white',
                        color: 'black',
                    }}
                    config={
                        {
                            disabled: invalid
                        }
                    }
                >
                    {stringFa.login}
                </Button>
                <p className='go-to-register' >
                    {stringFa.not_registerd}<span onClick={goToSingup}>{stringFa.register}</span></p>
            </div>
        </form>
    );
};

export default VerifyForgetCode;
