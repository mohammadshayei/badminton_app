import { useTheme } from '../../../../styles/ThemeProvider';
import './Header.scss'
import { Icon } from '@iconify/react';
import RoundSelector from '../../../../components/UI/RoundSelector/RoundSelector';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { GiTrophyCup } from "react-icons/gi";
import { baseUrl } from '../../../../constants/Config';
import TransparentButton from '../../../../components/UI/Button/TransparentButton/TransparentButton';

const Header = ({ tournament, loading, filterSelectors, onSelectorClick }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div
            style={{ backgroundColor: theme.secondary, color: theme.on_secondary }}
            className='touranment-header-container'
        >
            <div className="header-image-and-content">
                <div className="tournament-header-image">
                    {loading ?
                        <Skeleton
                            className="image-skeleton"
                            baseColor={theme.border_color}
                            highlightColor={theme.darken_border_color}
                            direction='rtl'
                            circle={true} /> :
                        tournament?.image ? <img src={`${baseUrl}uploads/tournaments/${tournament?.image}`} alt='' /> :
                            <GiTrophyCup />
                    }
                </div>
                <div className="tournament-header-content">
                    <div className="tournament-title">
                        {loading ?
                            <Skeleton
                                baseColor={theme.border_color}
                                highlightColor={theme.darken_border_color}
                                width={270}
                                direction='rtl' /> :
                            <>
                                {tournament?.title}
                                <TransparentButton
                                    ButtonStyle={{ padding: 0, color: theme.on_secondary, marginRight: "1rem" }}
                                >
                                    <Icon icon="akar-icons:edit" />
                                </TransparentButton>

                            </>
                        }
                    </div>
                    <div className="tournament-detail tournament-detail-gap">
                        <Icon icon="ion:create" />
                        {loading ?
                            <Skeleton
                                baseColor={theme.border_color}
                                highlightColor={theme.darken_border_color}
                                width={200}
                                direction='rtl' /> :
                            tournament?.chief.username}
                    </div>
                    <div className="tournament-detail-gap">
                        <Icon icon="akar-icons:person-check" />
                        {loading ?
                            <Skeleton
                                baseColor={theme.border_color}
                                highlightColor={theme.darken_border_color}
                                width={100}
                                direction='rtl' /> :
                            tournament?.age_category}
                    </div>
                    {loading ?
                        <Skeleton
                            baseColor={theme.border_color}
                            highlightColor={theme.darken_border_color}
                            width={50}
                            direction='rtl' /> :
                        tournament?.period &&
                        <div className="tournament-detail-gap">
                            <Icon icon="akar-icons:arrow-cycle" />
                            {tournament.period}
                        </div>
                    }
                    <div className="tournament-date tournament-detail-gap">
                        <Icon icon="heroicons-outline:calendar" />
                        <div className="date">
                            {loading ?
                                <Skeleton
                                    baseColor={theme.border_color}
                                    highlightColor={theme.darken_border_color}
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
                </div>
            </div>
            <div className="selectors-wrapper">
                {Object.entries(filterSelectors).map(([k, v]) =>
                    <RoundSelector
                        key={k}
                        selector={k}
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