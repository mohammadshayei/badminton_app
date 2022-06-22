import { useTheme } from '../../../../styles/ThemeProvider';
import './Header.scss'
import { Icon } from '@iconify/react';
import { useState } from 'react';
import RoundSelector from '../../../../components/UI/RoundSelector/RoundSelector';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Header = ({ tournament, loading }) => {
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
                {loading ?
                    <Skeleton
                        highlightColor={theme.border_color}
                        width={270}
                        direction='rtl' /> :
                    tournament?.title}
            </div>
            <div className="tournament-detail">
                <span>سازنده</span>  : {loading ?
                    <Skeleton
                        highlightColor={theme.border_color}
                        width={200}
                        direction='rtl' /> :
                    tournament?.chief.username}
            </div>
            <div className="tournament-detail">
                <span> رده سنی</span> : {loading ?
                    <Skeleton
                        highlightColor={theme.border_color}
                        width={100}
                        direction='rtl' /> :
                    tournament?.age_category}
            </div>
            {loading ?
                <Skeleton
                    containerClassName='tournament-detail'
                    highlightColor={theme.border_color}
                    width={50}
                    direction='rtl' /> :
                tournament?.period &&
                <div className="tournament-detail">
                    <span> دوره</span> : {tournament.period}
                </div>
            }
            <div className="tournament-date">
                <Icon icon="flat-color-icons:calendar" />
                <div className="date">
                    {loading ?
                        <Skeleton
                            highlightColor={theme.border_color}
                            width={150}
                            direction='rtl' /> :
                        <>
                            <p>از</p>
                            <p>{tournament?.game_date.start && new Date(tournament?.game_date.start).toLocaleDateString('fa-IR')}</p>
                            <p>تا</p>
                            <p>{tournament?.game_date.end && new Date(tournament?.game_date.end).toLocaleDateString('fa-IR')}</p>
                        </>
                    }
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