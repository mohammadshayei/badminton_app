
import "./LiveGameBox.scss"
import { Icon } from '@iconify/react';
import { AiOutlineEye } from 'react-icons/ai'
import { useTheme } from "../../styles/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";

const LiveGameBox = ({ game, gamesViewers, gamesStats, duration }) => {
    const [teamAScore, setTeamAScore] = useState(null);
    const [teamBScore, setTeamBScore] = useState(null);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const navigate = useNavigate()
    const gameClickHandler = (id) => {
        navigate(`/scoreboard_view?gameId=${id}`)
    }

    useEffect(() => {
        if (!gamesStats) return;
        var scoreA = document.getElementById(game._id + "A");
        if (gamesStats[game._id]) {
            if (gamesStats[game._id].teamA !== teamAScore) {
                scoreA.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreA.style.animationName = ""
                    }, 0);
                });
            }
        }
        else
            if (game.teamA.score !== teamAScore) {
                scoreA.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreA.style.animationName = ""
                    }, 0);
                });
            }
        setTeamAScore(gamesStats[game._id] ? gamesStats[game._id].teamA : game.teamA.score)
    }, [gamesStats?.[game._id]?.teamA, game.teamA.score]);

    useEffect(() => {
        if (!gamesStats) return;
        var scoreB = document.getElementById(game._id + "B");
        if (gamesStats[game._id]) {
            if (gamesStats[game._id].teamB !== teamBScore) {
                scoreB.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreB.style.animationName = ""
                    }, 0);
                });
            }
        }
        else
            if (game.teamB.score !== teamBScore) {
                scoreB.style.animationName = "none";
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        scoreB.style.animationName = ""
                    }, 0);
                });
            }
        setTeamBScore(gamesStats[game._id] ? gamesStats[game._id].teamB : game.teamB.score)
    }, [gamesStats?.[game._id]?.teamB, game.teamB.score]);

    return <div
        className="live-game-box"
        onClick={() => gameClickHandler(game._id)}
        style={{
            backgroundColor: theme.surface,
            borderColor: theme.darken_border_color
        }}
    >
        <div className='live-game-box-title'
            style={{
                backgroundColor: theme.background_color,
            }}
        >
            <p title={game.tournament.title} className="tournament-title">{game.tournament.title}</p>
            <div className="show-status">
                <div className="online-viewers"
                    style={{
                        color: theme.darken_border_color
                    }}
                >
                    <p>{gamesViewers && gamesViewers[game._id] ? gamesViewers[game._id].count : 0}</p>
                    <AiOutlineEye />
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
                            <span title={game.teamA.players[0].player.username}>
                                {`${game.teamA.players[0].player.username}`}
                            </span>
                            {game.game_type === "double" &&
                                <span title={game.teamA.players[1].player.username}>
                                    {`${game.teamA.players[1].player.username}`}
                                </span>}
                        </div>
                        {game.teamA.setWon === 1 && (
                            <Icon className="shuttle-icon"
                                icon="mdi:badminton"
                                color={theme.primary} />
                        )}
                    </div>
                    <div id={game._id + "A"} className="span-score">
                        <p>
                            {`${teamAScore}`}
                        </p>
                    </div>
                </div>
                <div className="team">
                    <div className="players-and-shuttle">
                        <div className="team-players">
                            <span title={game.teamB.players[0].player.username}>
                                {`${game.teamB.players[0].player.username}`}
                            </span>
                            {game.game_type === "double" &&
                                <span title={game.teamB.players[1].player.username}>
                                    {`${game.teamB.players[1].player.username}`}
                                </span>}
                        </div>
                        {game.teamB.setWon === 1 && (
                            <Icon className="shuttle-icon"
                                icon="mdi:badminton"
                                color={theme.primary} />
                        )}
                    </div>
                    <div id={game._id + "B"} className="span-score">
                        <p>
                            {`${teamBScore}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default memo(LiveGameBox);
