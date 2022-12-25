import Day from "../Day";
import "./Games.scss";
import Skeleton from 'react-loading-skeleton';
import { useTheme } from "../../../../../styles/ThemeProvider";
import { useState, useEffect } from "react";
import GameBox from "../../GameBox/GameBox";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import TransparentButton from "../../../../../components/UI/Button/TransparentButton/TransparentButton";
import { dynamicApi } from "../../../../../api/home";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import TextComponent from "../../../../../components/UI/TextComponent/TextComponent";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../../../components/UI/Loading/Loading.jsx";
import { IoTrashBin } from "react-icons/io5";

const Games = ({ tournamentId, createAccess, gameDate }) => {
    const [games, setGames] = useState([]);
    const [listAPlayers, setListAPlayers] = useState([]);
    const [listBPlayers, setListBPlayers] = useState([]);
    const [officials, setOfficials] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [tournamentDays, setTournamentDays] = useState([]);
    const [itemLoading, setItemLoading] = useState({ type: '', content: "" })
    const [dateValue, setDateValue] = useState('')
    const [dateLoading, setDateLoading] = useState(false)
    const [gym, setGym] = useState({ id: "", value: "" })
    const [landNumbers, setLandNumbers] = useState([])
    const [gyms, setGyms] = useState([])
    const [maxGameNumber, setMaxGameNumber] = useState(0)
    const [error, setError] = useState('')



    const { token, socket } = useSelector(state => state.auth)


    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onChangeDatePicker = async (e) => {
        setDialog(null)
        if (error === 'date') setError('')
        setDateValue(new Date(e))
        try {
            setDateLoading(true)
            let selectedDay = tournamentDays.find(item => item.selected)
            if (!selectedDay) return;
            let payload = {
                tournamentId,
                dayId: selectedDay._id,
                date: new Date(e),
                isClear: false
            }
            let updatedTournamentsDay = tournamentDays.map(item => {
                return {
                    ...item,
                    date: selectedDay._id === item._id ? new Date(e) : item.date
                }
            })
            setTournamentDays(updatedTournamentsDay)
            const result = await dynamicApi(payload, token, 'set_date_on_day')
            setDialog(<ErrorDialog type={result.success ? 'success' : "error"}>{result.data.message}</ErrorDialog>)
            if (!result.success) {
                // setDateValue(dateValue)
                setTournamentDays(tournamentDays)
            }

            setDateLoading(false)
        } catch (error) {
            setDateLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }
    const onClearDate = async () => {
        if (!dateValue || games?.length > 0) return;
        setDialog(null)
        if (error === 'date') setError('')
        setDateValue('')
        try {
            setDateLoading(true)
            let selectedDay = tournamentDays.find(item => item.selected)
            if (!selectedDay) return;
            let payload = {
                tournamentId,
                dayId: selectedDay._id,
                date: new Date(),
                isClear: true
            }
            let updatedTournamentsDay = tournamentDays.map(item => {
                return {
                    ...item,
                    date: selectedDay._id === item._id ? '' : item.date
                }
            })
            setTournamentDays(updatedTournamentsDay)
            const result = await dynamicApi(payload, token, 'set_date_on_day')
            setDialog(<ErrorDialog type={result.success ? 'success' : "error"}>{result.data.message}</ErrorDialog>)
            if (!result.success) {
                // setDateValue(dateValue)
                setTournamentDays(tournamentDays)
            }

            setDateLoading(false)
        } catch (error) {
            setDateLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }
    const selectDay = async (key) => {
        let selected;
        let updatedTournamentsDay = tournamentDays.map(item => {
            if (item._id === key)
                selected = item
            return {
                ...item,
                selected: item._id === key
            }
        })
        setTournamentDays(updatedTournamentsDay)
        setDateValue(selected.date)

        setDialog(null)
        try {
            setLoading(true)
            let payload = {
                tournamentId,
                dayId: key,
            }
            const result = await dynamicApi(payload, token, 'get_free_ranking_day_info')
            if (!result.success) {
                setDialog(<ErrorDialog type="error"> {result.data.message}</ErrorDialog >)
            }
            else {
                setupGames(result.data.selectedDay.games)
                setMaxGameNumber(parseInt(result.data.maxGameNumber))
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }

    const onChangeGym = async e => {
        setDialog(null)
        if (error === 'gym') setError('')
        setGym({ id: e.id, value: e.text })
        try {
            const result = await dynamicApi({ tournamentId, itemId: e.id }, token, 'set_gym')
            if (!result.success)
                return;
            setLandNumbers(result.data.landNumbers.map((item, index) => {
                return {
                    text: item.number,
                    id: index
                }
            }))
            setDialog(<ErrorDialog type={result.success ? 'success' : 'error'}>{result.data.message}</ErrorDialog>)

        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }
    const toggle = gameKey => {
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        updatedGames[gameIndex].officialsOpen = !updatedGames[gameIndex].officialsOpen
        setGames(updatedGames)
    }
    const toggleType = gameKey => {
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (gameIndex < 0) return;
        if (updatedGames[gameIndex].players.a.length === 1) {
            updatedGames[gameIndex].players.a.push({ _id: "", value: "" })
            updatedGames[gameIndex].players.b.push({ _id: "", value: "" })
            updatedGames[gameIndex].title = 'دونفره'
        } else {
            updatedGames[gameIndex].players.a.splice(1, 1)
            updatedGames[gameIndex].players.b.splice(1, 1)
            updatedGames[gameIndex].title = 'انفرادی'
        }
        setGames(updatedGames)
    }
    const setupGames = (inputGames) => {
        let updatedGames = []
        inputGames.forEach((item) => {
            updatedGames.push({
                _id: item.game._id,
                title: item.game.game_type === 'single' ? "انفرادی" : "دو نفره",
                court: { _id: uuidv4().replace(/-/g, ""), value: item.game.land_number },
                status: item.game.status,
                gameNumber: item.game.game_number,
                players: {
                    a: item.game.teamA.players.map(i => {
                        return {
                            _id: i.player._id,
                            value: i.player.username,
                        }
                    }), b: item.game.teamB.players.map(i => {
                        return {
                            _id: i.player._id,
                            value: i.player.username,
                        }
                    })
                },
                officials: {
                    umpire: [{
                        _id: item.game.referee ? item.game.referee._id : "",
                        value: item.game.referee ? item.game.referee.username : "",
                    },],
                    serviceJudge: [
                        {
                            _id: item.game.service_referee ? item.game.service_referee._id : "",
                            value: item.game.service_referee ? item.game.service_referee.username : "",
                        },
                    ]
                },
                saved: true,
                loading: false,
                officialsOpen: false,
                fetched: true,
            })
        })
        setGames(updatedGames)
    }
    const onSave = async (gameKey) => {
        setDialog(null)
        setItemLoading({ type: "save", content: gameKey })
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (gameIndex < 0) return;
        if (!gym.id) {
            setError('gym')
            // setDialog(<ErrorDialog type="error">سالن را انتخاب کنید</ErrorDialog>)
            return;
        }
        if (!updatedGames[gameIndex].court.value && updatedGames[gameIndex].officials.umpire[0]._id) {
            setDialog(<ErrorDialog type="error">شماره زمین را باید تعیین کنید</ErrorDialog>)
            return;
        }
        let path, payload = {
            gameType: updatedGames[gameIndex].players.b.length === 2 ? 'double' : "single",
            gameNumber: updatedGames[gameIndex].gameNumber,
            landNumber: updatedGames[gameIndex].court.value,
            // landNumber: '1',
            playersTeamA: updatedGames[gameIndex].players.a.map(item => item._id),
            playersTeamB: updatedGames[gameIndex].players.b.map(item => item._id),
            gymId: gym.id,
            tournamentId,
            umpireId: updatedGames[gameIndex].officials.umpire[0]._id,
            serviceUmpireId: updatedGames[gameIndex].officials.serviceJudge[0]._id,
            date: dateValue
        };
        if (updatedGames[gameIndex].fetched) {
            path = 'edit_free_ranking_game'
            payload = {
                ...payload,
                gameId: updatedGames[gameIndex]._id
            }
        } else
            path = 'create_free_ranking_game'

        try {
            let fetchedTournament = await dynamicApi(payload, token, path)
            updatedGames[gameIndex].loading = false;
            if (fetchedTournament.success) {
                setDialog(<ErrorDialog type="success">{fetchedTournament.data.message}</ErrorDialog>)
                if (!updatedGames[gameIndex].fetched) {
                    updatedGames[gameIndex]._id = fetchedTournament.data.id;
                    updatedGames[gameIndex].fetched = true;
                }
                if (updatedGames[gameIndex].officials.umpire[0]._id) {
                    socket.emit('create_game', {
                        game: {
                            _id: fetchedTournament.data.id,
                            game_number: updatedGames[gameIndex].gameNumber,
                            land_number: updatedGames[gameIndex].court.value,
                            teamAPlayers: updatedGames[gameIndex].players.a.map(item => {
                                return {
                                    _id: item._id,
                                    username: item.value
                                }
                            }),
                            teamBPlayers: updatedGames[gameIndex].players.b.map(item => {
                                return {
                                    _id: item._id,
                                    username: item.value
                                }
                            }),
                            umpireId: updatedGames[gameIndex].officials.umpire[0]._id,
                        },
                        tournamentId
                    })
                }
                if (updatedGames[gameIndex].officials.umpire[0]._id)
                    updatedGames[gameIndex].status = 1
                else
                    updatedGames[gameIndex].status = 0

            } else {
                setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)

            }
            updatedGames[gameIndex].saved = true;

        } catch (error) {
            setItemLoading({ type: "", content: '' })

            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setGames(updatedGames)
        setItemLoading({ type: "", content: '' })
    }
    const onChangeCourt_GameNumber = (e, key, type) => {
        let updatedGames = [...games]
        let gmIndex = updatedGames.findIndex(item => item._id === key)
        if (gmIndex < 0) return;
        if (type === 'gameNumber')
            updatedGames[gmIndex].gameNumber = e.target.value;
        else {
            updatedGames[gmIndex].court._id = e.id;
            updatedGames[gmIndex].court.value = e.text;
        }
        updatedGames[gmIndex].saved = false;
        setGames(updatedGames)
    }
    const onChange = (e, gameKey, teamKey, playerIndex, type) => {
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (gameIndex < 0) return;
        if (type === 'player') {
            updatedGames[gameIndex].players[teamKey][playerIndex]._id = e.id
            updatedGames[gameIndex].players[teamKey][playerIndex].value = e.text
        } else {
            updatedGames[gameIndex].officials[teamKey][playerIndex]._id = e.id
            updatedGames[gameIndex].officials[teamKey][playerIndex].value = e.text
        }
        updatedGames[gameIndex].saved = false;
        setGames(updatedGames)
    }
    const onCreateNewGame = () => {
        if (!dateValue) {
            // setDialog(<ErrorDialog type="error">لطفا تاریخ روز را انتخاب کنید</ErrorDialog>)
            setError('date')
            return;
        }
        let updatedGames = [...games]
        let max = 0;
        updatedGames.forEach(item => {
            if (parseInt(item.gameNumber) > max) max = parseInt(item.gameNumber)
        })
        if (maxGameNumber > max) max = maxGameNumber
        updatedGames.push(
            {
                _id: uuidv4().replace(/\-/g, ""),
                title: "انفرادی",
                court: { _id: "", value: "" },
                status: -1,
                gameNumber: (max + 1).toString(),
                players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
                officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
                saved: false,
                loading: false,
                officialsOpen: false,
                fetched: false,
            }
        )
        setGames(updatedGames)
    }
    const onRemove = async (gameKey) => {
        setDialog(null)
        setItemLoading({ type: "delete", content: gameKey })
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (!updatedGames[gameIndex].fetched) return;
        if (gameIndex < 0) return;
        let payload = {
            gameId: updatedGames[gameIndex]._id,
            date: dateValue
        };
        try {
            let fetchedTournament = await dynamicApi(payload, token, 'remove_game_from_tournament')
            if (fetchedTournament.success) {
                setDialog(<ErrorDialog type="success">{fetchedTournament.data.message}</ErrorDialog>)
                socket.emit('delete_game', {
                    gameId: updatedGames[gameIndex]._id,
                    tournamentId
                })
                updatedGames.splice(gameIndex, 1)

            } else {
                setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)
            }
        } catch (error) {
            console.log(error)
            setItemLoading({ type: "", content: '' })
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setGames(updatedGames)
        setItemLoading({ type: "", content: '' })

    }
    useEffect(() => {
        setDialog(null)
        if (!tournamentId) return;
        (async () => {
            try {
                setLoading(true)
                const fetchedData = await dynamicApi({ id: tournamentId }, token, 'get_days_free_ranking_info')
                let updatedTournamentsDay = fetchedData.data.days.map(item => {
                    return {
                        _id: item._id,
                        date: item.date ? item.date : '',
                        counter: item.number + 1,
                        status: item.status,
                        selected: item._id === fetchedData.data.selectedDay._id,
                    }
                })
                setDateValue(fetchedData.data.selectedDay.date ? fetchedData.data.selectedDay.date : '')
                let players = fetchedData.data.players.map(item => {
                    return {
                        _id: item.player._id,
                        username: item.player.username,
                    }
                })
                setListAPlayers(players)
                setListBPlayers(players)
                setOfficials(fetchedData.data.referees)
                setGyms(fetchedData.data.gyms)
                if (fetchedData.data.selectedGym) {
                    setGym({ id: fetchedData.data.selectedGym._id, value: fetchedData.data.selectedGym.title })
                    setLandNumbers(fetchedData.data.selectedGym.land_numbers.map((item, index) => {
                        return {
                            text: item.number,
                            id: index
                        }
                    }))
                }
                setMaxGameNumber(parseInt(fetchedData.data.maxGameNumber))
                setTournamentDays(updatedTournamentsDay)
                setupGames(fetchedData.data.selectedDay.games)
                setLoading(false)


            } catch (error) {
                console.log(error)
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [tournamentId])
    useEffect(() => {
        if (!socket || !games) return;

        socket.on('get_live_game', (payload => {
            let { game } = payload;
            let updatedGames = [...games]
            let gameIndex = updatedGames.findIndex(item => item._id === game._id)
            if (gameIndex < 0) return;
            updatedGames[gameIndex].status = 2;
            setGames(updatedGames)
        }

        ))
        socket.on('get_exit_game', (payload => {
            let { gameId } = payload;
            let updatedGames = [...games]
            let gameIndex = updatedGames.findIndex(item => item._id === gameId)
            if (gameIndex < 0) return;
            updatedGames[gameIndex].status = 1;
            setGames(updatedGames)
        }
        ))
        socket.on('get_end_game_stats', (payload => {
            const { gameId } = payload;
            let updatedGames = [...games]
            let gameIndex = updatedGames.findIndex(item => item._id === gameId)
            if (gameIndex < 0) return;
            updatedGames[gameIndex].status = 3;
            setGames(updatedGames)
        }))
    }, [games, socket])
    return <div className="tournament-games-wrapper">
        {dialog}
        <div className="days-and-gym-selector">
            <div className="day-selector-container">
                {tournamentDays ?
                    tournamentDays.map(day =>
                        <Day
                            key={day._id}
                            day={day}
                            selectDay={() => selectDay(day._id)}
                        />
                    ) :
                    [...Array(5).keys()].map((v) =>
                        <Skeleton
                            key={v}
                            className="day"
                            style={{ border: "none" }}
                        />
                    )
                }
            </div>
            <div className="gym-selector">

                {
                    createAccess ?
                        <>
                            <div>نام سالن</div>
                            <CustomInput
                                placeHolder={stringFa.undefined}
                                elementType={elementTypes.dropDown}
                                onChange={onChangeGym}
                                items={gyms.map(item => {
                                    return {
                                        id: item.gym._id,
                                        text: item.gym.title,
                                    }
                                })}
                                shouldValidate={true}
                                invalid={error === 'gym'}
                                touched={true}
                                value={gym.value}
                                inputContainer={{ padding: "0" }}
                            />
                        </> :
                        <TextComponent
                            value={gym.value}
                            title={'نام سالن '}
                        />
                }

            </div>
        </div>
        <div className="date-of-day">
            {
                createAccess ?
                    <>
                        <CustomInput
                            title={stringFa.date}
                            invalid={error === 'date'}
                            elementType={elementTypes.datePicker}
                            value={dateValue}
                            inputContainer={{ paddingBottom: "0" }}
                            onChange={onChangeDatePicker}
                            validation={{ bdRequired: true }}
                            elementConfig={{
                                minDate: gameDate ? new Date(gameDate.start) : null,
                                maxDate: gameDate ? new Date(gameDate.end) : null,
                            }}
                        />
                        <IoTrashBin
                            className={`icon-trash ${(games?.length === 0 && dateValue) ? "" : "icon-disabled"}`}
                            onClick={onClearDate}
                            color={theme.error}
                        /></>
                    :
                    <TextComponent
                        value={dateValue ? new Date(dateValue).toLocaleDateString('fa-IR') : stringFa.undefined}
                        title={stringFa.date}
                    />
            }
        </div>
        {createAccess &&
            <TransparentButton
                onClick={onCreateNewGame}
                ButtonStyle={{ color: theme.primary, alignSelf: "center" }}
            >
                {`+ ${stringFa.new_game}`}
            </TransparentButton>
        }
        <div className="games-wrapper">
            {loading ?
                <Loading /> :
                games.length > 0 ?
                    games.map((game) =>
                        <GameBox
                            key={game._id}
                            game={game}
                            games={games}
                            setGames={setGames}
                            landNumbers={landNumbers}
                            listAPlayers={listAPlayers}
                            listBPlayers={listBPlayers}
                            officials={officials}
                            itemLoading={itemLoading}
                            toggleType={toggleType}
                            onChangeGameInfo={onChangeCourt_GameNumber}
                            onChange={onChange}
                            onSave={onSave}
                            onRemove={onRemove}
                            toggle={toggle}
                            createAccess={createAccess}
                        />
                    )
                    : "لیست بازی ها خالی است."}
        </div>
    </div>;
};

export default Games;
