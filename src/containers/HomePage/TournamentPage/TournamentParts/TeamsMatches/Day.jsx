import "./TeamsMatches.scss"
import { useTheme } from "../../../../../styles/ThemeProvider";
import { useEffect, useState } from "react";
import { getDateInfo } from "../../../../../utils/funcs";

const Day = ({ selectDay, day }) => {
    const [dateInfo, setDateInfo] = useState(null)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    useEffect(() => {
        if (!day.date) return;
        console.log('here')
        setDateInfo(getDateInfo(new Date(day.date)))
    }, [day.date])

    return <div
        className="day"
        style={{
            cursor: day.selected ? "default" : "pointer",
            borderColor: day.done ? day.selected ? theme.primary : theme.darken_border_color : "rgb(255, 180, 100)",
            // transform: day.selected ? "scale(1.05)" : "scale(1)",
            opacity: day.selected ? 1 : 0.7
        }}
        onClick={selectDay}
    >
        <div className="day-head"
            style={{
                backgroundColor: day.selected ? theme.primary : theme.darken_border_color,
                color: theme.on_primary
            }}
        >{dateInfo ? dateInfo.dayName : 'روز'}</div>
        <div className="day-body"
            style={{
                backgroundColor: day.selected ? theme.surface : "transparent",
            }}
        >
            {dateInfo ?
                <p className="day-digit">{dateInfo.dayCount}</p> :
                day.counter}
            <p>{dateInfo ? dateInfo.month : ""}</p>
        </div>
    </div>;
};

export default Day;
