import { useState, useEffect } from "react";
import "./ScoreboardView.scss"
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";
import { useSelector } from "react-redux";
import { baseUrl } from "../../constants/Config";

const ScoreboardView = () => {
    const [data, setData] = useState(null);
    const game = useSelector(state => state.gameInfo.gameView)
    const socket = useSelector(state => state.auth.socket)

    useEffect(() => {
        if (game) {
            let updatedData = {}
            let setWonA = 0, setWonB = 0
            game.sets.forEach(item => {
                setWonA = item.set.teamA.setWon ? setWonA + 1 : setWonA;
                setWonB = item.set.teamB.setWon ? setWonB + 1 : setWonB;
            });
            updatedData = {
                teamA: {
                    players: game.teamA.players,
                    score: game.teamA.score,
                    setWon: setWonA
                }
            }
            updatedData = {
                ...updatedData,
                teamB: {
                    players: game.teamB.players,
                    score: game.teamB.score,
                    setWon: setWonB
                }
            }
            setData(updatedData);
        }
    }, [game])

    if (socket && game && data) {
        socket.on('get_change_score_set', (payload => {
            const { scoreA, scoreB, gameId } = payload;
            if (gameId === game._id) {
                let updatedGame = { ...data }
                updatedGame.teamA.score = scoreA
                updatedGame.teamB.score = scoreB
                setData(updatedGame)
            }
        }))
        socket.on('get_winner_team', (payload => {
            const { teamName, gameId } = payload;
            if (gameId === game._id) {
                let updatedGame = { ...data }
                if (teamName = 'team1')
                    updatedGame.teamA.setWon = updatedGame.teamA.setWon + 1
                else
                    updatedGame.teamB.setWon = updatedGame.teamB.setWon + 1
                setData(updatedGame)
            }
        }))
    }
    return (
        <div className="scoreboard-viewers">
            <div className="container">
                {data ?
                    Object.entries(data).map(([k, v]) =>
                        (v.players.length > 0) &&
                        (<div
                            className={`player-block-view ${k === "teamB" ? "rev-block" : ""}`}
                            key={k}
                        >
                            <div className="player-name-and-image"
                                style={{ justifyContent: v.players.length === 1 ? "center" : "space-evenly" }}
                            >
                                <div className="player-name">
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
                                {v.players[1] && <div className="player-name">
                                    {v.players[1].player.username}
                                </div>}
                                {v.players[1] &&
                                    <img
                                        className="player-img"
                                        src={v.players[1].player.image !== '' ?
                                            `${baseUrl}uploads/players/${v.players[1].player.image}` :
                                            PROFILE_IMAGE}
                                        alt="profile_image" />
                                }
                            </div>
                            <div className="player-score-and-set">
                                <div className="set-score">
                                    <div className="digital-panel">{v.setWon}</div>
                                </div>
                                <div className="score-digit">
                                    <div className="digital-panel">{v.score}</div>
                                </div>
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
