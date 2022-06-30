/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TodayMatch.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import TransparentButton from "../../../../../components/UI/Button/TransparentButton/TransparentButton";
import { dynamicApi } from "../../../../../api/home";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { useSelector } from "react-redux";
import { IoTrashBin } from "react-icons/io5";

const TodayMatch = ({ tournamentId }) => {
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)

    const [games, setGames] = useState([
        {
            _id: '1',
            title: "انفرادی اول",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false
        },
        {
            _id: '2',
            title: "انفرادی دوم",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false

        },
        {
            _id: '3',
            title: "دونفره اول",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false

        }, {
            _id: '4',
            title: "دونفره دوم",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false

        }, {
            _id: '5',
            title: "انفرادی سوم",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false

        }
    ])
    const [gyms, setGyms] = useState([])
    const [officials, setOfficials] = useState([])
    const [teamAPlayers, setTeamAPlayers] = useState([])
    const [teamBPlayers, setTeamBPlayers] = useState([])
    const [gym, setGym] = useState({ id: "", value: "" })
    const [showOfficals, setShowOfficals] = useState(false);


    const { token } = useSelector(state => state.auth)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onChangeGym = e => {
        setGym({ id: e.id, value: e.text })
    }

    const onChangeCourt_GameNumber = (e, key, type) => {
        let updatedGames = [...games]
        let gmIndex = updatedGames.findIndex(item => item._id === key)
        if (gmIndex < 0) return;
        if (type === 'gameNumber')
            updatedGames[gmIndex].gameNumber = e.target.value;
        else
            updatedGames[gmIndex].court = e.target.value;
        setGames(updatedGames)

    }

    const onSave = (gameKey) => {
        console.log('saves')
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
                    setTeamAPlayers(result.data.teamAPlayers)
                    setTeamBPlayers(result.data.teamBPlayers)
                    setGyms(result.data.gyms)
                    setOfficials(result.data.referees)
                }

                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [tournamentId])

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
        setGames(updatedGames)
    }

    return <div className="today-match-container">
        {games &&
            <>
                <div className="gym-and-date">
                    <div className="gym-selector">
                        {/* <div>نام سالن</div> */}
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
                            value={`سالن : ${gym.value}`}
                            inputContainer={{ padding: "0" }}
                        />
                    </div>
                    <div className="date">{new Date().toLocaleDateString('fa-IR')}</div>
                </div>
                {
                    games.map((game) =>
                        <div key={game._id} className="match-game"
                            style={{
                                backgroundColor: theme.surface
                            }}
                        >
                            <div className="match-game-header">
                                <div className="match-game-number">
                                    <CustomInput
                                        elementConfig={{
                                            placeholder: stringFa.number_of_game,
                                        }}
                                        inputContainer={{
                                            padding: "0",
                                            width: "100px",
                                        }}
                                        inputStyle={{
                                            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                                            minWidth: "100px",
                                            direction: "ltr"
                                        }}
                                        onChange={(e) => onChangeCourt_GameNumber(e, game._id, 'gameNumber')}
                                        value={game.gameNumber}
                                    />
                                </div>
                                <div className="match-game-index"
                                    style={{
                                        backgroundColor: game.saved ? theme.primary : theme.darken_border_color, //if done -> theme.primary
                                        color: theme.on_primary
                                    }}
                                >{game.title}</div>
                                <div className="match-game-number  game-court">
                                    <CustomInput
                                        elementConfig={{
                                            placeholder: "court",
                                        }}
                                        inputContainer={{
                                            padding: "0",
                                            width: "100px",
                                        }}
                                        inputStyle={{
                                            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                                            minWidth: "100px",
                                            direction: "ltr"
                                        }}
                                        onChange={(e) => onChangeCourt_GameNumber(e, game._id, 'court')}
                                        value={game.court}

                                    />
                                </div>
                            </div>

                            <div className="match-game-details">
                                {
                                    Object.entries(game.players).map(([k2, v]) =>
                                        <div key={k2} className={`game-detail-section ${k2 === 'b' ? "left" : ''}`}>
                                            <div className="detail-name">
                                                {k2 === 'b' ? 'team2' : 'team1'}
                                            </div>
                                            <div className="detail-items">
                                                {[...new Array(v.length)].map((_, k3) =>
                                                    <div key={k3} className="detail-item">
                                                        <CustomInput
                                                            placeHolder={stringFa.undefined}
                                                            elementType={elementTypes.dropDown}
                                                            items={k2 === 'b' ? teamBPlayers?.map(item => {
                                                                return {
                                                                    id: item._id,
                                                                    text: item.username,
                                                                }
                                                            }) : teamAPlayers?.map(item => {
                                                                return {
                                                                    id: item._id,
                                                                    text: item.username,
                                                                }
                                                            })}
                                                            onChange={(e) => onChange(e, game._id, k2, k3, 'player')}
                                                            value={game.players[k2][k3].value}
                                                            inputContainer={{ padding: "0" }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>)
                                }
                            </div>
                            <div className="match-game-details match-game-officials"
                                style={{
                                    backgroundColor: officials.length === 2 ? theme.primary : theme.border_color,
                                    padding: showOfficals ? "0.5rem" : "0",
                                    maxHeight: showOfficals ? "250px" : "1px",
                                }}
                            >
                                {
                                    Object.entries(game.officials).map(([k2, v]) =>
                                        <div key={k2} className={`game-detail-section ${k2 === 'serviceJudge' ? "left" : ''}`}
                                            style={{ opacity: showOfficals ? 1 : 0 }}
                                        >
                                            <div className="detail-name">
                                                {k2 === 'serviceJudge' ? 'داور سرویس' : 'داور'}
                                            </div>
                                            {[...new Array(v.length)].map((_, k3) =>
                                                <div key={k3} className="detail-items">
                                                    <CustomInput
                                                        placeHolder={stringFa.undefined}
                                                        elementType={elementTypes.dropDown}
                                                        items={officials.map(item => {
                                                            return {
                                                                id: item.referee._id,
                                                                text: item.referee.username,
                                                            }
                                                        })}
                                                        inputContainer={{ padding: "0" }}
                                                        onChange={(e) => onChange(e, game._id, k2, k3, 'official')}
                                                        value={game.officials[k2][k3].value}
                                                    />
                                                </div>
                                            )}
                                        </div>)
                                }
                            </div>
                            <div className="match-game-buttons">
                                <TransparentButton
                                    ButtonStyle={{
                                        padding: "0",
                                        fontSize: "clamp(0.8rem,1vw,0.9rem)",
                                        color: theme.error
                                    }}
                                    onClick={() => console.log("clear")}
                                >
                                    <IoTrashBin />
                                </TransparentButton>
                                <TransparentButton
                                    config={{
                                        disabled: !(
                                            game.court && game.gameNumber
                                            && game.officials.serviceJudge[0].value
                                            && game.officials.umpire[0].value
                                            && game.players.a.findIndex(item => !item.value) < 0
                                            && game.players.b.findIndex(item => !item.value) < 0)

                                    }}
                                    ButtonStyle={{
                                        padding: "0",
                                        fontSize: "clamp(0.8rem,1vw,0.9rem)",
                                        color: theme.secondary
                                    }}
                                    onClick={onSave}
                                >
                                    {stringFa.save}
                                </TransparentButton>
                                <TransparentButton
                                    ButtonStyle={{
                                        padding: "0",
                                        fontSize: "clamp(0.6rem,0.9vw,0.8rem)"
                                    }}
                                    onClick={() => setShowOfficals(!showOfficals)}
                                >
                                    {showOfficals ? '- ' : '+ '}{stringFa.officials}
                                </TransparentButton>
                            </div>
                        </div>)
                }
            </>
        }
    </div >;
};

export default TodayMatch;