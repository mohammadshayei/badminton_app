import { useTheme } from "../../../styles/ThemeProvider";
import "./RoundSelector.scss";

const RoundSelector = ({ text, style, selected, onClick }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return <div
        className="round-selector-component"
        style={{
            backgroundColor: selected ? theme.primary : "transparent",
            borderColor: selected ? theme.primary : theme.border_color,
            color: selected ? theme.on_primary : theme.on_background,
            ...style
        }}
        onClick={onClick}
    >
        {text}
    </div>;
};

export default RoundSelector;
