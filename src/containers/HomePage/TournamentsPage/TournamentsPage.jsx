import "./TournamentsPage.scss";
import TournamentBox from "./TournamentBox";
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import RoundSelector from "../../../components/UI/RoundSelector/RoundSelector";
import { useState } from "react";

const TournamentsPage = () => {
    const [filterSelectors, setFilterSelectors] = useState({
        my_tournaments: {
            text: "تورنمنت های من",
            selected: true,
        },
        finished: {
            text: "تمام شده",
            selected: false,
        },
        now_playing: {
            text: "در حال انجام",
            selected: false,
        },
        upcoming: {
            text: "در آینده",
            selected: false,
        }
    });

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
    }

    return <div className="tournaments-page">
        <div className="live-scores-bar"
            style={{
                display: "flex",
                backgroundColor: theme.secondary_variant,
                color: theme.on_secondary
            }}
        >
            <div className="live-score-item">
                <Icon className="live-icon" icon="fluent:live-24-regular" color={theme.on_primary} />
                <p>جام رمضان 1401</p>
            </div>
        </div>
        <p className="title">تورنمنت ها</p>
        <div className="selectors-wrapper">
            {Object.entries(filterSelectors).map(([k, v]) =>
                <RoundSelector
                    k={k}
                    text={v.text}
                    selected={v.selected}
                    onClick={() => onSelectorClick(k)}
                />
            )}
        </div>
        <div className="adds-and-tournaments">
            <div className="tournaments-wrapper">
                <TournamentBox />
                <TournamentBox />
                <TournamentBox />
                <TournamentBox />
                <TournamentBox />
            </div>
            <div className="adds-container"></div>
        </div>
    </div>;
};

export default TournamentsPage;
