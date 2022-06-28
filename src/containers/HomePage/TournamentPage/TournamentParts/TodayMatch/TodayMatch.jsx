import { useState } from "react";
import "./TodayMatch.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";

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

    const themeState = useTheme();
    const theme = themeState.computedTheme;


    return <div className="today-match-container">
        {games &&
            <>
                <div className="gym-and-date">
                    <div className="gym-selector">
                        <div>نام سالن</div>
                        <CustomInput
                            placeHolder={stringFa.undefined}
                            elementType={elementTypes.dropDown}
                            items={[]}
                            inputContainer={{ padding: "0" }}
                            containerStyle={{ fontSize: "0.7rem" }}
                        />
                    </div>
                    <div className="date">1401/05/20</div>
                </div>
                {Object.entries(games).map(([k1, game]) =>
                    <div key={k1} className="match-game"
                        style={{ borderTop: k1 !== "game1" ? `1px solid ${theme.border_color}` : "none" }}
                    >
                        {console.log(k1)}
                        <div className="match-game-index"
                            style={{ backgroundColor: theme.surface }}
                        >{game.index}</div>
                        <div className="match-game-number">
                            <CustomInput
                                inputStyle={{ fontSize: "0.7rem", }}
                                inputContainer={{ padding: "0" }}
                                elementConfig={{
                                    placeholder: stringFa.number_of_game
                                }}
                            />
                        </div>
                        <div className="match-game-details">
                            {Object.entries(game).map(([k2, team]) =>
                                k2 !== "index" &&
                                <>
                                    <div key={k2} className={`match-game-team ${k2 === "team2" ? "left" : ''}`}>
                                        <div className="team-name">
                                            {k2}
                                        </div>
                                        <div className="players">
                                            {Object.entries(team.players).map(([k3, player]) =>
                                                <div key={k3} className="player">
                                                    <div className="player-name">
                                                        <CustomInput
                                                            placeHolder={stringFa.undefined}
                                                            elementType={elementTypes.dropDown}
                                                            items={[]}
                                                            inputContainer={{ padding: "0" }}
                                                            containerStyle={{ fontSize: "0.7rem" }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {k2 === "team1" ? <p className="dash">-</p> : ''}
                                </>
                            )}
                        </div>
                    </div>)}
            </>
        }
    </div >;
};

export default TodayMatch;
