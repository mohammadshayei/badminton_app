import { useTheme } from '../../../../styles/ThemeProvider';
import './Header.scss'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import RoundSelector from '../../../../components/UI/RoundSelector/RoundSelector';

const Header = ({ tournament }) => {
    const [filterSelectors, setFilterSelectors] = useState({
        team: {
            text: "تیم",
            selected: true,
        },
        player: {
            text: "بازیکن",
            selected: false,
        },
        referee: {
            text: "داور",
            selected: false,
        },
        gym: {
            text: "باشگاه",
            selected: false,
        },
        teamMatch: {
            text: "مسابقات تیمی",
            selected: false,
        },
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


    return (
        <div
            style={{ backgroundColor: theme.secondary, color: theme.on_secondary }}
            className='touranment-header-container'
        >
            <div className="tournament-title">
                {tournament.title}
            </div>
            <div className="tournament-detail">
                <span>سازنده</span>  : {tournament.chief.username}
            </div>
            <div className="tournament-detail">
                <span> رده سنی</span> : {tournament.age_category}
            </div>
            {
                tournament.period &&
                <div className="tournament-detail">
                    <span> دوره</span> : {tournament.period}
                </div>
            }
            <div className="tournament-date">
                <Icon icon="flat-color-icons:calendar" />
                <div className="date">
                    <p>از</p>
                    <p>{tournament.game_date.start && new Date(tournament.game_date.start).toLocaleDateString('fa-IR')}</p>
                    <p>تا</p>
                    <p>{tournament.game_date.end && new Date(tournament.game_date.end).toLocaleDateString('fa-IR')}</p>
                </div>
            </div>
            <div className="selectors-wrapper">
                {Object.entries(filterSelectors).map(([k, v]) =>
                    <RoundSelector
                        key={k}
                        text={v.text}
                        selected={v.selected}
                        onClick={() => onSelectorClick(k)}
                        type={2}
                        style={{ borderWidth: '1px' }}

                    />
                )}
            </div>
        </div>
    )
}

export default Header