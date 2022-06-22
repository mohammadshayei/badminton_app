import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { dynamicApi } from '../../../api/home'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import ErrorDialog from '../../../components/UI/Error/ErrorDialog'
import Header from './Header/Header'
import TeamItem from './Items/TeamItem'
import TournamentItemSearch from './TournamentItemSearch/TournamentItemSearch'
import './TournamentPage.scss'
import TeamsMatches from './TournamentParts/TeamsMatches'

const TournamentPage = ({ id }) => {
    const [tournament, setTournament] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [listItem, setListItem] = useState([])
    const { token } = useSelector(state => state.auth)
    const [filterSelectors, setFilterSelectors] = useState({
        team: {
            text: "تیم",
            selected: true,
        },
        player: {
            text: "بازیکن",
            selected: false,
        },
        referee: {
            text: "داور",
            selected: false,
        },
        gym: {
            text: "سالن",
            selected: false,
        },
        teamMatch: {
            text: "مسابقات تیمی",
            selected: false,
        },
    });
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");
    const item = searchParams.get("item");

    const onItemClick = (itemId) => {
        navigate(`/tournaments/${tournament._id}?part=${part}&item=${itemId}`)

    }
    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
        navigate(`/tournaments/${id}?part=${key}`)
    }
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
                setListItem(fetchedItems.data[path]
                    .map((item, index) => {
                        return {
                            ...item[path.substring(0, path.length - 1)],
                            selected: index === 0 ? true : false
                        }
                    }
                    ))
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, part])

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
                setListItem(fetchedItems.data[path]
                    .map((item, index) => {
                        return {
                            ...item[path.substring(0, path.length - 1)],
                            selected: index === 0 ? true : false
                        }
                    }
                    ))
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, part, item])

    return (
        <div className='tournament-page-wrapper'>
            {dialog}
            {/* header  */}
            <Header
                tournament={tournament}
                loading={loading}
                filterSelectors={filterSelectors}
                onSelectorClick={onSelectorClick}
            />
            {/* body is here */}
            {part === "teamMatch" ?
                <TeamsMatches /> :
                <div className='tournament-body'>
                    <div className='tournament-search'>
                        <TournamentItemSearch />
                    </div>
                    <div className='tournament-content'>
                        <div className="tournament-list-items">
                            {listItem.map((item, index) =>
                                <TeamItem
                                    key={item._id}
                                    index={index + 1}
                                    {...item}
                                    onClick={() => onItemClick(item._id)}
                                />
                            )}
                        </div>
                        <div className="touranament-item-input"></div>

                    </div>
                </div>}
        </div>
    )
}

export default TournamentPage