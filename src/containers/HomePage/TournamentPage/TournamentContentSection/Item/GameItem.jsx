import { GoSettings } from "react-icons/go";
import { useTheme } from "../../../../../styles/ThemeProvider";

const GameItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme
    return (
        <div
            className="content-container"
            style={{
                background:
                    props.status === 2 &&
                    `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
                color: props.status === 2 ? theme.on_primary : theme.on_background,
                boxShadow:
                    props.status === 2 &&
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
        >
            <p>{`${props.teamA.name} ${props.teamA.score} - ${props.teamB.name} ${props.teamB.score}`}</p>
            <GoSettings />
        </div>
    )
}

export default GameItem
