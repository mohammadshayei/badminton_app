/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import "./TeamsMatches.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import IMAGE from '../../../../../assets/images/user_avatar.svg';
import { IoClose } from "react-icons/io5";
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
import { IoTrashBin } from "react-icons/io5";

const TeamsMatches = ({ onShowGame, matchId, createAccess, tournamentId, gameDate }) => {
    const [tournamentDays, setTournamentDays] = useState([]);
    const [dayMatchs, setDayMatchs] = useState([])
    const [teams, setTeams] = useState([])
    const [referees, setReferees] = useState([])
    const [dateValue, setDateValue] = useState('')
    const [showGames, setShowGames] = useState(false);   //show a match games
    const [loading, setLoading] = useState(false)
    const [dateLoading, setDateLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [games, setGames] = useState([])
    const [maxMatchCount, setMaxMatchCount] = useState(0)
    const [isReferee, setIsReferee] = useState(false);

    const { token, socket, user } = useSelector(state => state.auth)

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const showGamesRef = useRef();
    let navigate = useNavigate()
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
        if (!dateValue || dayMatchs?.length > 0) return;
        setDialog(null)
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
        if (tournamentDays.find(item => item.selected)._id === key) return;
        setShowGames(false)
        setDayMatchs([])
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
        navigate(`/tournaments/${tournamentId}?part=teamMatch`)
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

    // useEffect(() => {
    //     let showTimeOut = setTimeout(() => {
    //         showGamesRef.current.scrollIntoView({ inline: "center" })
    //     }, 500);

    //     return () => {
    //         clearTimeout(showTimeOut)
    //     };
    // }, [showGames]);

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

    useEffect(() => {
        if (!referees || !user) {
            setIsReferee(false);
            return;
        }
        referees.forEach(item => {
            if (item.referee._id === user._id)
                setIsReferee(true);
        })
        if (user.is_fekrafzar)
            setIsReferee(true);
    }, [user, referees]);

    return (
        <div className="teams-matches"
            style={{
                color: theme.on_background
            }}
        >
            {dialog}
            <div className={`day-selector-container ${showGames ? "hide-selector" : ""}`}>
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
                                <>
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

                                        }}
                                    />
                                    <IoTrashBin
                                        className={`icon-trash ${(dayMatchs?.length === 0 && dateValue) ? "" : "icon-disabled"}`}
                                        onClick={onClearDate}
                                        color={theme.error}
                                    />
                                </>
                                :
                                <TextComponent
                                    value={dateValue ? new Date(dateValue).toLocaleDateString('fa-IR') : stringFa.undefined}
                                    title={stringFa.date}
                                />
                        }
                    </div>
                    <div className="teams-table">
                        {
                            [...new Array(teams?.length > 1 ? Math.trunc((teams.length) / 2) : 1)].map((_, i) =>
                                <div key={i} className="table-row">
                                    <Match
                                        key={i}
                                        index={i}
                                        setShowGames={setShowGames}
                                        onShowGame={onShowGame}
                                        teams={teams?.filter(item => dayMatchs?.findIndex(i =>
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
                    <IoClose
                        className="icon-close"
                        onClick={() => {
                            navigate(`/tournaments/${tournamentId}?part=teamMatch`)
                            setShowGames(false)
                        }}
                        color={theme.error}
                    />
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
                            {game.status === 3 && isReferee &&
                                <div className="match-game-report"
                                    style={{ color: theme.secondary }}
                                    onClick={() => getReport(game._id)}
                                >
                                    {stringFa.game_scoresheet}
                                </div>
                            }
                            <div className="match-game-details">
                                {Object.entries(game.players).map(([key, players]) =>
                                    <Fragment key={key}>
                                        <div className={`match-game-team ${key === "b" ? "left" : ''}`}>
                                            <div className="players">
                                                {players.map((player, i) =>
                                                    <div key={player._id} className="player"
                                                        style={{
                                                            marginTop: i > 0 ? "0.25rem" : 0
                                                        }}
                                                    >
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
                                    </Fragment>
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
