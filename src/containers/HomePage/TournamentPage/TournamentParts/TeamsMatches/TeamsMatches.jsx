import { useState } from "react";
import "./TeamsMatches.scss"
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import IMAGE from '../../../../../assets/images/user_avatar.svg';
import { IoIosArrowBack } from "react-icons/io";
import Day from "./Day";
import Match from "./Match";

const TeamsMatches = () => {
    const [tournamentDays, setTournamentDays] = useState({
        day1: {
            date: "x",
            counter: "اول",
            done: true,
            selected: true
        },
        day2: {
            date: "x",
            counter: "دوم",
            done: false,
            selected: false
        },
        day3: {
            date: "",
            counter: "سوم",
            done: false,
            selected: false
        },
        day4: {
            date: "",
            counter: "چهارم",
            done: false,
            selected: false
        },
        day5: {
            date: "",
            counter: "پنجم",
            done: false,
            selected: false
        }
    });
    const [showGames, setShowGames] = useState(false);   //show a match games

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    //fetched data :
    const matches = {
        match1: {
            number: "انفرادی اول",
            team1: { players: { player1: { name: "محمد محمدی", image: "" } }, scores: [21, 21] }
            , team2: { players: { player1: { name: "احمد احمدی", image: "" } }, scores: [19, 18] }
        },
        match2: {
            number: "انفرادی دوم",
            team1: { players: { player1: { name: "حمید حمیدی", image: "" } }, scores: [21, 21] }
            , team2: { players: { player1: { name: "رضا رضایی", image: "" } }, scores: [19, 18] }
        }
        ,
        match3: {
            number: "دونفره اول",
            team1: { players: { player1: { name: "حسن حسنی", image: "" }, player2: { name: "کریم کریمی", image: "" } }, scores: [21, 21] }
            , team2: { players: { player1: { name: "داوود داوودی", image: "" }, player2: { name: "جواد جوادی", image: "" } }, scores: [19, 18] }
        }
    }

    const selectDay = (key) => {
        let updatedDays = { ...tournamentDays }
        for (const day in updatedDays) {
            updatedDays[day].selected = false
        }
        updatedDays[key].selected = true
        setTournamentDays(updatedDays)
    }

    return <div className="teams-matches"
        style={{
            color: theme.on_background
        }}
    >
        <div className="day-selector-container">
            {Object.entries(tournamentDays).map(([k, v]) =>
                <Day
                    key={k}
                    day={v}
                    dayKey={k}
                    selectDay={selectDay}
                />
            )}
        </div>
        <div className="day-content">
            <div className={`day-events ${showGames ? "hide" : ""}`}>
                <div className="date-of-day">
                    <CustomInput
                        title={stringFa.date}
                        elementType={elementTypes.datePicker}
                        inputContainer={{ paddingBottom: "0" }}
                        validation={{ bdRequired: true }}
                    />
                </div>
                <div className="teams-table">
                    {[1, 2, 3].map((v, i) =>
                        <div className="table-row"
                            style={{
                                borderColor: theme.border_color
                            }}
                        >
                            <Match key={i} index={i} setShowGames={setShowGames} />
                        </div>
                    )}
                </div>
            </div>
            <div className="day-match-games"
                style={{
                    display: showGames ? "flex" : "none",
                    backgroundColor: theme.background_color
                }}
            >
                <IoIosArrowBack className="icon-back" onClick={() => setShowGames(false)} />
                {Object.entries(matches).map(([k1, match]) =>
                    <div key={k1} className="a-match-game">
                        <div className="match-game-number">{match.number}</div>
                        <div className="match-game-details">
                            {Object.entries(match).map(([k2, team]) =>
                                k2 !== "number" &&
                                <>
                                    <div key={k2} className={`match-game-team ${k2 === "team2" ? "left" : ''}`}>
                                        <div className="players">
                                            {Object.entries(team.players).map(([k3, player]) =>
                                                <div key={k3} className="player">
                                                    <img className="player-image" src={player.image === '' ? IMAGE : player.image} alt="avatar" />
                                                    <div className="player-name">{player.name}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="scores">
                                            {Object.entries(team.scores).map(([k4, score]) =>
                                                <p key={k4}>
                                                    {score}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {k2 === "team1" ? <p className="dash">-</p> : ''}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>;
};

export default TeamsMatches;
