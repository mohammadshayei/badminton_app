import { baseUrl } from "../../../constants/Config";
import "./StadiumScoreBoard.scss"
import PROFILE_IMAGE from "../../../assets/images/avatars/default-avatar.png";
import { HiStatusOnline } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'

const StadiumScoreBoard = ({ data, gameScores, game, count, allCount }) => {
    return <div className="container">
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
                                loading="lazy"
                            />
                            {v.players[1] &&
                                <img
                                    className="player-img"
                                    src={v.players[1].player.image !== '' ?
                                        `${baseUrl}uploads/players/${v.players[1].player.image}` :
                                        PROFILE_IMAGE}
                                    alt="profile_image" loading="lazy"/>
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
    </div>;
};

export default StadiumScoreBoard;
