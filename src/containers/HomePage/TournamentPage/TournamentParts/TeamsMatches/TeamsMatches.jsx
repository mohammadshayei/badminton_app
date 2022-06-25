import { useState } from "react";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import Day from "./Day";
import Match from "./Match";
import "./TeamsMatches.scss"

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

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const selectDay = (key) => {
        let updatedDays = { ...tournamentDays }
        for (const day in updatedDays) {
            updatedDays[day].selected = false
        }
        updatedDays[key].selected = true
        setTournamentDays(updatedDays)
    }

    return <div className="teams-matches">
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
        <div className="day-events">
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
                        <Match key={i} index={i} />
                    </div>
                )}
            </div>
        </div>
    </div>;
};

export default TeamsMatches;
