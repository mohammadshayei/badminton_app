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
            referees: { umpire: [{ _id: "", value: "" },], serviceReferee: [{ _id: "", value: "" },] },
            saved: false
        },
        {
            _id: '2',
            title: "انفرادی دوم",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            referees: { umpire: [{ _id: "", value: "" },], serviceReferee: [{ _id: "", value: "" },] },
            saved: false

        },
        {
            _id: '3',
            title: "دونفره اول",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            referees: { umpire: [{ _id: "", value: "" },], serviceReferee: [{ _id: "", value: "" },] },
            saved: false

        }, {
            _id: '4',
            title: "دونفره دوم",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" }, { _id: "", value: "" }], b: [{ _id: "", value: "" }, { _id: "", value: "" }] },
            referees: { umpire: [{ _id: "", value: "" },], serviceReferee: [{ _id: "", value: "" },] },
            saved: false

        }, {
            _id: '5',
            title: "انفرادی سوم",
            court: "",
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            referees: { umpire: [{ _id: "", value: "" },], serviceReferee: [{ _id: "", value: "" },] },
            saved: false

        }
    ])
    const [gyms, setGyms] = useState([])
    const [referees, setReferees] = useState([])
    const [teamAPlayers, setTeamAPlayers] = useState([])
    const [teamBPlayers, setTeamBPlayers] = useState([])
    const [gym, setGym] = useState({ id: "", value: "" })

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
        if (type === 'gm')
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
                    setReferees(result.data.referees)
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
            updatedGames[gameIndex].referees[teamKey][playerIndex]._id = e.id
            updatedGames[gameIndex].referees[teamKey][playerIndex].value = e.text
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
                                        onChange={(e) => onChangeCourt_GameNumber(e, game._id, 'gm')}
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
                                        onChange={(e) => onChangeCourt_GameNumber(e, game._id, 'cr')}
                                        value={game.court}

                                    />
                                </div>
                            </div>

                            <div className="match-game-details">
                                {
                                    Object.entries(game.players).map(([k2, v]) =>
                                        <div key={k2} className={`match-game-team ${k2 === 'b' ? "left" : ''}`}>
                                            <div className="team-name">
                                                {k2 === 'b' ? 'team2' : 'team1'}
                                            </div>
                                            <div className="players">
                                                {[...new Array(v.length)].map((_, k3) =>
                                                    <div key={k3} className="player">
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
                            <div className="match-game-details">
                                {
                                    Object.entries(game.referees).map(([k2, v]) =>
                                        <div key={k2} className={`match-game-team ${k2 === 'serviceReferee' ? "left" : ''}`}>
                                            <div className="team-name">
                                                {k2 === 'serviceReferee' ? 'داور سرویس' : 'داور'}
                                            </div>
                                            <div className="players">
                                                {[...new Array(v.length)].map((_, k3) =>
                                                    <div key={k3} className="player">
                                                        <CustomInput
                                                            placeHolder={stringFa.undefined}
                                                            elementType={elementTypes.dropDown}
                                                            items={referees.map(item => {
                                                                return {
                                                                    id: item.referee._id,
                                                                    text: item.referee.username,
                                                                }
                                                            })}
                                                            inputContainer={{ padding: "0" }}
                                                            onChange={(e) => onChange(e, game._id, k2, k3, 'referee')}
                                                            value={game.referees[k2][k3].value}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>)
                                }
                            </div>
                            <TransparentButton
                                config={{
                                    disabled: !(
                                        game.court && game.gameNumber
                                        && game.referees.serviceReferee[0].value
                                        && game.referees.umpire[0].value
                                        && game.players.a.findIndex(item => !item.value) < 0
                                        && game.players.b.findIndex(item => !item.value) < 0)

                                }}
                                ButtonStyle={{
                                    padding: "0",
                                    fontSize: "clamp(0.8rem,1vw,0.9rem)"
                                }}
                                onClick={onSave}
                            >
                                {stringFa.save}
                            </TransparentButton>
                        </div>)
                }
            </>
        }
    </div >;
};

export default TodayMatch;
// {
//     games.map((game, k1) =>
//         <div key={k1} className="match-game"
//             style={{
//                 backgroundColor: theme.surface
//             }}
//         >
//             <div className="match-game-header">
//                 <div className="match-game-number">
//                     <CustomInput
//                         elementConfig={{
//                             placeholder: stringFa.number_of_game,
//                         }}
//                         inputContainer={{
//                             padding: "0",
//                             width: "100px",
//                         }}
//                         inputStyle={{
//                             fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
//                             minWidth: "100px",
//                             direction: "ltr"
//                         }}
//                     />
//                 </div>
//                 <div className="match-game-index"
//                     style={{
//                         backgroundColor: theme.darken_border_color, //if done -> theme.primary
//                         color: theme.on_primary
//                     }}
//                 >{game[0]}</div>
//                 <div className="match-game-number  game-court">
//                     <CustomInput
//                         elementConfig={{
//                             placeholder: "court",
//                         }}
//                         inputContainer={{
//                             padding: "0",
//                             width: "100px",
//                         }}
//                         inputStyle={{
//                             fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
//                             minWidth: "100px",
//                             direction: "ltr"
//                         }}
//                     />
//                 </div>
//             </div>

//             <div className="match-game-details">
//                 {game.map((team, k2) =>
//                     k2 > 0 &&
//                     <div key={k2} className={`match-game-team ${k2 === 2 ? "left" : ''}`}>
//                         <div className="team-name">
//                             {team.teamName}
//                         </div>
//                         <div className="players">
//                             {Object.entries(team.players).map(([k3, player]) =>
//                                 <div key={k3} className="player">
//                                     <CustomInput
//                                         placeHolder={stringFa.undefined}
//                                         elementType={elementTypes.dropDown}
//                                         items={[]}
//                                         inputContainer={{ padding: "0" }}
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                         {/* {k2 === 1 ? <p className="dash">-</p> : ''} */}
//                     </div>
//                 )}
//             </div>
//             <TransparentButton
//                 config={{ disabled: true }}
//                 ButtonStyle={{
//                     padding: "0",
//                     fontSize: "clamp(0.8rem,1vw,0.9rem)"
//                 }}>
//                 {stringFa.save}
//             </TransparentButton>
//         </div>)
// }