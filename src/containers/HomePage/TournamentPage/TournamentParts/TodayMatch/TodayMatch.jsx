/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import "./TodayMatch.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { dynamicApi } from "../../../../../api/home";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { useSelector } from "react-redux";
import GameBox from "../../GameBox/GameBox";

const TodayMatch = ({ tournamentId, createAccess }) => {
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState([
        {
            _id: '1',
            title: "انفرادی اول",
            status: -1,
            gameNumber: "1",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            officialsOpen: false,
        },
        {
            _id: '2',
            title: "انفرادی دوم",
            status: -1,
            gameNumber: "2",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            officialsOpen: false,
        },
        {
            _id: '3',
            title: "دونفره اول",
            status: -1,
            gameNumber: "3",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            officialsOpen: false,
        }, {
            _id: '4',
            title: "دونفره دوم",
            status: -1,
            gameNumber: "4",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            officialsOpen: false,
        }, {
            _id: '5',
            title: "انفرادی سوم",
            status: -1,
            gameNumber: "5",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            officialsOpen: false,
        }
    ])
    const [officials, setOfficials] = useState([])
    const [teamAPlayers, setTeamAPlayers] = useState([])
    const [teamBPlayers, setTeamBPlayers] = useState([])
    const [matchId, setMatchId] = useState('')
    const [teamsName, setTeamsName] = useState({ a: "", b: "" })
    const [itemLoading, setItemLoading] = useState({ type: '', content: "" })
    const { token, socket } = useSelector(state => state.auth)
    const [order, setOrder] = useState({
        gym: {
            title: "نام سالن",
            text: "",
            id: "",
            items: [],
            inputContainer: {
                padding: "0 0.5rem"
            },
            invalid: false,
            touched: true,
            shouldValidate: true,
            validationMessage: "",
        },
        court: {
            title: "شماره زمین",
            text: "",
            id: "",
            items: [],
            inputContainer: {
                padding: "0 0.5rem"
            },
            invalid: false,
            validationMessage: "",
            touched: true,
            shouldValidate: true,
        },
    })
    const onChangeGym_Court = async (e, type) => {
        let updatedOrder = { ...order }
        updatedOrder[type].text = e.text;
        updatedOrder[type].id = e.id;
        updatedOrder[type].invalid = false;

        if (type === 'gym') {
            try {
                const result = await dynamicApi({ tournamentId, gymId: e.id }, token, 'set_gym_match')
                if (!result.success)
                    return;
                updatedOrder.court.items = result.data.landNumbers.map((item, index) => {
                    return {
                        text: item.number,
                        id: index
                    }
                })

            } catch (error) {
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
        }
        setOrder(updatedOrder)
    }


    const onChangeGameNumber = (e, key) => {
        let updatedGames = [...games]
        let gmIndex = updatedGames.findIndex(item => item._id === key)
        if (gmIndex < 0) return;
        updatedGames[gmIndex].gameNumber = e.target.value;
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
        let updatedGames = [...games]
        let gameIndex = updatedGames.findIndex(item => item._id === gameKey)
        if (gameIndex < 0) return;
        let updatedOrder = { ...order }
        if (!updatedOrder.gym.text) {
            updatedOrder.gym.invalid = true;
            updatedOrder.gym.validationMessage = 'سالن را انتخاب کنید'
            setOrder(updatedOrder)
            return;
        }
        if (!updatedOrder.court.text) {
            updatedOrder.court.invalid = true;
            updatedOrder.court.validationMessage = 'شماره زمین را انتخاب کنید'
            setOrder(updatedOrder)
            return;
        }
        setDialog(null)
        setItemLoading({ type: "save", content: gameKey })
        let path, payload = {
            gameType: gameIndex === 2 || gameIndex === 3 ? 'double' : "single",
            gameNumber: updatedGames[gameIndex].gameNumber,
            landNumber: order.court.text,
            playersTeamA: updatedGames[gameIndex].players.a.map(item => item._id),
            playersTeamB: updatedGames[gameIndex].players.b.map(item => item._id),
            gymId: order.gym.id,
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
        try {
            let fetchedTournament = await dynamicApi(payload, token, path)
            updatedGames[gameIndex].loading = false;
            if (fetchedTournament.success) {
                setDialog(<ErrorDialog type="success">{fetchedTournament.data.message}</ErrorDialog>)
                if (updatedGames[gameIndex]._id.length === 1)
                    updatedGames[gameIndex]._id = fetchedTournament.data.id;
                if (updatedGames[gameIndex].officials.umpire[0]._id) {
                    updatedGames[gameIndex].status = 1
                    socket.emit('create_game', {
                        game: {
                            _id: fetchedTournament.data.id,
                            game_number: updatedGames[gameIndex].gameNumber,
                            land_number: order.court.text,
                            gymId: order.gym.id,
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

    const onRemove = async (gameKey) => {
        setDialog(null)
        setItemLoading({ type: "delete", content: gameKey })
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
                    status: -1,
                    gameNumber: "",
                    players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
                    officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
                    saved: false,
                }
                socket.emit('delete_game', {
                    gameId: updatedGames[gameIndex]._id,
                    tournamentId
                })
            } else {
                setDialog(<ErrorDialog type="error">{fetchedTournament.data.message}</ErrorDialog>)
            }
        } catch (error) {
            console.log(error)
            setItemLoading({ type: "", content: '' })
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        updatedGames[gameIndex].saved = true;
        setGames(updatedGames)
        setItemLoading({ type: "", content: '' })

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
                    let updatedOrder = { ...order }
                    setTeamAPlayers(result.data.teamA.players)
                    setTeamBPlayers(result.data.teamB.players)
                    setTeamsName({ a: result.data.teamA.name, b: result.data.teamB.name })
                    updatedOrder.gym.items = result.data.gyms.map((item) => {
                        return {
                            text: item.gym.title,
                            id: item.gym._id
                        }
                    })
                    setOfficials(result.data.referees)
                    setMatchId(result.data.match._id)
                    if (result.data.selectedGym) {
                        updatedOrder.gym.id = result.data.selectedGym._id
                        updatedOrder.gym.text = result.data.selectedGym.title
                        updatedOrder.court.items = result.data.selectedGym.land_numbers.map((item, index) => {
                            return {
                                text: item.number,
                                id: index
                            }
                        })
                    }
                    let updatedGames = [...games]
                    result.data.match.games.forEach((item, index) => {
                        if (index === 0) {
                            updatedOrder.court.text = item.game.land_number
                            updatedOrder.court.id = '1'
                        }
                        updatedGames[item.game.index]._id = item.game._id;
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
                    setOrder(updatedOrder)

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
                        {
                            Object.entries(order).map(([k, v], index) => <div key={k}
                                style={{
                                    width: index === 0 ? "60%" : "unset"
                                }}
                            >
                                <div style={{ marginRight: '1rem' }}>{v.title}</div>
                                <CustomInput
                                    placeHolder={stringFa.undefined}
                                    elementType={elementTypes.dropDown}
                                    onChange={(e) => onChangeGym_Court(e, k)}
                                    items={v.items}
                                    value={v.text}
                                    inputContainer={v.inputContainer}
                                    invalid={v.invalid}
                                    touched={true}
                                    shouldValidate={v.shouldValidate}
                                // validationMessage={v.validationMessage}
                                />
                            </div>)
                        }
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
                            listAPlayers={teamAPlayers}
                            listBPlayers={teamBPlayers}
                            officials={officials}
                            teamsName={teamsName}
                            onChangeGameInfo={onChangeGameNumber}
                            onChange={onChange}
                            onSave={onSave}
                            onRemove={onRemove}
                            toggle={toggle}
                            itemLoading={itemLoading}
                            createAccess={createAccess}
                        />
                    )
                }
            </>
        }
    </div >;
};

export default TodayMatch;