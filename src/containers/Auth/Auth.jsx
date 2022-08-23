import './Auth.scss'
import { useTheme } from '../../styles/ThemeProvider';
import GlobalSection from './GlobalSection/GlobalSection';
import Login from './Login/Login';
import GetPhoneNumber from './Signup/GetPhoneNumber';
import Signup from './Signup/Signup';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import GetInfo from './Login/GetInfo';
import VerifyCode from './VerifyCode/VerifyCode';

const Auth = () => {
    const [code, setCode] = useState('')
    const [forgotCode, setForgotCode] = useState('')
    const [globalView, setGlobalView] = useState(false)
    const [body, setBody] = useState(null)
    const locaiton = useLocation();
    let navigate = useNavigate();

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const searchParams = new URLSearchParams(locaiton.search);
    const p = searchParams.get("p");
    const type = searchParams.get("type");
    const phone = searchParams.get("phone");



    useEffect(() => {
        if (locaiton.pathname === "/signup") {
            setGlobalView(false)
            switch (p) {
                case "1":
                    body(
                        <GetPhoneNumber
                            setCode={setCode}
                        />
                    )
                    break;
                case "2":
                    if (phone)
                        setBody(<VerifyCode
                            code={code}
                            setCode={setCode}
                            phone={phone}
                            navigate={navigate}
                            type={'signup'}
                        />
                        )
                    else
                        setBody(
                            <Navigate
                                to={{
                                    pathname: "/signup",
                                    search: "?p=1",
                                }}
                            />
                        );
                    break;
                case "3":
                    setBody(
                        <Signup
                            navigate={navigate}
                            locaiton={locaiton}
                        />
                    )
                    break;
                default:
                    setBody(<GetPhoneNumber setCode={setCode} />)
                    break;
            }
        } else if (locaiton.pathname === "/login") {
            switch (type) {
                case "n"://normal
                    setGlobalView(true)
                    setBody(<Login navigate={navigate} />)
                    break;
                case "f"://forgot
                    setGlobalView(false)
                    setBody(
                        <GetInfo
                            setCode={setForgotCode}
                        />
                    )
                    break;
                case "v"://verify
                    setGlobalView(false)
                    setBody(<VerifyCode
                        code={forgotCode}
                        setCode={setForgotCode}
                        navigate={navigate}
                        phone={phone}
                        type={'forget'}
                    />
                    )
                    break;
                default:
                    setGlobalView(true)
                    setBody(<Login navigate={navigate} />)
                    break;
            }

        }
    }, [locaiton.pathname, type, p, phone, navigate, code])


    return (
        <div
            className="auth-container"
            style={{
                background: theme.background_color,
                color: theme.on_background,
            }}
        >
            {/* {
                globalView && <GlobalSection navigate={navigate} />
            } */}
            <div className="auth-section">
                {body}
            </div>
        </div >
    )
}

export default Auth
