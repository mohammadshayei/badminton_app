import { useTheme } from "../../../../styles/ThemeProvider";

const TeamItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <div
            className="tournament-item"
            style={{ borderColor: theme.border_color }}
            onClick={props.onClick}
        >
            <p style={{ color: props.selected && theme.primary }}>
                {props.index}. {props.name}
            </p>
        </div>
    )
}

export default TeamItem