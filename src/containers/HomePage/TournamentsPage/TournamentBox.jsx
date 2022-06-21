import { useState } from "react";
import "./TournamentsPage.scss"
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import { GiTrophyCup } from "react-icons/gi";
import { baseUrl } from "../../../constants/Config";

const TournamentBox = ({ title, chiefName, ageCategory, image, gameDate, onClick }) => {
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
        onClick={onClick}
        style={{ backgroundColor: hover ? theme.hover : theme.surface }}
    >
        <div className="box-indicator"
            style={{ color: theme.on_surface }}
        >   {

                image ? <img src={`${baseUrl}uploads/tournaments/${image}`} alt='' /> :
                    <GiTrophyCup />
            }
            {/* <Icon icon="iconoir:tournament" /> */}
        </div>
        <div className="box-content">
            <div className="tournament-title">
                {title}
            </div>
            <div className="tournament-detail">
                {chiefName} | {ageCategory}
            </div>
            <div className="tournament-date">
                <Icon icon="flat-color-icons:calendar" />
                <div className="date">
                    <p>از</p>
                    <p>{gameDate.start && new Date(gameDate.start).toLocaleDateString('fa-IR')}</p>
                    <p>تا</p>
                    <p>{gameDate.end && new Date(gameDate.end).toLocaleDateString('fa-IR')}</p>
                </div>
            </div>
        </div>
    </div>;
};

export default TournamentBox;
