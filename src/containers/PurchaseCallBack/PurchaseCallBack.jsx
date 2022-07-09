import { useEffect, useState } from 'react'
import "./PurchaseCallBack.scss"
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../styles/ThemeProvider';
import { stringFa } from '../../assets/strings/stringFaCollection';
import { ImCross, ImCheckmark } from "react-icons/im";
import TransparentButton from '../../components/UI/Button/TransparentButton/TransparentButton';
import Skeleton from 'react-loading-skeleton';

const PurchaseCallBack = () => {
    const [statusIcon, setStatusIcon] = useState('');
    const [statusTitle, setStatusTitle] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    // const status = searchParams.get("Status");
    const status = "NOK";
    const authority = searchParams.get("Authority");

    useEffect(() => {
        if (!status || !authority) return;
        switch (status) {
            case "NOK":
                setStatusIcon(<ImCross />)
                setStatusTitle(stringFa.callback_status_NOK_title)
                setStatusMessage(stringFa.callback_status_NOK_message)
                break;
            case "OK":
                setStatusIcon(<ImCheckmark />)
                setStatusTitle(stringFa.callback_status_OK_title)
                setStatusMessage(stringFa.callback_status_OK_message)
                break;

            default:
                setStatusIcon(<ImCross />)
                setStatusTitle("خطا در پرداخت")
                setStatusMessage(stringFa.callback_status_NOK_message)
                console.log("Status :", status)
                break;
        }
    }, [status, authority])

    return (
        <div className='callback-page-container'>
            <div className="callback-page-icon"
                style={{
                    color: status === "OK" ? theme.success : theme.error
                }}
            >
                {statusIcon ? statusIcon :
                    <Skeleton
                        width={100}
                        height={100}
                        circle={true} />
                }
            </div>
            <p className='callback-page-title'
                style={{
                    color: status === "OK" ? theme.success : theme.error
                }}
            >
                {statusTitle ? statusTitle :
                    <Skeleton width={150} />
                }
            </p>
            <p className='callback-page-message'>
                {statusMessage ? statusMessage :
                    <Skeleton
                        count={2}
                        width={250} />
                }
            </p>
            <div className="callback-page-butttons">
                <TransparentButton>
                    {stringFa.back}
                </TransparentButton>
            </div>
        </div>
    )
}

export default PurchaseCallBack