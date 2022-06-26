import { useState } from "react";
import "./TodayMatch.scss"
import IMAGE from '../../../../../assets/images/user_avatar.svg';
import { stringFa } from "../../../../../assets/strings/stringFaCollection";

const TodayMatch = () => {
    const [games, setGames] = useState({
        game1: {
            index: "انفرادی اول",
            team1: { players: { player1: { name: "محمد محمدی", image: "" } } }
            , team2: { players: { player1: { name: "احمد احمدی", image: "" } } }
        },
        game2: {
            index: "انفرادی دوم",
            team1: { players: { player1: { name: "", image: "" } } }
            , team2: { players: { player1: { name: "", image: "" } } }
        }
        ,
        game3: {
            index: "دونفره اول",
            team1: { players: { player1: { name: "حسن حسنی", image: "" }, player2: { name: "کریم کریمی", image: "" } } }
            , team2: { players: { player1: { name: "داوود داوودی", image: "" }, player2: { name: "جواد جوادی", image: "" } } }
        }
    });

    return <div className="today-match-container">
        {games &&
            Object.entries(games).map(([k1, game]) =>
                <div key={k1} className="match-game">
                    <div className="match-game-index">{game.index}</div>
                    <div className="match-game-details">
                        {Object.entries(game).map(([k2, team]) =>
                            k2 !== "index" &&
                            <>
                                <div className="match-game-number"></div>
                                <div key={k2} className={`match-game-team ${k2 === "team2" ? "left" : ''}`}>
                                    <div className="players">
                                        {Object.entries(team.players).map(([k3, player]) =>
                                            <div key={k3} className="player">
                                                <img className="player-image" src={player.image === '' ? IMAGE : player.image} alt="avatar" />
                                                <div className="player-name">{player.name.length > 0 ? player.name : stringFa.undefined}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {k2 === "team1" ? <p className="dash">-</p> : ''}
                            </>
                        )}
                    </div>
                </div>
            )}
    </div>;
};

export default TodayMatch;
