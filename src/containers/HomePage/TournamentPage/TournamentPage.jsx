/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { dynamicApi } from '../../../api/home'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import Button from '../../../components/UI/Button/Button'
import ErrorDialog from '../../../components/UI/Error/ErrorDialog'
import TeamForm from '../InputForms/TeamForm/TeamForm'
import Header from './Header/Header'
import TeamItem from './Items/TeamItem'
import TournamentItemSearch from './TournamentItemSearch/TournamentItemSearch'
import './TournamentPage.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import TeamsMatches from './TournamentParts/TeamsMatches/TeamsMatches'
import PlayerForm from '../InputForms/PlayerForm/PlayerForm'
import RefereeForm from '../InputForms/RefereeForm/RefereeForm'
import GymForm from '../InputForms/GymForm/GymForm'
import TodayMatch from './TournamentParts/TodayMatch/TodayMatch'
import Skeleton from 'react-loading-skeleton'
import { useTheme } from '../../../styles/ThemeProvider'
import { Icon } from '@iconify/react';
import Games from './TournamentParts/Games/Games'
import Overview from './TournamentParts/Overview/Overview';
import Footer from '../Footer/Footer'

const TournamentPage = ({ id }) => {

    const [tournament, setTournament] = useState(null)
    const [loading, setLoading] = useState(false)
    const [contentLoading, setContentLoading] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)
    const [itemLoading, setItemLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [listItem, setListItem] = useState([])
    const [filteredListItems, setFilteredListItems] = useState([])
    const [searchListItems, setSearchListItem] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [partTitle, setPartTitle] = useState('')
    const [content, setContent] = useState(null)
    const [form, setForm] = useState(null)
    const [isReferee, setIsReferee] = useState(false)
    const [filterSelectors, setFilterSelectors] = useState(null);
    const [showInputForm, setShowInputForm] = useState(false)
    const [createAccess, setCreateAccess] = useState(false)
    const [listItemFetched, setListItemFetched] = useState(false)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { token, user } = useSelector(state => state.auth)

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");
    const item = searchParams.get("item");
    const matchId = searchParams.get("matchId");
    const create = searchParams.get("create");


    const onItemClick = (itemId) => {
        navigate(`/tournaments/${tournament._id}?part=${part}&item=${itemId}`)
    }
    const onShowGame = (gId) => {
        navigate(`/tournaments/${tournament._id}?part=teamMatch&matchId=${gId}`)
    }

    const onAddItemClickHandler = () => {
        navigate(`/tournaments/${tournament._id}?part=${part}&create=1`)
    }
    const onAddItemToTournament = async (item) => {
        try {
            const result = await dynamicApi(
                { itemId: item._id, tournamentId: id }, token, `add_${part}_to_tournament`)
            setDialog(<ErrorDialog type={result.success ? 'success' : "error"}> {result.data.message}</ErrorDialog >)
            if (result.success) {
                setSearchValue('')
                setListItem(lst => [item, ...lst,])
                setSearchListItem([])
            }

        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }
    const onRemoveItemFromTournament = async (itemId) => {
        setRemoveLoading(true)
        setDialog(null);
        try {
            let payload = {
                tournamentId: id,
                itemId
            }
            let result = await
                dynamicApi(payload, token, `remove_${part}_from_tournament`)
            setDialog(
                <ErrorDialog
                    type={result.success ? 'success' : "error"}
                >{result.data.message}</ErrorDialog>)
            if (result.success) {
                onRemoveItem(itemId)
                navigate(`/tournaments/${id}?part=${part}`)

            }
        } catch (error) {
            console.log(error)
            setRemoveLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setRemoveLoading(false)
    }

    const onAddItem = (item) => {
        navigate(`/tournaments/${tournament._id}?part=${part}&item=${item._id}`)
        setListItem(lst => [item, ...lst,])
    }
    const onRemoveItem = (itemId) => {
        setListItem(lst => lst.filter(lstItem => lstItem._id !== itemId))
    }
    const onUpdateItem = (item) => {
        let updatedListItem = [...listItem]
        let findIndex = updatedListItem.findIndex(i => i._id === item._id)
        if (findIndex < 0) return;
        updatedListItem[findIndex] = item;
        setListItem(updatedListItem)
    }
    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
        setContent(null)
        navigate(`/tournaments/${id}?part=${key}`)
    }

    const onSearch = async (event) => {
        setSearchValue(event.target.value);
        if (event.target.value.length === 0) {
            setSearchListItem([])
            return;
        }
        let path = part !== 'referee' ? part : 'user'
        setSearchLoading(true)
        try {
            const result = await dynamicApi({ input: event.target.value }, token, `search_${path}`)
            if (result.success)
                setSearchListItem(result.data[`${path}s`])
            else
                setSearchListItem([])
        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            setSearchLoading(false)
        }
        setSearchLoading(false)

    }
    const onBack = () => {
        if (item)
            navigate(`/tournaments/${id}?part=${part}`)
        else setShowInputForm(false)
    }

    useEffect(() => {
        let updatedFilterSelectors
        if (tournament?.free_ranking) {
            updatedFilterSelectors = {
                player: {
                    text: "بازیکن ها",
                    selected: true,
                },
                referee: {
                    text: "داور ها",
                    selected: false,
                },
                gym: {
                    text: "سالن ها",
                    selected: false,
                },
                games: {
                    text: "بازی ها",
                    selected: false,
                },
            }
        } else {
            updatedFilterSelectors = {
                team: {
                    text: "تیم ها",
                    selected: true,
                },
                player: {
                    text: "بازیکن ها",
                    selected: false,
                },
                referee: {
                    text: "داور ها",
                    selected: false,
                },
                gym: {
                    text: "سالن ها",
                    selected: false,
                },
                teamMatch: {
                    text: "مسابقات تیمی",
                    selected: false,
                },
            }
        }

        for (const filter in updatedFilterSelectors) {
            if (filter === part)
                updatedFilterSelectors[filter].selected = true;
            else
                updatedFilterSelectors[filter].selected = false;
        }

        setFilterSelectors(updatedFilterSelectors)
    }, [tournament?.free_ranking])

    useEffect(() => {
        let updatedFilterSelectors = {
            ...filterSelectors
        }
        if (isReferee) {
            updatedFilterSelectors = {
                ...updatedFilterSelectors,
                todayMatch: {
                    text: "مسابقه امروز",
                    selected: false,

                }
            }
        }
        for (const filter in updatedFilterSelectors) {
            if (filter === part)
                updatedFilterSelectors[filter].selected = true;
            else
                updatedFilterSelectors[filter].selected = false;
        }
        setFilterSelectors(updatedFilterSelectors)
    }, [isReferee])

    useEffect(() => {
        if (!item) {
            setListItem(lst => lst.map(lstItem => {
                return {
                    ...lstItem,
                    selected: false
                }
            }))
            if (!create)
                setShowInputForm(false)
        } else if (listItemFetched) {
            setShowInputForm(true)
            if (!create)
                setListItem(lst => lst.map(lstItem => {
                    return {
                        ...lstItem,
                        selected: item === lstItem._id
                    }
                }))
        }

    }, [item, listItemFetched, create])
    useEffect(() => {
        if (create === '1') {
            setShowInputForm(true)
            setListItem(lst => lst.map(lstItem => {
                return {
                    ...lstItem,
                    selected: false
                }
            }))
        }
    }, [create])

    useEffect(() => {
        if (part === 'referee') {
            setCreateAccess(false)
        } else {
            if (!user || !tournament) return;
            if (part === 'team' || part === 'player' || part === 'gym') {
                if (user._id === tournament.chief._id || isReferee)
                    setCreateAccess(true)
                else
                    setCreateAccess(false)
            }
            else if (part === 'teamMatch') {
                if (user._id === tournament.chief._id)
                    setCreateAccess(true)
                else
                    setCreateAccess(false)
            }
        }
    }, [part, user, tournament?.chief, isReferee])

    useEffect(() => {
        if (searchValue.length > 0) {
            setFilteredListItems(
                searchListItems.filter(item => listItem
                    .findIndex(i => i._id === item._id) > -1))
        }
        else
            setFilteredListItems(listItem)
    }, [listItem, searchListItems])

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setItemLoading(true)
        setDialog(null);
        (async () => {
            try {
                let fetchedTournament = await dynamicApi({ id }, token, 'get_tournament')
                if (!fetchedTournament.success) {
                    setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)
                    return;
                }
                setTournament(fetchedTournament.data.tournament)
                setIsReferee(fetchedTournament.data.isReferee)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }

        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    useEffect(() => {
        // setShowInputForm(false)
        if (!part || !filterSelectors) return;
        let updatedFilterSelectors = { ...filterSelectors };
        for (const key in updatedFilterSelectors) {
            if (key === part) updatedFilterSelectors[key].selected = true
            else updatedFilterSelectors[key].selected = false;
        }
        setFilterSelectors(updatedFilterSelectors);
    }, [part])

    useEffect(() => {
        if (!id || !part) return;
        (async () => {
            let path;
            switch (part) {
                case 'team':
                    path = 'teams'
                    setPartTitle(stringFa.team)
                    setForm(
                        <TeamForm
                            content={content}
                            creator={tournament?.chief._id}
                            tournamentId={tournament?._id}
                            setShowInputForm={setShowInputForm}
                            onAddItem={onAddItem}
                            removeLoading={removeLoading}
                            onRemoveItemFromTournament={onRemoveItemFromTournament}

                        />)
                    break;
                case 'player':
                    path = 'players'
                    setPartTitle(stringFa.player)
                    setForm(<PlayerForm />)

                    break;
                case 'referee':
                    path = 'referees'
                    setPartTitle(stringFa.umpire)
                    break;
                case 'gym':
                    path = 'gyms'
                    setPartTitle(stringFa.gym)
                    break;
                default:
                    path = 'teams'
                    setPartTitle(stringFa.team)
                    break;
            }
            try {
                setContentLoading(true)
                let fetchedItems = await dynamicApi({ id }, token, `get_${path}`)
                if (!fetchedItems.success) {
                    setDialog(<ErrorDialog type="error">{fetchedItems.data.message}</ErrorDialog>)
                    return;
                }
                setListItem(fetchedItems.data[path]
                    .map((lstItem) => {
                        return {
                            ...lstItem[path.substring(0, path.length - 1)],
                            selected: false
                        }
                    }
                    ))
                setListItemFetched(true)
            } catch (error) {
                setContentLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setContentLoading(false)

        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, part])
    useEffect(() => {
        if (!id || !part || !item) {
            setContent(null)
            return;
        }
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
                    path = 'users'
                    break;
                case 'gym':
                    path = 'gyms'
                    break;
                case 'teamMatch':
                    path = 'teamMatch'
                    break;
                case 'todayMatch':
                    path = 'todayMatch'
                    break;
                default:
                    path = 'teams'
                    break;
            }
            try {
                let fetchedItem = await dynamicApi({ id: item },
                    token, `get_${path.substring(0, path.length - 1)}`)
                if (!fetchedItem.success) {
                    setDialog(<ErrorDialog type="error">{fetchedItem.data.message}</ErrorDialog>)
                    setItemLoading(false)
                    return;

                }

                setContent(fetchedItem.data[path.substring(0, path.length - 1)])
                setItemLoading(false)
            } catch (error) {
                setItemLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, part, item])
    useEffect(() => {
        switch (part) {
            case 'team':
                setForm(
                    <TeamForm
                        content={content}
                        tournamentId={tournament?._id}
                        setShowInputForm={setShowInputForm}
                        onAddItem={onAddItem}
                        removeLoading={removeLoading}
                        onRemoveItemFromTournament={onRemoveItemFromTournament}
                        onBack={onBack}
                        onUpdateItem={onUpdateItem}
                        createAccess={createAccess}
                        itemLoading={itemLoading}
                    />
                )
                break;
            case 'player':
                setForm(
                    <PlayerForm
                        content={content}
                        tournamentId={tournament?._id}
                        teamMode={!(tournament?.free_ranking)}
                        setShowInputForm={setShowInputForm}
                        onAddItem={onAddItem}
                        removeLoading={removeLoading}
                        onRemoveItemFromTournament={onRemoveItemFromTournament}
                        onBack={onBack}
                        onUpdateItem={onUpdateItem}
                        createAccess={createAccess}
                        itemLoading={itemLoading}
                    />
                )

                break;
            case 'referee':
                setForm(
                    <RefereeForm
                        content={content}
                        removeLoading={removeLoading}
                        onRemoveItemFromTournament={onRemoveItemFromTournament}
                        onBack={onBack}
                        creator={tournament?.chief._id}
                        itemLoading={itemLoading}
                    />
                )
                break;
            case 'gym':
                setForm(
                    <GymForm
                        content={content}
                        tournamentId={tournament?._id}
                        setShowInputForm={setShowInputForm}
                        onAddItem={onAddItem}
                        removeLoading={removeLoading}
                        onRemoveItemFromTournament={onRemoveItemFromTournament}
                        onBack={onBack}
                        onUpdateItem={onUpdateItem}
                        createAccess={createAccess}
                        itemLoading={itemLoading}
                    />
                )
                break;
            default:
                break;
        }
    }, [id, part, showInputForm, content, tournament, itemLoading, createAccess])

    return (
        <div className='tournament-page-wrapper'>
            {dialog}
            {
                filterSelectors &&
                <Header
                    tournament={tournament}
                    loading={loading}
                    filterSelectors={filterSelectors}
                    onSelectorClick={onSelectorClick}
                />
            }
            {
                part === "teamMatch" ?
                    <TeamsMatches
                        tournamentId={id}
                        gameDate={tournament?.game_date}
                        createAccess={createAccess}
                        onShowGame={onShowGame}
                        matchId={matchId}
                    /> :
                    part === "todayMatch" ?
                        <TodayMatch tournamentId={id} /> :
                        part === "games" ?
                            <Games
                                tournamentId={id}
                                createAccess={user?._id === tournament?.chief._id}
                                gameDate={tournament?.game_date}
                            /> :

                            <div className='tournament-body'>
                                <div className='tournament-search'>
                                    <TournamentItemSearch
                                        searchValue={searchValue}
                                        searchPlaceHolder={`جستجو ${partTitle}`}
                                        searchListItems={
                                            searchListItems.filter(item => listItem
                                                .findIndex(i => i._id === item._id) < 0)}
                                        onSearch={onSearch}
                                        searchLoading={searchLoading}
                                        onAddItemToTournament={onAddItemToTournament}
                                        selector={() => {
                                            if (part === 'team') return 'name'
                                            else if (part === 'player' || part === 'referee') return 'username'
                                            if (part === 'gym') return 'title'
                                        }}
                                        createAccess={part === 'referee' ? user?._id === tournament?.chief?._id : createAccess}
                                    />
                                    {
                                        createAccess &&
                                        <Button
                                            onClick={onAddItemClickHandler}
                                        >
                                            <div className='button-add'>
                                                <AiOutlinePlus style={{ fontSize: 15 }} />
                                                {`${partTitle} جدید`}
                                            </div>
                                        </Button>
                                    }
                                </div>
                                <div className='tournament-content'>
                                    <div className={`tournament-list-items ${showInputForm ? 'hide' : ''}`}>
                                        {
                                            contentLoading ?
                                                [...Array(5).keys()].map((v) =>
                                                    <Skeleton
                                                        key={v}
                                                        className="tournament-item"
                                                        direction='rtl'
                                                        baseColor={theme.border_color}
                                                        highlightColor={theme.darken_border_color}
                                                        style={{ border: "none" }}
                                                    />) :
                                                filteredListItems.length > 0 ?
                                                    filteredListItems.map((item, index) =>
                                                        <TeamItem
                                                            key={item._id}
                                                            index={index + 1}
                                                            indexNeeded={part === 'team' ? true : false}
                                                            item={item}
                                                            isReferee={tournament?.chief._id === user?._id}
                                                            selector={() => {
                                                                if (part === 'team') return 'name'
                                                                else if (part === 'player' || part === 'referee') return 'username'
                                                                else if (part === 'gym') return 'title'
                                                            }}
                                                            onClick={() => onItemClick(item._id)}
                                                        />
                                                    )
                                                    : <div className='not_found'>
                                                        <Icon
                                                            icon="uit:exclamation-circle"
                                                            fontSize="3rem"
                                                            opacity={0.3}
                                                            color={theme.on_background}
                                                        />
                                                        {stringFa.item_not_found}
                                                    </div>
                                        }
                                    </div>
                                    <div className={`tournament-item-input ${createAccess ? "item-input-form" : ""}`}
                                        style={{
                                            backgroundColor: window.innerWidth > 720 ? theme.background_color : theme.surface,
                                            display: showInputForm ? 'flex' : 'none',
                                        }}>
                                        {form}
                                    </div>
                                </div>
                            </div>
            }
            <Footer />
        </div>
    )
}
export default TournamentPage;