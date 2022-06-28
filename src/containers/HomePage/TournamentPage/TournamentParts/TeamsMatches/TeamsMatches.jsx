/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TeamsMatches.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import IMAGE from '../../../../../assets/images/user_avatar.svg';
import { IoIosArrowBack } from "react-icons/io";
import Day from "./Day";
import Match from "./Match";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { dynamicApi } from "../../../../../api/home";
import { useSelector } from "react-redux";

const TeamsMatches = ({ tournamentId, gameDate }) => {
    const [tournamentDays, setTournamentDays] = useState([]);
    const [dayMatchs, setDayMatchs] = useState([])
    const [teamsCount, setTeamsCount] = useState(0)

    const [dateValue, setDateValue] = useState('')
    const [showGames, setShowGames] = useState(false);   //show a match games
    const [loading, setLoading] = useState(false)
    const [dateLoading, setDateLoading] = useState(false)
    const [dialog, setDialog] = useState(null)


    const { token } = useSelector(state => state.auth)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    //fetched data :
    const games = {
        game1: {
            index: "انفرادی اول",
            team1: { players: { player1: { name: "محمد محمدی", image: "" } }, scores: [21, 21] }
            , team2: { players: { player1: { name: "احمد احمدی", image: "" } }, scores: [19, 18] }
        },
        game2: {
            index: "انفرادی دوم",
            team1: { players: { player1: { name: "حمید حمیدی", image: "" } }, scores: [21, 21] }
            , team2: { players: { player1: { name: "رضا رضایی", image: "" } }, scores: [19, 18] }
        }
        ,
        game3: {
            index: "دونفره اول",
            team1: { players: { player1: { name: "حسن حسنی", image: "" }, player2: { name: "کریم کریمی", image: "" } }, scores: [21, 21] }
            , team2: { players: { player1: { name: "داوود داوودی", image: "" }, player2: { name: "جواد جوادی", image: "" } }, scores: [19, 18] }
        }
    }


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
          
            setDateLoading(false)
        } catch (error) {
            setDateLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }
    const selectDay = (key) => {
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
        setDayMatchs(selected.matchs)
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
                setDateValue(fetchedData.data.selectedDay.date ? fetchedData.data.selectedDay.date : '')
                setTeamsCount(fetchedData.data.teamsCount)
                setTournamentDays(updatedTournamentsDay)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [tournamentId])


    return (
        <div className="teams-matches"
            style={{
                color: theme.on_background
            }}
        >
            {dialog}
            <div className="day-selector-container">
                {tournamentDays.map(day =>
                    <Day
                        key={day._id}
                        day={day}
                        selectDay={() => selectDay(day._id)}
                    />
                )}
            </div>
            <div className="day-content">
                <div className={`day-events ${showGames ? "hide" : ""}`}>
                    <div className="date-of-day">
                        <CustomInput
                            title={stringFa.date}
                            elementType={elementTypes.datePicker}
                            value={dateValue}
                            inputContainer={{ paddingBottom: "0" }}
                            onChange={onChangeDatePicker}
                            validation={{ bdRequired: true }}
                            elementConfig={{
                                minDate: gameDate ? new Date(gameDate.start) : null,
                                maxDate: gameDate ? new Date(gameDate.end) : null
                            }}

                        />
                    </div>
                    <div className="teams-table">
                        {[1, 2, 3].map((v, i) =>
                            <div className="table-row"
                                style={{
                                    borderColor: theme.border_color
                                }}
                            >
                                <Match key={i} index={i} setShowGames={setShowGames} />
                            </div>
                        )}
                    </div>
                </div>









                <div className="day-match-games"
                    style={{
                        display: showGames ? "flex" : "none",
                        backgroundColor: theme.background_color
                    }}
                >
                    <IoIosArrowBack className="icon-back" onClick={() => setShowGames(false)} />
                    {Object.entries(games).map(([k1, match]) =>
                        <div key={k1} className="a-match-game">
                            <div className="match-game-number">{match.number}</div>
                            <div className="match-game-details">
                                {Object.entries(match).map(([k2, team]) =>
                                    k2 !== "number" &&
                                    <>
                                        <div key={k2} className={`match-game-team ${k2 === "team2" ? "left" : ''}`}>
                                            <div className="players">
                                                {Object.entries(team.players).map(([k3, player]) =>
                                                    <div key={k3} className="player">
                                                        <img className="player-image" src={player.image === '' ? IMAGE : player.image} alt="avatar" />
                                                        <div className="player-name">{player.name}</div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="scores">
                                                {Object.entries(team.scores).map(([k4, score]) =>
                                                    <p key={k4}>
                                                        {score}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {k2 === "team1" ? <p className="dash">-</p> : ''}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="day-match-games"
                style={{
                    display: showGames ? "flex" : "none",
                    backgroundColor: theme.background_color
                }}
            >
                <IoIosArrowBack className="icon-back" onClick={() => setShowGames(false)} />
                {Object.entries(games).map(([k1, game]) =>
                    <div key={k1} className="a-match-game">
                        <div className="match-game-index">{game.index}</div>
                        <div className="match-game-details">
                            {Object.entries(game).map(([k2, team]) =>
                                k2 !== "index" &&
                                <>
                                    <div key={k2} className={`match-game-team ${k2 === "team2" ? "left" : ''}`}>
                                        <div className="players">
                                            {Object.entries(team.players).map(([k3, player]) =>
                                                <div key={k3} className="player">
                                                    <img className="player-image" src={player.image === '' ? IMAGE : player.image} alt="avatar" />
                                                    <div className="player-name">{player.name}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="scores">
                                            {Object.entries(team.scores).map(([k4, score]) =>
                                                <p key={k4}>
                                                    {score}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {k2 === "team1" ? <p className="dash">-</p> : ''}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

};

export default TeamsMatches;
