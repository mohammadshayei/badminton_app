import { useState } from "react";
import "./TodayMatch.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import TransparentButton from "../../../../../components/UI/Button/TransparentButton/TransparentButton";

const TodayMatch = () => {
    const [games, setGames] = useState([
        [
            "انفرادی اول",
            { teamName: "رعد پدافند هوایی قم", players: { player1: { name: "محمد محمدی", image: "" } } }
            , { teamName: "پروتئین 99 البرز", players: { player1: { name: "احمد احمدی", image: "" } } }
        ],
        [
            "انفرادی دوم",
            { teamName: "رعد پدافند هوایی قم", players: { player1: { name: "", image: "" } } }
            , { teamName: "پروتئین 99 البرز", players: { player1: { name: "", image: "" } } }
        ]
        ,
        [
            "دونفره اول",
            { teamName: "رعد پدافند هوایی قم", players: { player1: { name: "حسن حسنی", image: "" }, player2: { name: "کریم کریمی", image: "" } } }
            , { teamName: "پروتئین 99 البرز", players: { player1: { name: "داوود داوودی", image: "" }, player2: { name: "جواد جوادی", image: "" } } }
        ]
    ]);

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
                        />
                    </div>
                    <div className="date">1401/05/20</div>
                </div>
                {games.map((game, k1) =>
                    <div key={k1} className="match-game"
                        style={{
                            backgroundColor: theme.surface
                        }}
                    >
                        <div className="match-game-header">
                            <div className="match-game-number">
                                <CustomInput
                                    elementConfig={{
                                        placeholder: stringFa.number_of_game,
                                    }}
                                    inputContainer={{
                                        padding: "0",
                                        width: "100px",
                                    }}
                                    inputStyle={{
                                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                                        minWidth: "100px",
                                        direction: "ltr"
                                    }}
                                />
                            </div>
                            <div className="match-game-index"
                                style={{
                                    backgroundColor: theme.darken_border_color, //if done -> theme.primary
                                    color: theme.on_primary
                                }}
                            >{game[0]}</div>
                            <div className="match-game-number  game-court">
                                <CustomInput
                                    elementConfig={{
                                        placeholder: "court",
                                    }}
                                    inputContainer={{
                                        padding: "0",
                                        width: "100px",
                                    }}
                                    inputStyle={{
                                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                                        minWidth: "100px",
                                        direction: "ltr"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="match-game-details">
                            {game.map((team, k2) =>
                                k2 > 0 &&
                                <div key={k2} className={`match-game-team ${k2 === 2 ? "left" : ''}`}>
                                    <div className="team-name">
                                        {team.teamName}
                                    </div>
                                    <div className="players">
                                        {Object.entries(team.players).map(([k3, player]) =>
                                            <div key={k3} className="player">
                                                <CustomInput
                                                    placeHolder={stringFa.undefined}
                                                    elementType={elementTypes.dropDown}
                                                    items={[]}
                                                    inputContainer={{ padding: "0" }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {/* {k2 === 1 ? <p className="dash">-</p> : ''} */}
                                </div>
                            )}
                        </div>
                        <TransparentButton
                            config={{ disabled: true }}
                            ButtonStyle={{
                                padding: "0",
                                fontSize: "clamp(0.8rem,1vw,0.9rem)"
                            }}>
                            {stringFa.save}
                        </TransparentButton>
                    </div>)}
            </>
        }
    </div >;
};

export default TodayMatch;
