import { useState, useEffect } from "react";
import "./ScoreboardView.scss"
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";
import { useSelector } from "react-redux";
import { baseUrl } from "../../constants/Config";
import { useNavigate } from "react-router-dom";

const ScoreboardView = () => {
    const [data, setData] = useState(null);
    const [timer, setTimer] = useState(0)
    const [gameWonner, setGameWonner] = useState('')
    const [gameScores, setGameScores] = useState(null)
    const game = useSelector(state => state.gameInfo.gameView)
    const socket = useSelector(state => state.auth.socket)
    const { gymId, landNumber } = useSelector(state => state.home.assingScoreboard)
    const token = useSelector(state => state.auth.token)
    let navigate = useNavigate();


    useEffect(() => {
        if (game) {
            let updatedData = {}
            updatedData = {
                teamA: {
                    players: game.teamA.players,
                    score: game.teamA.score,
                    setWon: game.teamA.setWon
                }
            }
            updatedData = {
                ...updatedData,
                teamB: {
                    players: game.teamB.players,
                    score: game.teamB.score,
                    setWon: game.teamB.setWon
                }
            }
            setData(updatedData);
        }
    }, [game])

    useEffect(() => {
        if (socket && game && data) {
            if (timer === 0) {
                socket.on('get_change_score_set', (payload => {
                    const { scoreA, scoreB, gameId } = payload;
                    if (gameId === game._id) {
                        setTimer(200)
                        let updatedGame = { ...data }
                        updatedGame.teamA.score = scoreA
                        updatedGame.teamB.score = scoreB
                        setData(updatedGame)
                        setTimeout(() => {
                            setTimer(0)
                        }, 200)
                    }
                }))
            }

        }
    }, [socket, game, data, timer])
    useEffect(() => {
        if (socket && game) {
            socket.on('get_end_game_stats', (payload => {
                const { teamA, teamB, gameId } = payload;
                if (gameId === game._id) {
                    console.log(teamA)
                    setGameScores({ teamA, teamB })
                }
            }))

        }
    }, [socket, game])
    useEffect(() => {
        if (socket && game) {
            socket.on('get_winner_team', (payload => {
                let { teamName, gameId } = payload;
                if (gameId === game._id) {
                    setGameWonner(teamName)
                }
            }))
        }
    }, [socket, game])
    useEffect(() => {
        if (gameWonner !== '') {
            let updatedGame = { ...data }
            if (gameWonner === 'team1')
                updatedGame.teamA.setWon = updatedGame.teamA.setWon + 1
            else
                updatedGame.teamB.setWon = updatedGame.teamB.setWon + 1
            updatedGame.teamA.score = 0
            updatedGame.teamB.score = 0
            setData(updatedGame)
            setGameWonner('')
            if (gymId && landNumber && token) {
                setTimeout(() => {
                    navigate(`/wait?gymId=${gymId}&landNumber=${landNumber}`)
                }, 30000);
            }

        }
    }, [gameWonner])

    return (
        <div className="scoreboard-viewers">
            <div className="container">
                {data ?
                    Object.entries(data).map(([k, v]) =>
                        (v.players.length > 0) &&
                        (<div
                            className={`player-block-view ${k === "teamB" && "rev-block"}`}
                            style={{
                                background: (data.teamA.setWon === 2) || (data.teamB.setWon === 2) ?
                                    v.setWon === 2 ?
                                        "rgba(172, 209, 175,0.25)" :
                                        "rgba(244, 113, 116,0.3)"
                                    :
                                    "transparent"
                            }}
                            key={k}
                        >
                            <div className="player-name-and-image"
                                style={{ justifyContent: v.players.length === 1 ? "center" : "space-evenly" }}
                            >
                                <div className="player-name"
                                    style={{
                                        transform:
                                            v.players[0].player.username.length > 16 ?
                                                (`translateX(${k === "teamB" ? "-" : "+"}${v.players[0].player.username.length * 4}px)`) :
                                                "translateX(0)"
                                    }}
                                >
                                    {v.players[0].player.username}
                                </div>
                                <img className="player-img"
                                    src={v.players[0].player.image !== '' ?
                                        `${baseUrl}uploads/players/${v.players[0].player.image}` :
                                        PROFILE_IMAGE}
                                    alt="profile_image"
                                    style={{
                                        maxWidth: v.players.length === 1 ? "80%" : "70%",
                                        marginTop: v.players.length === 1 ? "1.5rem" : "0"
                                    }}
                                />
                                {v.players[1] &&
                                    <img
                                        className="player-img"
                                        src={v.players[1].player.image !== '' ?
                                            `${baseUrl}uploads/players/${v.players[1].player.image}` :
                                            PROFILE_IMAGE}
                                        alt="profile_image" />
                                }
                                {v.players[1] && <div className="player-name"
                                    style={{
                                        transform:
                                            v.players[1].player.username.length > 16 ?
                                                (`translateX(${k === "teamB" ? "-" : "+"}${v.players[1].player.username.length * 4}px)`) :
                                                "translateX(0)"
                                    }}
                                >
                                    {v.players[1].player.username}
                                </div>}
                            </div>
                            <div className="player-score-and-set">
                                <div className="set-score"
                                    style={{
                                        fontSize: (data.teamA.setWon === 2) || (data.teamB.setWon === 2) ? "13vw" : "8vw",
                                    }}
                                >
                                    <div>{v.setWon}</div>
                                </div>
                                {gameScores ?
                                    <div className="score-digit">
                                        <div className="scores"
                                            style={{
                                                fontSize: "8vw",
                                                lineHeight: "8vw"
                                            }}
                                        >{gameScores[k].map((item) =>
                                            <p>{item}</p>
                                        )}</div>
                                    </div>
                                    :
                                    <div className="score-digit">
                                        <div className="digital-panel"
                                            style={{
                                                fontSize: v.score > 9 ? "16vw" : "20vw",
                                                lineHeight: v.score > 9 ? "16vw" : "15vw"
                                            }}
                                        >{v.score}</div>
                                    </div>
                                }
                            </div>
                        </div>

                        )
                    )
                    : "Loading Info..."}
            </div>
        </div>
    )
}

export default ScoreboardView
// {(data.teamA.setWon === 2) || (data.teamB.setWon === 2) ?
//     <div className="score-digit">
//         <div className="scores"
//             style={{
//                 fontSize: "8vw",
//                 lineHeight: "8vw"
//             }}
//         >{game.sets.map((s) =>
//             <p>{s.set[k].score}</p>
//         )}</div>
//     </div>
//     :
//     <div className="score-digit">
//         <div className="digital-panel"
//             style={{
//                 fontSize: v.score > 9 ? "16vw" : "20vw",
//                 lineHeight: v.score > 9 ? "16vw" : "15vw"
//             }}
//         >{v.score}</div>
//     </div>
// }