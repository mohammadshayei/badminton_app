import { useLocation } from "react-router";
import CreditBar from "../../../../components/UI/CreditBar/CreditBar";
import { useTheme } from "../../../../styles/ThemeProvider";

const TeamItem = ({ item, index, indexNeeded, selector, onClick, isReferee }) => {

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("item");

    return (
        <div
            className="tournament-item"
            style={{
                borderBottom: indexNeeded ? `1px solid ${theme.border_color}` : 'none'
            }}
            onClick={onClick}
        >
            {indexNeeded ?
                <p style={{ color: window.innerWidth >= 780 && (item._id === itemId) && theme.primary }}>
                    {index}. {item[selector()]}
                </p>
                : <p
                    style={{ color: window.innerWidth >= 780 && (item._id === itemId) && theme.primary }}>
                    {item[selector()]}
                </p>
            }
            <div className="tournament-item-bar">
                {
                    indexNeeded && isReferee && <CreditBar
                        days={item.days}
                        paid={item.paid}
                        past={item.past}
                        showDetail={false}
                        showNumbers={false}
                    />
                }
            </div>
        </div>
    )
}

export default TeamItem