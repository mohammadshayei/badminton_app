import { useState, useEffect } from "react";
import "./ScoreboardView.scss"
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";

const ScoreboardView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let players, updatedData = {};
        players = [{ name: "احمد حسنی" }, { name: "احمد حسنی" }];
        updatedData = { team1: { players, score: 4, setWon: 1 } }
        players = [{ name: "حمید کاظمی" }, { name: "احمد حسنی" }];
        updatedData = { ...updatedData, team2: { players, score: 8, setWon: 0 } }
        setData(updatedData);
    }, []);

    return (
        <div className="scoreboard-viewers">
            <div className="container">
                {data ?
                    Object.entries(data).map(([k, v]) =>
                        (v.players.length > 0) &&
                        (<div
                            className={`player-block-view ${k === "team2" && "rev-block"}`}
                        >
                            <div className="player-name-and-image"
                                style={{ justifyContent: v.players.length === 1 ? "center" : "space-evenly" }}
                            >
                                <div className="player-name">
                                    {v.players[0].name}
                                </div>
                                {v.players[0].avatar ?
                                    v.players[0].avatar :
                                    <img className="player-img" src={PROFILE_IMAGE} alt="profile_image"
                                        style={{
                                            maxWidth: v.players.length === 1 ? "80%" : "70%",
                                            marginTop: v.players.length === 1 ? "1.5rem" : "0"
                                        }}
                                    />}
                                {v.players[1] && <div className="player-name">
                                    {v.players[1].name}
                                </div>}
                                {v.players[1] &&
                                    (v.players[1].avatar ?
                                        v.players[1].avatar :
                                        <img className="player-img" src={PROFILE_IMAGE} alt="profile_image" />)}
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
