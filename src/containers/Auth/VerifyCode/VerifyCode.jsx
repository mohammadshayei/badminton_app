import { useState } from "react";
import "./VerifyCode.scss";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import CustomInput from "../../../components/UI/CustomInput/CustomInput";
import Button from "../../../components/UI/Button/Button";
import { sendSms, validateTempCode } from "../../../api/auth";
import * as authActions from "../../../store/actions/auth"
import { useDispatch } from "react-redux";
import { useTheme } from "../../../styles/ThemeProvider";
import TransparentButton from "../../../components/UI/Button/TransparentButton/TransparentButton";
import { useEffect } from "react";

const VerifyCode = (props) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false)
    const [invalid, setInvalid] = useState(true);
    const [dialog, setDialog] = useState(null)
    const [error, setError] = useState(false);
    const [countDown, setCountDown] = useState(true);
    const [countDownTimer, setCountDownTimer] = useState("00:00");

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const dispatch = useDispatch()
    const onChange = (value) => {
        setError(false)
        setValue(value);
        if (value.length === 5)
            setInvalid(false)
        else
            setInvalid(true)
    };

    const onClickButtonContinueHandler = async () => {
        setDialog(null)
        setLoading(true)
        let result = await validateTempCode({ phone: props.phone, code: value })
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.result.message}</ErrorDialog>)
            setLoading(false)
            setError(true)
            return;
        }
        localStorage.setItem("a1", result.result.token);
        dispatch(authActions.authSuccess(result.result.token));
        dispatch(authActions.setUserData(result.result.user))
        setDialog(<ErrorDialog type="success">{stringFa.code_sent}</ErrorDialog>)
        setLoading(false)
    };
    const onClickSingup = () => {
        setDialog(null)
        if (props.code === value)
            props.navigate(`/signup?p=3&phone=${props.phone}`)
        else {
            setDialog(<ErrorDialog type="error">{stringFa.wrong_code}</ErrorDialog>)
            setError(true)
        }
    }
    const goBack = () => {
        if (props.type === 'signup')
            props.navigate('/signup')
        else
            props.navigate(`/login?type=f`);
    }

    const generateCode = (length) => {
        var a =
            "1234567890".split(
                ""
            );
        var b = [];
        for (var i = 0; i < length; i++) {
            var j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    };

    const resendSms = async () => {
        setDialog(null)
        setCountDown(true)
        let code = generateCode(5)
        props.setCode(code);
        let smsSend = await sendSms(code, props.phone)
        if (smsSend) {
            setDialog(<ErrorDialog type="success">{stringFa.code_sent}</ErrorDialog>)
        }
        else {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }

    useEffect(() => {
        if (countDown) {
            const startingMinute =2;
            let time = (startingMinute * 60) - 1;
            let seconds = time % 60;
            let minutes = Math.floor(time / 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            setCountDownTimer(`${minutes}:${seconds}`);
            const interval = setInterval(() => {
                time--;
                seconds = time % 60;
                minutes = Math.floor(time / 60);
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;
                setCountDownTimer(`${minutes}:${seconds}`);
            }, 1000);
            const timeOut = setTimeout(() => {
                if (countDown) setCountDown(false);
            }, ((startingMinute * 60000) - 1));
            return () => {
                clearInterval(interval);
                clearTimeout(timeOut);
            }
        }
    }, [countDown]);

    return (
        <form onSubmit={(e) => {
            if (props.type === 'signup') onClickSingup()
            else onClickButtonContinueHandler()
            e.preventDefault()
        }} className="verify-code-wrapper">
            {dialog}
            <div className="header-verify-contianer"
                style={{
                    color: theme.primary
                }}
            >
                <IoIosCheckmarkCircleOutline className="verify-check-icon"
                    size="clamp(3rem,7vw,4rem)" />
                <p>{`کد ارسال شده به ${props.phone} را وارد کنید`}</p>
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
                isOk={!error}
            />
            <div className="resend-code-and-timer" disabled={countDown}>
                {countDown ?
                    <p>
                        {countDownTimer}
                    </p>
                    :
                    <p
                        style={{
                            color: theme.secondary,
                            cursor: "pointer"
                        }}
                        onClick={resendSms}
                    >
                        {stringFa.resend}
                    </p>}
                {stringFa.didnt_recieve}
            </div>
            <div className="buttons-wrapper">
                <div className={`${error ? "invalid" : ""}`}>
                    <Button
                        loading={loading}
                        ButtonStyle={{
                            fontSize: 'clamp(0.9rem,1.7vw,1.2rem)',
                        }}
                        config={{ disabled: invalid }}
                    >
                        {props.type === 'signup' ? stringFa.confirm : stringFa.login}
                    </Button>
                </div>
                <TransparentButton
                    config={{ disabled: loading }}
                    onClick={goBack}
                >
                    {stringFa.back}
                </TransparentButton>
            </div>
        </form>
    );
};

export default VerifyCode;
