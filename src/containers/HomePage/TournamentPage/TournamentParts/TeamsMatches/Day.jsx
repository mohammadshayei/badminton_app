import "./TeamsMatches.scss"
import { useTheme } from "../../../../../styles/ThemeProvider";

const Day = ({ selectDay, day, dayKey }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return <div
        className="day"
        style={{
            cursor: day.selected ? "default" : "pointer",
            borderColor: day.done ? day.selected ? theme.primary : theme.darken_border_color : "rgb(255, 180, 100)",
            // transform: day.selected ? "scale(1.05)" : "scale(1)",
            opacity: day.selected ? 1 : 0.7
        }}
        onClick={() => selectDay(dayKey)}
    >
        <div className="day-head"
            style={{
                backgroundColor: day.selected ? theme.primary : theme.darken_border_color,
                color: theme.on_primary
            }}
        >{day.date.length > 0 ? 'شنبه' : 'روز'}</div>
        <div className="day-body"
            style={{
                backgroundColor: day.selected ? theme.surface : "transparent",
            }}
        >
            {day.date.length > 0 ?
                <p className="day-digit">1</p> :
                day.counter}
            <p>{day.date.length > 0 ? 'مرداد' : ""}</p>
        </div>
    </div>;
};

export default Day;
