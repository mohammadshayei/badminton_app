import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dynamicApi } from '../../../api/home'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import ErrorDialog from '../../../components/UI/Error/ErrorDialog'
import Header from './Header/Header'
import './TournamentPage.scss'

const TournamentPage = ({ id }) => {
    const [tournament, setTournament] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)

    const { token } = useSelector(state => state.auth)


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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <div>
            {dialog}
            <Header tournament={tournament} loading={loading} />
        </div>
    )
}

export default TournamentPage