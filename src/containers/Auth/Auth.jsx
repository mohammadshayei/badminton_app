import './Auth.scss'
import { useTheme } from '../../styles/ThemeProvider';
import HeaderAuth from './HeaderAuth/HeaderAuth';
import Login from './Login/Login';
import GetPhoneNumber from './Signup/GetPhoneNumber';
import VerifyCode from './Signup/VerifyCode';
import Signup from './Signup/Signup';
import {
    Navigate, useLocation
} from "react-router-dom";
import { useState } from 'react';


const Auth = () => {
    const [tokenId, setTokenId] = useState("");
    const [code, setCode] = useState('')

    const locaiton = useLocation();
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const searchParams = new URLSearchParams(locaiton.search);
    const p = searchParams.get("p");
    const phone = searchParams.get("phone");
    const token = searchParams.get("token");


    let body = null;
    if (locaiton.pathname === "/signup") {
        switch (p) {
            case "1":
                body = <GetPhoneNumber setTokenId={setTokenId} setCode={setCode} />;
                break;
            case "2":
                if (phone)
                    body = <VerifyCode tokenId={tokenId} code={code} />;
                else
                    body = (
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
                    body = (
                        <Signup />
                    );
                else {
                    body = (
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
                body = <GetPhoneNumber setTokenId={setTokenId} setCode={setCode} />;
                break;
        }
    } else if (locaiton.pathname === "/login") {
        body = (
            <Login />
        );
    }

    return (
        <div
            className="auth-container"
            style={{
                background: `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
                color: theme.on_primary,
            }}
        >
            <HeaderAuth />
            {body}
        </div >
    )
}

export default Auth