import { useEffect, useState } from 'react'
import "./PurchaseCallBack.scss"
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../styles/ThemeProvider';
import { stringFa } from '../../assets/strings/stringFaCollection';
import { ImCross, ImCheckmark } from "react-icons/im";
import TransparentButton from '../../components/UI/Button/TransparentButton/TransparentButton';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import ErrorDialog from '../../components/UI/Error/ErrorDialog';
import { dynamicApi } from '../../api/home';

const PurchaseCallBack = () => {
    const [statusIcon, setStatusIcon] = useState('');
    const [statusTitle, setStatusTitle] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [dialog, setDialog] = useState(null)


    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("Status");
    const authority = searchParams.get("Authority");
    const [data, setData] = useState(null)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    useEffect(() => {
        if (!status || !authority || !token) return;
        setDialog(null);
        (async () => {
            try {
                let payload = {
                    authority, status
                }
                let result = await dynamicApi(payload, token,
                    'check_pay_status')
                if (!result.success) {
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)
                    return;
                }
                setData(result.data.data)
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
            } catch (error) {
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }

        })()
    }, [status, authority, token])
    const onBack = () => {
        if (data.isTeam)
            navigate(`/teams/${data.id}?part=informations`)
        else
            navigate(`/profile?part=userInfo`)

    }
    return (
        <div className='callback-page-container'>
            {dialog}
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
                <TransparentButton disabled={!data} onClick={onBack}>
                    {stringFa.back}
                </TransparentButton>
            </div>
        </div>
    )
}

export default PurchaseCallBack