import { useTheme } from '../../../../styles/ThemeProvider';
import './Header.scss'
import { Icon } from '@iconify/react';
import RoundSelector from '../../../../components/UI/RoundSelector/RoundSelector';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { GiTrophyCup } from "react-icons/gi";
import { baseUrl } from '../../../../constants/Config';
import TransparentButton from '../../../../components/UI/Button/TransparentButton/TransparentButton';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = ({ tournament, loading, filterSelectors, onSelectorClick }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const onEdit = () => {
        if (!tournament) return;
        navigate(`/edit_tournament?id=${tournament._id}`)
    }
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
                            circle={true} /> :
                        tournament?.image ? <img src={`${baseUrl}uploads/tournaments/${tournament?.image}`} alt='' loading="lazy" /> :
                            <GiTrophyCup />
                    }
                </div>
                <div className="tournament-header-content">
                    <div className="tournament-title">
                        {loading ?
                            <Skeleton width={270} /> :
                            <>
                                {tournament?.title}
                                {((tournament?.chief?._id === user?._id) || user?.is_fekrafzar) &&
                                    <TransparentButton
                                        ButtonStyle={{ padding: 0, color: theme.on_secondary, marginRight: "1rem" }}
                                        onClick={onEdit}
                                    >
                                        <Icon icon="akar-icons:edit" />
                                    </TransparentButton>
                                }
                            </>
                        }
                    </div>
                    <div className="tournament-detail tournament-detail-gap">
                        <Icon icon="ion:create" />
                        {loading ?
                            <Skeleton width={200} /> :
                            <p>{tournament?.chief.username}</p>}
                    </div>
                    <div className="tournament-detail-gap">
                        <Icon icon="akar-icons:person-check" />
                        {loading ?
                            <Skeleton width={100} /> :
                            <p>{tournament?.age_category}</p>}
                    </div>
                    {loading ?
                        <Skeleton width={50} /> :
                        tournament?.period &&
                        <div className="tournament-detail-gap">
                            <Icon icon="akar-icons:arrow-cycle" />
                            <p> {tournament.period}</p>
                        </div>
                    }
                    <div className="tournament-date tournament-detail-gap">
                        <Icon icon="heroicons-outline:calendar" />
                        <div className="date">
                            {loading ?
                                <Skeleton width={150} /> :
                                <>
                                    <p>از</p>
                                    {tournament?.game_date.start && new Date(tournament?.game_date.start).toLocaleDateString('fa-IR')}
                                    <p>تا</p>
                                    {tournament?.game_date.end && new Date(tournament?.game_date.end).toLocaleDateString('fa-IR')}
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
                        style={{ borderWidth: '1px', margin: "0 0.25rem" }}
                    />
                )}
            </div>
        </div>
    )
}

export default Header