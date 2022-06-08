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
    const [loading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState(true);
    const [dialog, setDialog] = useState(null)
    const [error, setError] = useState(false);

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const onChange = (value) => {
        setValue(value);
        if (value.length === 5)
            setInvalid(false)
        else
            setInvalid(true)
    };

    const onClickButtonContinueHandler = async () => {
        setDialog(null)
        setLoading(true)
        setError(false)
        let result = await validateTempCode({ phone: props.phone, code: value })
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.result.message}</ErrorDialog>)
            setLoading(false)
            setError(true)
            return;
        }
        localStorage.setItem("token", result.result.token);
        localStorage.setItem("refereeId", result.result.referee._id);
        dispatch(authActions.authSuccess(result.result.token, result.result.referee._id));
        dispatch(authActions.setRefereeData(result.result.referee))

        setDialog(<ErrorDialog type="success">{stringFa.code_sended}</ErrorDialog>)
        navigate(`/login?type=v&phone=${result.result.phone}`);

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
            {dialog}
            <div className="header-verify-contianer">
                <IoIosCheckmarkCircleOutline className="verify-check-icon"
                    size="clamp(3rem,7vw,4rem)" />
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
            />
            <div className={`button-verify-container ${error && "invalid"}`}>
                <Button
                    loading={loading}
                    ButtonStyle={{
                        fontSize: 'clamp(0.9rem,1.7vw,1.2rem)',
                        backgroundColor: loading ? 'gray' : 'white',
                        color: 'black',
                    }}
                    config={{ disabled: invalid }}
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
