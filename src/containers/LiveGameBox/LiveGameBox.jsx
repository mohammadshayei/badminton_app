/* eslint-disable react-hooks/exhaustive-deps */

import "./LiveGameBox.scss"
import { Icon } from '@iconify/react';
import { AiOutlineEye } from 'react-icons/ai'
import { useTheme } from "../../styles/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { GiTennisCourt } from "react-icons/gi";
import { FaReply } from "react-icons/fa";

const LiveGameBox = ({ endGamesScores, gamesScores, game, gamesViewers, gamesStats, duration, style }) => {
    const [teamAScore, setTeamAScore] = useState(0);
    const [teamBScore, setTeamBScore] = useState(0);
    const [serverA, setServerA] = useState(0)
    const [serverB, setServerB] = useState(0)
    const [scores, setScores] = useState([])
    const [endScores, setEndScores] = useState([])

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const navigate = useNavigate()
    const gameClickHandler = (id) => {
        navigate(`/scoreboard_view?gameId=${id}`)
    }
    useEffect(() => {
        let updatedTeamAScore, updatedServerA;
        var scoreA = document.getElementById(game?._id + "A");
        if (!gamesStats) {
            let set = game?.sets[game?.sets?.length - 1]
            if (!set?.set) return;
            if (set.set.mid_game.teamA.score > 0 && set.set.mid_game.teamA.score !== teamAScore) {
                scoreA.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreA.style.animationName = "pulse"
                    }, 0);
                });
            }
            updatedTeamAScore = set.set.mid_game.teamA.score;
            updatedServerA = set.set.mid_game.teamA.server;

        } else {
            if (!gamesStats[game._id]) return;
            if (gamesStats[game._id].teamA.score > 0 && gamesStats[game._id].teamA.score !== teamAScore) {
                scoreA.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreA.style.animationName = "pulse"
                    }, 0);
                });
            }
            updatedTeamAScore = gamesStats[game._id].teamA.score;
            updatedServerA = gamesStats[game._id].teamA.server;

        }
        setTeamAScore(updatedTeamAScore)
        setServerA(updatedServerA)
    }, [gamesStats?.[game._id]?.teamA, game?.teamA.score]);

    useEffect(() => {
        let updatedTeamBScore, updatedServerB;
        var scoreB = document.getElementById(game?._id + "B");
        if (!gamesStats) {
            let set = game?.sets[game?.sets?.length - 1]
            if (!set?.set) return;
            if (set.set.mid_game.teamB.score > 0 && set.set.mid_game.teamB.score !== teamBScore) {
                scoreB.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreB.style.animationName = "pulse"
                    }, 0);
                });
            }
            updatedTeamBScore = set.set.mid_game.teamB.score
            updatedServerB = set.set.mid_game.teamB.server;

        } else {
            if (!gamesStats[game._id]) return;
            if (gamesStats[game._id].teamB.score > 0 && gamesStats[game._id].teamB.score !== teamBScore) {
                scoreB.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreB.style.animationName = "pulse"
                    }, 0);
                });
            }
            updatedTeamBScore = gamesStats[game._id].teamB.score;
            updatedServerB = gamesStats[game._id].teamB.server;

        }
        setTeamBScore(updatedTeamBScore)
        setServerB(updatedServerB)
    }, [gamesStats?.[game._id]?.teamB, game?.teamB.score]);

    useEffect(() => {
        let updatedScores = []
        let filteredSets = game?.sets?.filter(item => item?.set?.status === 3)
        if (filteredSets?.length > 0) {
            updatedScores = filteredSets.map(item => {
                return {
                    a: item.set.teamA.score,
                    b: item.set.teamB.score,
                }
            })
        }
        let gameIndex = gamesScores?.findIndex(item => item.gameId === game._id)
        if (gameIndex > -1) {
            setTeamAScore(0)
            setTeamBScore(0)
            for (let index = 0; index < gamesScores[gameIndex].scores.a.length; index++) {
                updatedScores.push({
                    a: gamesScores[gameIndex].scores.a[index],
                    b: gamesScores[gameIndex].scores.b[index]
                })
            }
        }
        setScores(updatedScores)
    }, [game?.sets, gamesScores])

    useEffect(() => {
        let updatedEndScores = []
        let gameIndex = endGamesScores?.findIndex(item => item.gameId === game._id)
        if (gameIndex > -1) {
            for (let index = 0; index < endGamesScores[gameIndex].scores.a.length; index++) {
                updatedEndScores.push({
                    a: endGamesScores[gameIndex].scores.a[index],
                    b: endGamesScores[gameIndex].scores.b[index]
                })
            }
            setEndScores(updatedEndScores)
        }
    }, [endGamesScores])
    return <div
        className="live-game-box"
        onClick={() => gameClickHandler(game?._id)}
        style={{
            backgroundColor: theme.surface,
            borderColor: theme.darken_border_color,
            ...style,
        }}
    >
        <div className='live-game-box-title'
            style={{
                backgroundColor: theme.background_color,
            }}
        >
            <div className="box-titles">
                <p title={game?.tournament.title} className="tournament-title">{game?.tournament.title || <Skeleton width="10vw" />}</p>
                {game?.teamA.team &&
                    <p title={`${game?.teamA.team?.name} - ${game?.teamB.team?.name}`}
                        className="tournament-title teams"
                        style={{ color: theme.primary }}>
                        {`(${game?.teamA.team?.name} - ${game?.teamB.team?.name})`}
                        <FaReply color={theme.primary} />
                    </p>}
            </div>

            <div className="show-status">
                <div className="online-viewers"
                    style={{
                        color: theme.darken_border_color
                    }}
                >
                    <p>{gamesViewers && gamesViewers[game?._id] ? gamesViewers[game?._id].count : 0}</p>
                    <AiOutlineEye />
                </div>
                <div className="court" style={{ color: theme.secondary }}>
                    <p>{game?.land_number || <Skeleton width="1vw" />}</p>
                    <GiTennisCourt />
                </div>
                <div className="duration">
                    {duration ? duration : <div className="loading-time">...</div>}
                    {/* <div className="loading-time">...</div> */}
                </div>
                <div className="live-indicator" />
            </div>
        </div>
        <div className="live-game-box-details">
            <div className="name-score">
                <div className="team devider"
                    style={{
                        borderColor: theme.border_color
                    }}
                >
                    <div className="players-and-shuttle">
                        <div className="team-players">
                            <div className='team-players-score'>
                                <span title={game?.teamA.players[0].player.username}>
                                    {game?.teamA.players[0].player.username || <Skeleton width="7vw" />}
                                </span>
                                {serverA === 1 && (
                                    <Icon className="shuttle-icon"
                                        icon="mdi:badminton"
                                        color={theme.primary} />
                                )}
                            </div>
                            {game?.game_type === "double" &&
                                <div className='team-players-score'>
                                    <span title={game?.teamA.players[1].player.username}>
                                        {`${game?.teamA.players[1].player.username}`}
                                    </span>
                                    {serverA === 2 && (
                                        <Icon className="shuttle-icon"
                                            icon="mdi:badminton"
                                            color={theme.primary} />
                                    )}
                                </div>
                            }
                        </div>

                    </div>
                    <div className="span-score">
                        {
                            endScores.length > 0 ?
                                endScores.map((item, index) =>
                                    <p key={index}
                                        style={{
                                            fontWeight: item.a > item.b ? "800" : "200",
                                            opacity: item.a > item.b ? "1" : "0.5",
                                            margin: "0 0.5rem",
                                        }}>
                                        {item.a}
                                    </p>
                                )
                                :
                                <>
                                    {
                                        scores.map((item, index) =>
                                            <p key={index}
                                                style={{
                                                    fontWeight: item.a > item.b ? "800" : "200",
                                                    opacity: item.a > item.b ? "1" : "0.5",
                                                    margin: "0 0.5rem",
                                                }}>
                                                {item.a}
                                            </p>
                                        )
                                    }
                                    <p id={game?._id + "A"} className="live-score">
                                        {teamAScore === 0 ? 0 : teamAScore || <Skeleton width="2vw" />}
                                    </p>
                                </>
                        }
                    </div>
                </div>
                <div className="team">
                    <div className="players-and-shuttle">
                        <div className="team-players">
                            <div className='team-players-score'>
                                <span title={game?.teamB.players[0].player.username}>
                                    {game?.teamB.players[0].player.username || <Skeleton width="7vw" />}
                                </span>
                                {serverB === 1 && (
                                    <Icon className="shuttle-icon"
                                        icon="mdi:badminton"
                                        color={theme.primary} />
                                )}
                            </div>
                            {game?.game_type === "double" &&
                                <div className='team-players-score'>
                                    <span title={game?.teamB.players[1].player.username}>
                                        {`${game?.teamB.players[1].player.username}`}
                                    </span>
                                    {serverB === 2 && (
                                        <Icon className="shuttle-icon"
                                            icon="mdi:badminton"
                                            color={theme.primary} />
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="span-score">
                        {endScores.length > 0 ? endScores.map((item, index) =>
                            <p key={index}
                                style={{
                                    fontWeight: item.b > item.a ? "800" : "200",
                                    opacity: item.b > item.a ? "1" : "0.5",
                                    margin: "0 0.5rem",
                                }}>
                                {item.b}
                            </p>
                        ) :
                            <>
                                {scores.map((item, index) =>
                                    <p key={index}
                                        style={{
                                            fontWeight: item.b > item.a ? "800" : "200",
                                            opacity: item.b > item.a ? "1" : "0.5",
                                            margin: "0 0.5rem",
                                        }}>
                                        {item.b}
                                    </p>
                                )}
                                <p id={game?._id + "B"} className="live-score">
                                    {teamBScore === 0 ? 0 : teamBScore || <Skeleton width="2vw" />}
                                </p>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default memo(LiveGameBox);
