import './Auth.scss'
import { useTheme } from '../../styles/ThemeProvider';
import GlobalSection from './GlobalSection/GlobalSection';
import Login from './Login/Login';
import GetPhoneNumber from './Signup/GetPhoneNumber';
import VerifyCode from './Signup/VerifyCode';
import Signup from './Signup/Signup';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import GetInfo from './Login/GetInfo';
import VerifyForgetCode from './Login/VerifyForgetCode';


const Auth = () => {
    const [tokenId, setTokenId] = useState("");
    const [code, setCode] = useState('')
    const [forgotCode, setForgotCode] = useState('')
    const [forgetTokenId, setForgetTokenId] = useState("");
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
    const token = searchParams.get("token");



    useEffect(() => {
        if (locaiton.pathname === "/signup") {
            setGlobalView(false)
            switch (p) {
                case "1":
                    body(<GetPhoneNumber setTokenId={setTokenId} setCode={setCode} />)
                    break;
                case "2":
                    if (phone)
                        setBody(
                            <VerifyCode
                                locaiton={locaiton}
                                navigate={navigate}
                                tokenId={tokenId}
                                code={code}
                            />)
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
                    if (phone && token === tokenId)
                        setBody(
                            <Signup
                                locaiton={locaiton}
                                navigate={navigate}
                            />
                        )
                    else {
                        setBody(
                            <Navigate
                                to={{
                                    pathname: "/signup",
                                    search: "?p=1",
                                }}
                            />
                        );
                    }
                    break;
                default:
                    setBody(<GetPhoneNumber setTokenId={setTokenId} setCode={setCode} />)
                    break;
            }
        } else if (locaiton.pathname === "/login") {
            switch (type) {
                case "n"://normal
                    setGlobalView(true)
                    setBody(<Login />)
                    break;
                case "f"://forgot
                    setGlobalView(false)
                    setBody(<GetInfo setTokenId={setForgetTokenId} setCode={setForgotCode} />)
                    break;
                case "v"://forgot
                    setGlobalView(false)
                    setBody(<VerifyForgetCode code={forgotCode} phone={phone} />)
                    break;
                default:
                    setGlobalView(true)
                    setBody(<Login />)
                    break;
            }

        }
    }, [locaiton.pathname, type, p, phone, token])


    return (
        <div
            className="auth-container"
            style={{
                background: theme.background_color,
                color: theme.on_background,
            }}
        >
            {
                globalView && <GlobalSection navigate={navigate} />
            }
            <div className="auth-section">
                {body}
            </div>
        </div >
    )
}

export default Auth
