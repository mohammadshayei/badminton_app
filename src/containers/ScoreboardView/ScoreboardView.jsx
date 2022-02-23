import { useState, useEffect } from "react";
import "./ScoreboardView.scss"
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";
import { useSelector } from "react-redux";
import { baseUrl } from "../../constants/Config";
import { useNavigate, useLocation } from "react-router-dom";
import { getGame } from "../../api/scoreboard";
import ErrorDialog from "../../components/UI/Error/ErrorDialog";
import { HiStatusOnline } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'

const ScoreboardView = () => {
    const [data, setData] = useState(null);
    const [game, setGame] = useState(null);
    const [timer, setTimer] = useState(0)
    const [gameWonner, setGameWonner] = useState('')
    const [gameScores, setGameScores] = useState(null)
    const [count, setCount] = useState(1);
    const [allCount, setAllCount] = useState(1);

    const [dialog, setDialog] = useState(null);
    const [loading, setLoading] = useState(false);
    // const game = useSelector(state => state.gameInfo.gameView)
    const socket = useSelector(state => state.auth.socket)
    // const { gymId, landNumber } = useSelector(state => state.home.assingScoreboard)
    const ip = useSelector(state => state.detail.ip)

    const location = useLocation();
    let navigate = useNavigate();


    const searchParams = new URLSearchParams(location.search);
    const gameId = searchParams.get("gameId");
    const gymId = searchParams.get("gymId");
    const landNumber = searchParams.get("landNumber");


    useEffect(() => {
        let controller = new AbortController()
        if (!gameId) return;
        (async () => {
            try {
                setLoading(true)
                const result = await getGame({ id: gameId })
                if (result.success) {
                    setGame(result.data)
                } else {
                    setDialog(null)
                    setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
                }
                setLoading(false)
                controller = null;
            } catch (e) {
            }
        })();
        return () => controller?.abort();
    }, [gameId]);

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
            socket.on('get_exit_game', (payload => {
                let { gameId } = payload;
                if (gameId === game._id) {
                    if (gymId && landNumber) {
                        navigate(`/wait?gymId=${gymId}&landNumber=${landNumber}`)
                    } else {
                        navigate('/home')
                    }
                }
            }))

        }
    }, [socket, game])

    useEffect(() => {
        if (socket && ip && gameId) {
            socket.emit('sub_game', { ip, gameId })
        }
        return () => {
            if (socket)
                socket.emit('unsub_game', { ip, gameId })
        };

    }, [gameId, socket, ip]);

    useEffect(() => {
        if (socket) {
            socket.on('send_viewer_game', (payload => {
                let { gameId, count, allCount } = payload;
                if (gameId === gameId) {
                    setCount(count)
                    if (allCount) {
                        setAllCount(allCount)
                    }
                }
            }))
        }
    }, [socket, gameId]);

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
            if (gymId && landNumber) {
                setTimeout(() => {
                    navigate(`/wait?gymId=${gymId}&landNumber=${landNumber}`)
                }, 30000);
            }

        }
    }, [gameWonner])
    return (
        <div className="scoreboard-viewers">
            {dialog}
            <div className="container">
                {data ?
                    Object.entries(data).map(([k, v]) =>
                        (v.players.length > 0) &&
                        (
                            <div
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
                                    style={{ justifyContent: v.players.length === 1 ? "center" : "space-between" }}
                                >
                                    <div className="player-name"
                                        style={{
                                            transform:
                                                v.players[0].player.username.length > 16 ?
                                                    (`translateX(${k === "teamB" ? "-" : "+"}5vw)`) :
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
                                            maxWidth: v.players.length === 1 ? "80%" : "50%",
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
                                                    (`translateX(${k === "teamB" ? "-" : "+"}5vw`) :
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
                <div className="detail-scoreboardview">
                    <p className="detail-landnumber">شماره زمین : {game && game.land_number}</p>
                    <p>شماره بازی : {game && game.game_number}</p>
                </div>
                <div className="show-status">
                    <div className="all-viewer">
                        <HiStatusOnline />
                        <p>{count}</p>
                    </div>
                    <div className="online-viewer">
                        <AiOutlineEye />
                        <p >{allCount}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScoreboardView
