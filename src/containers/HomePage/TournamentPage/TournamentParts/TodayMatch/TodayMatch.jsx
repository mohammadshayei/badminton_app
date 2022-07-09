/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TodayMatch.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { dynamicApi } from "../../../../../api/home";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { useSelector } from "react-redux";
import GameBox from "../../GameBox/GameBox";

const TodayMatch = ({ tournamentId }) => {
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState([
        {
            _id: '1',
            title: "انفرادی اول",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        },
        {
            _id: '2',
            title: "انفرادی دوم",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        },
        {
            _id: '3',
            title: "دونفره اول",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        }, {
            _id: '4',
            title: "دونفره دوم",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        }, {
            _id: '5',
            title: "انفرادی سوم",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        }
    ])
    const [gyms, setGyms] = useState([])
    const [landNumbers, setLandNumbers] = useState([])
    const [officials, setOfficials] = useState([])
    const [teamAPlayers, setTeamAPlayers] = useState([])
    const [teamBPlayers, setTeamBPlayers] = useState([])
    const [gym, setGym] = useState({ id: "", value: "" })
    const [matchId, setMatchId] = useState('')
    const [teamsName, setTeamsName] = useState({ a: "", b: "" })

    const { token } = useSelector(state => state.auth)

    const onChangeGym = async e => {
        setGym({ id: e.id, value: e.text })
        try {
            const result = await dynamicApi({ tournamentId, gymId: e.id }, token, 'set_gym_match')
            if (!result.success)
                return;
            setLandNumbers(result.data.landNumbers.map((item, index) => {
                return {
                    text: item.number,
                    id: index
                }
            }))

        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
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

    const onSave = async (gameKey) => {
        setDialog(null)
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (gameIndex < 0) return;
        if (!gym.id) {
            setDialog(<ErrorDialog type="error">سالن را انتخاب کنید</ErrorDialog>)
            return;
        }
        let path, payload = {
            gameType: gameIndex === 2 || gameIndex === 3 ? 'double' : "single",
            gameNumber: updatedGames[gameIndex].gameNumber,
            landNumber: updatedGames[gameIndex].court.value,
            playersTeamA: updatedGames[gameIndex].players.a.map(item => item._id),
            playersTeamB: updatedGames[gameIndex].players.b.map(item => item._id),
            gymId: gym.id,
            tournamentId,
            matchId: matchId,
            umpireId: updatedGames[gameIndex].officials.umpire[0]._id,
            serviceUmpireId: updatedGames[gameIndex].officials.serviceJudge[0]._id,
        };
        if (updatedGames[gameIndex]._id.length > 1) {
            path = 'edit_game'

            payload = {
                ...payload,
                gameId: updatedGames[gameIndex]._id
            }
        } else {
            path = 'create_game'
            payload = {
                ...payload,
                index: gameIndex
            }
        }
        updatedGames[gameIndex].loading = true
        try {
            let fetchedTournament = await dynamicApi(payload, token, path)
            updatedGames[gameIndex].loading = false;
            if (fetchedTournament.success) {
                setDialog(<ErrorDialog type="success">{fetchedTournament.data.message}</ErrorDialog>)
                if (updatedGames[gameIndex]._id.length === 1)
                    updatedGames[gameIndex]._id = fetchedTournament.data.id;
                if (updatedGames[gameIndex].officials.umpire[0]._id)
                    updatedGames[gameIndex].status = 1
                else
                    updatedGames[gameIndex].status = 0

            } else {
                setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)

            }
            updatedGames[gameIndex].saved = true;

        } catch (error) {
            updatedGames[gameIndex].loading = false;
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setGames(updatedGames)

    }

    const onRemove = async (gameKey) => {
        setDialog(null)
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (updatedGames[gameIndex]._id.length === 1) return;
        if (gameIndex < 0) return;
        let payload = {
            gameId: updatedGames[gameIndex]._id,
            matchId,
        };
        try {
            let fetchedTournament = await dynamicApi(payload, token, 'remove_game_from_match')
            if (fetchedTournament.success) {
                setDialog(<ErrorDialog type="success">{fetchedTournament.data.message}</ErrorDialog>)
                updatedGames[gameIndex] = {
                    ...updatedGames[gameIndex],
                    _id: `${gameIndex}`,
                    court: { _id: "", value: "" },
                    status: -1,
                    gameNumber: "",
                    players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
                    officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
                    saved: false,
                    loading: false
                }
            } else {
                setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)
            }
        } catch (error) {
            console.log(error)
            setGames(updatedGames)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        updatedGames[gameIndex].saved = true;
        setGames(updatedGames)

    }

    const toggle = gameKey => {
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        updatedGames[gameIndex].officialsOpen = !updatedGames[gameIndex].officialsOpen
        setGames(updatedGames)
    }

    useEffect(() => {
        if (!tournamentId) return;
        (async () => {
            try {
                setLoading(true)
                const result = await dynamicApi({ id: tournamentId }, token, 'get_match_games_info')
                if (!result.success) {
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)
                } else {
                    setTeamAPlayers(result.data.teamA.players)
                    setTeamBPlayers(result.data.teamB.players)
                    setTeamsName({ a: result.data.teamA.name, b: result.data.teamB.name })
                    setGyms(result.data.gyms)
                    setOfficials(result.data.referees)
                    setMatchId(result.data.match._id)
                    setGym({ id: result.data.selectedGym._id, value: result.data.selectedGym.title })
                    setLandNumbers(result.data.selectedGym.land_numbers.map((item, index) => {
                        return {
                            text: item.number,
                            id: index
                        }
                    }))
                    let updatedGames = [...games]
                    result.data.match.games.forEach((item) => {
                        updatedGames[item.game.index]._id = item.game._id;
                        updatedGames[item.game.index].court.value = item.game.land_number;
                        updatedGames[item.game.index].status = item.game.status;
                        updatedGames[item.game.index].gameNumber = item.game.game_number;
                        updatedGames[item.game.index].players.a = item.game.teamA.players.map(i => {
                            return {
                                _id: i.player._id,
                                value: i.player.username,
                            }
                        });
                        updatedGames[item.game.index].players.b = item.game.teamB.players.map(i => {
                            return {
                                _id: i.player._id,
                                value: i.player.username,
                            }
                        });
                        if (item.game.referee)
                            updatedGames[item.game.index].officials.umpire[0] = { _id: item.game.referee._id, value: item.game.referee.username };
                        if (item.game.service_referee) updatedGames[item.game.index].officials.serviceJudge[0] = { _id: item.game.service_referee._id, value: item.game.service_referee.username };
                        updatedGames[item.game.index].saved = true;
                    })
                    setGames(updatedGames)
                }

                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [tournamentId])


    return <div className="today-match-container">
        {dialog}
        {games &&
            <>
                <div className="gym-and-date">
                    <div className="gym-selector">
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
                            value={gym.value}
                            inputContainer={{ padding: "0" }}
                        />
                    </div>
                    <div className="date">{new Date().toLocaleDateString('fa-IR')}</div>
                </div>
                {
                    games.map((game) =>
                        <GameBox
                            key={game._id}
                            game={game}
                            games={games}
                            setGames={setGames}
                            landNumbers={landNumbers}
                            listAPlayers={teamAPlayers}
                            listBPlayers={teamBPlayers}
                            officials={officials}
                            teamsName={teamsName}
                            onChangeCourt_GameNumber={onChangeCourt_GameNumber}
                            onChange={onChange}
                            onSave={onSave}
                            onRemove={onRemove}
                            toggle={toggle}
                        />
                    )
                }
            </>
        }
    </div >;
};

export default TodayMatch;