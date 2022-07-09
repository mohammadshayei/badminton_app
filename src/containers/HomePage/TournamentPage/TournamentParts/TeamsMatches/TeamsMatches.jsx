/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TeamsMatches.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import IMAGE from '../../../../../assets/images/user_avatar.svg';
import { IoIosArrowBack } from "react-icons/io";
import Day from "../Day";
import Match from "./Match";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { dynamicApi } from "../../../../../api/home";
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import { baseUrl } from "../../../../../constants/Config";
import TextComponent from "../../../../../components/UI/TextComponent/TextComponent";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const TeamsMatches = ({ onShowGame, matchId, createAccess, tournamentId, gameDate }) => {
    const [tournamentDays, setTournamentDays] = useState([]);
    const [dayMatchs, setDayMatchs] = useState([])
    const [teams, setTeams] = useState([])
    const [referees, setReferees] = useState([])

    let navigate = useNavigate()
    const [dateValue, setDateValue] = useState('')
    const [showGames, setShowGames] = useState(false);   //show a match games
    const [loading, setLoading] = useState(false)
    const [dateLoading, setDateLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [games, setGames] = useState([])
    const [maxMatchCount, setMaxMatchCount] = useState(0)

    const { token, socket } = useSelector(state => state.auth)

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const showGamesRef = useRef();

    const onChangeDatePicker = async (e) => {
        setDialog(null)
        setDateValue(new Date(e))
        try {
            setDateLoading(true)
            let selectedDay = tournamentDays.find(item => item.selected)
            if (!selectedDay) return;
            let payload = {
                tournamentId,
                dayId: selectedDay._id,
                date: new Date(e)
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
    const selectDay = async (key) => {
        setShowGames(false)
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
            const result = await dynamicApi(payload, token, 'get_day_info')
            if (!result.success) {
                setDialog(<ErrorDialog type="error"> {result.data.message}</ErrorDialog >)
            }
            else {
                setDayMatchs(result.data.selectedDay.matchs)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }

    const getReport = (id) => {
        navigate(`/report?id=${id}`);
    }

    const changeStatusDay = (status) => {
        let updatedTournamentsDay = [...tournamentDays]
        let selectedDayIndex = updatedTournamentsDay.findIndex(item => item.selected)
        if (selectedDayIndex < 0) return;
        updatedTournamentsDay[selectedDayIndex].status = status;
        setTournamentDays(updatedTournamentsDay)
    }

    const deleteMatch = id => {
        let updatedDayMatchs = dayMatchs.filter(item => item.match._id !== id)
        setDayMatchs(updatedDayMatchs)
        changeStatusDay(0)
    }
    const addMatch = match => {
        let updatedDayMatchs = [...dayMatchs]
        updatedDayMatchs.push({ match, _id: 'someid' })
        setDayMatchs(updatedDayMatchs)
        if (dayMatchs?.length === (maxMatchCount - 1))
            changeStatusDay(1)
    }
    const editedMatch = match => {
        let updatedDayMatchs = [...dayMatchs]
        let findedIndex = updatedDayMatchs.findIndex(item => item.match._id === match._id)
        updatedDayMatchs[findedIndex].match = match;
        setDayMatchs(updatedDayMatchs)
    }
    const onGoToLiveScore = (id) => {
        navigate(`/scoreboard_view?gameId=${id}`)
    }
    useEffect(() => {
        if (!tournamentId) return;
        (async () => {
            try {
                setLoading(true)
                const fetchedData = await dynamicApi({ id: tournamentId }, token, 'get_days_info')
                let updatedTournamentsDay = fetchedData.data.days.map(item => {
                    return {
                        _id: item._id,
                        date: item.date ? item.date : '',
                        counter: item.number + 1,
                        status: item.status,
                        selected: item._id === fetchedData.data.selectedDay._id,
                    }
                })
                setDayMatchs(fetchedData.data.selectedDay.matchs)
                setMaxMatchCount(fetchedData.data.teams.length / 2)
                setDateValue(fetchedData.data.selectedDay.date ? fetchedData.data.selectedDay.date : '')
                setTeams(fetchedData.data.teams)
                setReferees(fetchedData.data.referees)
                setTournamentDays(updatedTournamentsDay)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [tournamentId])

    useEffect(() => {
        if (!matchId) {
            setShowGames(false)
            return;
        }
        let match = dayMatchs.find(item => item.match._id === matchId)?.match
        if (!match) return;
        setShowGames(true)

        let updatedGames = match?.games?.map(item => {
            let title;
            switch (item.game.index) {
                case 0:
                    title = 'انفرادی اول'
                    break;
                case 1:
                    title = 'انفرادی دوم'
                    break;
                case 2:
                    title = 'دونفره اول'
                    break;
                case 3:
                    title = 'دونفره دوم'
                    break;
                case 4:
                    title = 'انفرادی سوم'
                    break;
                default:
                    break;
            }
            return {
                _id: item.game._id,
                title,
                players: {
                    a: item.game.teamA.players.map(i => {
                        return {
                            _id: i.player._id,
                            username: i.player.username,
                            image: i.player.image
                        }
                    }), b: item.game.teamB.players.map(i => {
                        return {
                            _id: i.player._id,
                            username: i.player.username,
                            image: i.player.image
                        }
                    }),
                },
                status: item.game.status,
                scores: {
                    a: item.game.sets.map(i => {
                        return {
                            score: i.set.teamA.score,
                            winner: i.set.teamA.setWon
                        }
                    }),
                    b: item.game.sets.map(i => {
                        return {
                            score: i.set.teamB.score,
                            winner: i.set.teamB.setWon
                        }
                    }),
                }
            }
        })
        setGames(updatedGames)
    }, [matchId, dayMatchs.length])

    useEffect(() => {
        let showTimeOut = setTimeout(() => {
            showGamesRef.current.scrollIntoView({ inline: "center" })
        }, 500);

        return () => {
            clearTimeout(showTimeOut)
        };
    }, [showGames]);

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

    return (
        <div className="teams-matches"
            style={{
                color: theme.on_background
            }}
        >
            {dialog}
            <div className="day-selector-container">
                {tournamentDays.length > 0 ?
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
            <div className="day-content">
                <div className={`day-events ${showGames ? "hide" : ""}`}>
                    <div className="date-of-day">
                        {
                            createAccess ?
                                <CustomInput
                                    title={stringFa.date}
                                    elementType={elementTypes.datePicker}
                                    value={dateValue}
                                    inputContainer={{ paddingBottom: "0" }}
                                    onChange={onChangeDatePicker}
                                    validation={{ bdRequired: true }}
                                    elementConfig={{
                                        minDate: gameDate ? new Date(gameDate.start) : null,
                                        maxDate: gameDate ? new Date(gameDate.end) : null,
                                        disabled: !createAccess

                                    }}
                                /> :
                                <TextComponent
                                    value={dateValue ? new Date(dateValue).toLocaleDateString('fa-IR') : stringFa.undefined}
                                    title={stringFa.date}
                                />
                        }
                    </div>
                    <div className="teams-table">
                        {
                            [...new Array(teams?.length > 1 ? Math.trunc((teams.length) / 2) : 1)].map((_, i) =>
                                <div className="table-row">
                                    <Match
                                        key={i}
                                        index={i}
                                        setShowGames={setShowGames}
                                        onShowGame={onShowGame}
                                        teams={teams.filter(item => dayMatchs?.findIndex(i =>
                                            i.match.teamA._id === item.team._id || i.match.teamB._id === item.team._id) < 0)
                                            .map(item => {
                                                return {
                                                    id: item.team._id,
                                                    text: item.team.name,
                                                }
                                            })}
                                        referees={referees.filter(item => dayMatchs?.findIndex(i => i.match.referee._id === item.referee._id) < 0).map(item => {
                                            return {
                                                id: item.referee._id,
                                                text: item.referee.username,
                                            }
                                        })}
                                        tournamentId={tournamentId}
                                        day={tournamentDays.find(item => item.selected)}
                                        data={dayMatchs[i]?.match}
                                        createAccess={createAccess}
                                        dateValue={dateValue}
                                        deleteMatch={deleteMatch}
                                        addMatch={addMatch}
                                        matchId={matchId}
                                        editedMatch={editedMatch}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="day-match-games"
                    ref={showGamesRef}
                    style={{
                        display: showGames ? "flex" : "none",
                        backgroundColor: theme.background_color
                    }}
                >
                    <IoIosArrowBack className="icon-back" onClick={() => setShowGames(false)} />
                    {games?.length > 0 ? games.map((game) =>
                        <div key={game._id} className="a-match-game"
                            style={{
                                borderColor: theme.darken_border_color
                            }}
                        >
                            <div className="match-game-index"
                                style={{
                                    backgroundColor: theme.surface,
                                    color: theme.on_surface
                                }}
                            >{game.title}</div>
                            {game.status === 3 &&
                                <div className="match-game-report"
                                    style={{ color: theme.secondary }}
                                    onClick={() => getReport(game._id)}
                                >
                                    {stringFa.game_scoresheet}
                                </div>
                            }
                            <div className="match-game-details">
                                {Object.entries(game.players).map(([key, players]) =>
                                    <>
                                        <div key={key} className={`match-game-team ${key === "b" ? "left" : ''}`}>
                                            <div className="players">
                                                {players.map((player) =>
                                                    <div key={player._id} className="player">
                                                        <img className="player-image" src={!player.image ? IMAGE : `${baseUrl}uploads/players/${player.image}`} alt="avatar" />
                                                        <div className="player-name">{player.username}</div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="scores">
                                                {game.status === 3 && game.scores[key].map((item, k4) =>
                                                    <p style={{ fontWeight: item.winner && 'bold' }} key={k4}>
                                                        {item.score}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {key === 'a' ?
                                            game.status === 2 ?
                                                <div className="live-game"
                                                    onClick={() => onGoToLiveScore(game._id)}
                                                    style={{ color: theme.secondary, cursor: "pointer" }}>
                                                    {stringFa.live_score}
                                                    <div className="live-indicator" />
                                                </div> :
                                                <p className="dash">-</p> :
                                            ''
                                        }
                                    </>
                                )}

                            </div>
                        </div>
                    ) :
                        <div>بازی ای برای این مسابقه تعریف نشده است</div>
                    }
                </div>
            </div>

        </div >
    )

};

export default TeamsMatches;
