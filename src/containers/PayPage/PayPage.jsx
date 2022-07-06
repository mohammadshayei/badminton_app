import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PayPage = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("Status");
    const authority = searchParams.get("Authority");

    console.log(status)
    useEffect(() => {
        if (!status || !authority) return;

    }, [status, authority])

    return (
        <div>PayPage</div>
    )
}

export default PayPage