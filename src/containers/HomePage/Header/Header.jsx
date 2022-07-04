import './Header.scss'
import { useTheme } from '../../../styles/ThemeProvider';
import { Icon } from '@iconify/react';
import RoundSelector from '../../../components/UI/RoundSelector/RoundSelector';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Header = ({ image, title, detail, loading, filterSelectors, onSelectorClick }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div
            style={{ backgroundColor: theme.secondary, color: theme.on_secondary }}
            className='header-container'
        >
            <div className="header-image-and-content">
                <div className="header-image">
                    {loading ?
                        <Skeleton
                            className="image-skeleton"
                            baseColor={theme.border_color}
                            highlightColor={theme.darken_border_color}
                            direction='rtl'
                            circle={true} /> :
                        image
                    }
                </div>
                <div className="header-content">
                    <div className="header-title">
                        {loading ?
                            <Skeleton
                                baseColor={theme.border_color}
                                highlightColor={theme.darken_border_color}
                                width={270}
                                direction='rtl' /> :
                            title
                        }
                    </div>
                    {detail &&
                        <>
                            <div className="header-detail header-detail-gap">
                                <Icon icon="ion:create" />
                                {loading ?
                                    <Skeleton
                                        baseColor={theme.border_color}
                                        highlightColor={theme.darken_border_color}
                                        width={200}
                                        direction='rtl' /> :
                                    detail?.chief.username}
                            </div>
                            <div className="header-detail-gap">
                                <Icon icon="akar-icons:person-check" />
                                {loading ?
                                    <Skeleton
                                        baseColor={theme.border_color}
                                        highlightColor={theme.darken_border_color}
                                        width={100}
                                        direction='rtl' /> :
                                    detail?.age_category}
                            </div>
                            {loading ?
                                <Skeleton
                                    baseColor={theme.border_color}
                                    highlightColor={theme.darken_border_color}
                                    width={50}
                                    direction='rtl' /> :
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
                                        <Skeleton
                                            baseColor={theme.border_color}
                                            highlightColor={theme.darken_border_color}
                                            width={150}
                                            direction='rtl' /> :
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