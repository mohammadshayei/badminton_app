import './Header.scss'
import { useTheme } from '../../../styles/ThemeProvider';
import { Icon } from '@iconify/react';
import RoundSelector from '../../../components/UI/RoundSelector/RoundSelector';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TransparentButton from '../../../components/UI/Button/TransparentButton/TransparentButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = ({ image, title, detail, owner, id, loading, filterSelectors, onSelectorClick }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const onEdit = () => {
        if (!id) return;
        navigate(`/edit_team?id=${id}`)
    }

    return (
        <div
            style={{ backgroundColor: theme.secondary, color: theme.on_secondary }}
            className='header-container'
        >
            {(title || image) && <div className="header-image-and-content">
                <div className="header-image">
                    {loading ?
                        <Skeleton
                            className="image-skeleton"
                            circle={true} /> :
                        image

                    }
                </div>
                <div className="header-content">
                    <div className="header-title">
                        {loading ?
                            <Skeleton width={270} /> :
                            <>
                                {title}
                                {user?._id === owner && <TransparentButton
                                    ButtonStyle={{ padding: 0, color: theme.on_secondary, marginRight: "1rem" }}
                                    onClick={onEdit}
                                >
                                    <Icon icon="akar-icons:edit" />
                                </TransparentButton>}
                            </>
                        }
                    </div>
                    {detail &&
                        <>
                            <div className="header-detail header-detail-gap">
                                <Icon icon="ion:create" />
                                {loading ?
                                    <Skeleton width={200} /> :
                                    detail?.chief.username}
                            </div>
                            <div className="header-detail-gap">
                                <Icon icon="akar-icons:person-check" />
                                {loading ?
                                    <Skeleton width={100} /> :
                                    detail?.age_category}
                            </div>
                            {loading ?
                                <Skeleton width={50} /> :
                                detail?.period &&
                                <div className="header-detail-gap">
                                    <Icon icon="akar-icons:arrow-cycle" />
                                    {detail.period}
                                </div>
                            }
                            <div className="header-detail-date header-detail-gap">
                                <Icon icon="heroicons-outline:calendar" />
                                <div className="date">
                                    {loading ?
                                        <Skeleton width={150} /> :
                                        <>
                                            <p>از</p>
                                            <p>{detail?.game_date.start && new Date(detail?.game_date.start).toLocaleDateString('fa-IR')}</p>
                                            <p>تا</p>
                                            <p>{detail?.game_date.end && new Date(detail?.game_date.end).toLocaleDateString('fa-IR')}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>}
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