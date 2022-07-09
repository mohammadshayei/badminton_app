import { useState } from "react";
import "./TournamentsPage.scss"
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import { GiTrophyCup } from "react-icons/gi";
import { baseUrl } from "../../../constants/Config";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TournamentBox = ({ title, chiefName, ageCategory, image, gameDate, onClick, loading }) => {
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
        style={{
            backgroundColor: loading ? theme.surface : hover ? theme.hover : theme.surface,
            cursor: loading ? "default" : "pointer"
        }}
    >
        <div className="box-indicator"
            style={{ color: theme.on_surface }}
        >   {loading ? <Skeleton className="image-skeleton" circle={true} /> :
            image ? <img src={`${baseUrl}uploads/tournaments/${image}`} alt='' /> :
                <GiTrophyCup />
            }
            {/* <Icon icon="iconoir:tournament" /> */}
        </div>
        <div className="box-content">
            <div className="tournament-title">
                {title || <Skeleton className="title-skeleton" />}
            </div>
            <div className="tournament-detail">
                {loading ? <Skeleton className="detail-skeleton" /> :
                    `${chiefName}  |  ${ageCategory}`}
            </div>
            <div className="tournament-date">
                <Icon icon="flat-color-icons:calendar" />
                <div className="date">
                    {loading ?
                        <Skeleton className="date-skeleton" /> :
                        <>
                            <p>از</p>
                            <p>{gameDate.start && new Date(gameDate.start).toLocaleDateString('fa-IR')}</p>
                            <p>تا</p>
                            <p>{gameDate.end && new Date(gameDate.end).toLocaleDateString('fa-IR')}</p>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>;
};

export default TournamentBox;
