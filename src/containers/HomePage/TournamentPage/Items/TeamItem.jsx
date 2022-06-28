import { useTheme } from "../../../../styles/ThemeProvider";

const TeamItem = ({ item, index, indexNeeded, selector, onClick }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div
            className="tournament-item"
            style={{
                borderBottom: indexNeeded ? `1px solid ${theme.border_color}` : 'none'
            }}
            onClick={onClick}
        >
            {indexNeeded ?
                <p style={{ color: item.selected && theme.primary }}>
                    {index}. {item[selector()]}
                </p>
                : <p>{item[selector()]}</p>
            }

        </div>
    )
}

export default TeamItem