import "./TeamsMatches/TeamsMatches.scss"
import { useTheme } from "../../../../styles/ThemeProvider";
import { useEffect, useState } from "react";
import { getDateInfo } from "../../../../utils/funcs";
import { daysName } from "../../../../assets/strings/stringFaCollection";

const Day = ({ selectDay, day }) => {
    const [dateInfo, setDateInfo] = useState(null)
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    useEffect(() => {
        if (!day.date) return;
        setDateInfo(getDateInfo(new Date(day.date)))
    }, [day.date])

    return <div
        className="day"
        style={{
            cursor: day.selected ? "default" : "pointer",
            borderColor: day.status > 0 ? day.selected ? theme.primary : theme.darken_border_color : "rgb(255, 180, 100)",
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
                daysName[day.counter - 1]
            }
            <p>{dateInfo ? dateInfo.month : ""}</p>
        </div>
    </div>;
};

export default Day;
