import { useState } from "react";
import "./TournamentsPage.scss"
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import { GiTrophyCup } from "react-icons/gi";

const TournamentBox = () => {
    const [hover, setHover] = useState(false);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onEnter = () => {
        setHover(true)
    }
    const onLeave = () => {
        setHover(false)
    }

    return <div
        className="tournament-box-container"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ backgroundColor: hover ? theme.border_color : theme.surface }}
    >
        <div className="box-indicator"
            style={{ color: theme.on_surface }}
        >
            <GiTrophyCup />
            {/* <Icon icon="iconoir:tournament" /> */}
        </div>
        <div className="box-content">
            <div className="tournament-title">
                لیگ برتر بدمینتون ایران جام خلیج فارس
            </div>
            <div className="tournament-detail">
                نام سازنده | رده سنی
            </div>
            <div className="tournament-date">
                <Icon icon="flat-color-icons:calendar" />
                <div className="date">
                    <p>از</p>
                    <p>1401/02/25</p>
                    <p>تا</p>
                    <p>1401/11/25</p>
                </div>
            </div>
        </div>
    </div>;
};

export default TournamentBox;
