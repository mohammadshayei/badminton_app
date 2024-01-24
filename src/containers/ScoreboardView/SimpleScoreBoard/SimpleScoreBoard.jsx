import { useEffect } from "react";
import "./SimpleScoreBoard.scss"
import Skeleton from 'react-loading-skeleton';
import { useTheme } from "../../../styles/ThemeProvider";
import ReactCountryFlag from "react-country-flag";

const SimpleScoreBoard = ({ data, gameScores }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    useEffect(() => {
        if (data?.teamA.score === 0) return;
        var scoreA = document.getElementById("teamA");
        if (scoreA) {
            scoreA.style.animationName = "none";
            requestAnimationFrame(() => {
                setTimeout(() => {
                    scoreA.style.animationName = "score-pulse"
                }, 0);
            });
        }
    }, [data?.teamA.score]);

    useEffect(() => {
        if (data?.teamB.score === 0) return;
        var scoreB = document.getElementById("teamB");
        if (scoreB) {
            scoreB.style.animationName = "none";
            requestAnimationFrame(() => {
                setTimeout(() => {
                    scoreB.style.animationName = "score-pulse"
                }, 0);
            });
        }
    }, [data?.teamB.score]);

    return <div className="simple-scoreboard-container"
        style={{
            fontSize: `${Math.min(window.innerWidth * 0.1, window.innerHeight * 0.17)}px`,
            lineHeight: 1.2,
        }}
    >
        {
            data ?
                Object.entries(data).map(([k, v]) =>
                    (v.players.length > 0) &&
                    (
                        <div
                            key={k}
                            className={`player-block-view ${k === "teamB" ? 'player-block-rev' : ''}`}
                            style={{
                                background: (data.teamA.setWon === 2) || (data.teamB.setWon === 2) ?
                                    v.setWon === 2 ?
                                        "rgba(172, 209, 175,0.25)" :
                                        "rgba(244, 113, 116,0.3)"
                                    :
                                    data[k].server ? "#00000077" : "transparent"
                            }}
                        >
                            {console.log(v)}
                            <ReactCountryFlag
                                countryCode="IR"
                                svg
                                style={{
                                    width: '1.25em',
                                    height: '1.25em',
                                    marginInline: '20px'
                                }}
                            />
                            <div className="players-name">
                                <div className="player-name">
                                    {`${`${v.players[0].player.name}`.substring(0, 1)}.${v.players[0].player.family}`}
                                </div>
                                {v.players[1] && <div className="player-name">
                                    {`${`${v.players[1].player.name}`.substring(0, 1)}.${v.players[1].player.family}`}
                                </div>}
                            </div>
                            <div id={k} className={`player-score-and-set ${k === "teamA" ? 'score-and-set-rev' : ''}`}>
                                {!gameScores && <div className="set-score"
                                    style={{
                                        fontSize: `${Math.min(window.innerWidth * 0.08, window.innerHeight * 0.12)}px`,
                                    }}
                                >
                                    <p>{v.setWon}</p>
                                </div>}
                                {gameScores ?
                                    <div className="score-digit"
                                        style={{
                                            fontSize: `${Math.min(window.innerWidth * 0.2, window.innerHeight * 0.3)}px`,
                                        }}
                                    >
                                        <div className="scores">
                                            {gameScores[k].map((item) =>
                                                <p
                                                    style={{
                                                        color: item >= 21 ? theme.success : theme.error,
                                                        textShadow: "none"
                                                    }}
                                                >{item}</p>
                                            )}</div>
                                    </div>
                                    :
                                    <div className="score-digit">
                                        <p>{v.score}</p>
                                    </div>
                                }
                            </div>
                        </div>

                    )
                )
                :
                <>
                    {[...Array(2).keys()].map((v) =>
                        <div k={v} className={`player-block-view ${v > 0 ? 'player-block-rev' : ''}`}>
                            <div className="players-name">
                                <Skeleton width={500} />
                                <Skeleton width={500} />
                            </div>
                            <div className={`player-score-and-set ${v === 0 ? 'score-and-set-rev' : ''}`}>
                                <div className="score-digit">
                                    <Skeleton width={100} />
                                </div>
                            </div>
                        </div>)}
                </>

        }
    </div>;
};

export default SimpleScoreBoard;
