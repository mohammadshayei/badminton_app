import { useState } from "react";
import { useTheme } from "../../../../styles/ThemeProvider";
import "./TeamsMatches.scss"

const TeamsMatches = () => {
    const [tournamentDays, setTournamentDays] = useState({
        day1: {
            date: "",
            selected: true
        },
        day2: {
            date: "",
            selected: false
        },
        day3: {
            date: "",
            selected: false
        },
        day4: {
            date: "",
            selected: false
        },
        day5: {
            date: "",
            selected: false
        }
    });

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return <div className="teams-matches">
        <div className="day-selector-container">
            {Object.entries(tournamentDays).map(([k, v]) =>
                <div key={k} className="day">
                    <div className="day-head"
                        style={{
                            backgroundColor: v.selected ? theme.primary : theme.border_color,
                            color: theme.on_primary
                        }}
                    >روز</div>
                    <div className="day-body"
                        style={{ backgroundColor: v.selected ? theme.surface : theme.border_color }}
                    >اول</div>
                </div>
            )}
        </div>
    </div>;
};

export default TeamsMatches;
