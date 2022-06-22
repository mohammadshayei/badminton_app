import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { dynamicApi } from '../../../api/home'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import ErrorDialog from '../../../components/UI/Error/ErrorDialog'
import Header from './Header/Header'
import './TournamentPage.scss'
const TournamentPage = ({ id }) => {
    const [tournament, setTournament] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [listItem, setListItem] = useState([])
    const { token } = useSelector(state => state.auth)

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        (async () => {
            try {
                let fetchedTournament = await dynamicApi({ id }, token, 'get_tournament')
                if (!fetchedTournament.success) {
                    setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)
                    return;
                }
                setTournament(fetchedTournament.data.tournament)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }

        })()

    }, [id])

    useEffect(() => {
        if (!part) return;
    }, [part])

    useEffect(() => {
        if (!id || !part) return;
        (async () => {
            let path;
            switch (part) {
                case 'team':
                    path = 'teams'
                    break;
                case 'player':
                    path = 'players'
                    break;
                case 'referee':
                    path = 'referees'
                    break;
                case 'gym':
                    path = 'gyms'
                    break;
                case 'teamMatch':
                    path = 'teams'
                    break;
                default:
                    path = 'teams'
                    break;
            }
            try {
                let fetchedItems = await dynamicApi({ id }, token, `get_${path}`)
                if (!fetchedItems.success) {
                    setDialog(<ErrorDialog type="error">{fetchedItems.data.message}</ErrorDialog>)
                    return;
                }
                setListItem(fetchedItems.data[path])
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
        })()
    }, [id, part])

    return (
        <div>
            {dialog}
            {/* header  */}
            {tournament && <Header tournament={tournament} />}
            {/* body is here */}
            <div>
                <div>search</div>
                <div>
                    
                </div>
            </div>

        </div>
    )
}

export default TournamentPage